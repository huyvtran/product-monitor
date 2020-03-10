import { Component, OnInit} from "@angular/core";
import { MonitorService } from '../../services/monitor.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-sme',
  templateUrl: './sme.page.html',
  styleUrls: [],
})

export class SMEPage implements OnInit {
  private url: string = "https://localhost:44324/api/productmonitor/sme";

  constructor(private monitorService: MonitorService) { }
  
  ngOnInit() {
    const pointer = this;
    this.setTime();
    this.monitorService.sendGetData(this.url).subscribe(res => {
      const data = res["Data"];
      pointer.loadChartSME(data);
      pointer.setSubsciberNumber(data);
      pointer.setLegend(data, pointer);
      pointer.setStatusPurchase(data, pointer);
      pointer.loadStatisticPurchase(data, pointer);
    });
  }

  /**
   * hàm thực hiện khi click vào button kiểu thiêt bị
   * created by HDNam 10/3/2020
   * @param typeDevice 
   */
  loadStatistic(typeDevice) {
    const pointer = this;
    this.monitorService.sendGetData(this.url).subscribe(res => {
      const data = res["Data"];
      pointer.loadStatisticPurchase(data, pointer, typeDevice);
    });
  }

  /**
   * hàm thục hiện load thống kế tình hình sử dụng
   * created by HDNam 10/3/2020
   * @param data 
   * @param pointer 
   * @param typeDevice 
   */
  loadStatisticPurchase(data, pointer, typeDevice = 'desktop'){
    const dataDesktop = data.filter(e => e.Device === typeDevice);
    const statisticPurchase = document.getElementById('statistic-purchase');
    const color = ["tertiary", "secondary", "warning"];
    statisticPurchase.innerHTML = '';
    dataDesktop.forEach((e, i) => {
      const oneCol = `<ion-col size=4>
        <ion-card color="${color[i]}" class="m-8">
          <ion-card-content class="p-8">
            <ion-card-subtitle class="text-center">${e.ExpiryTime} tháng</ion-card-subtitle>
            <ion-card-title class="text-center">${pointer.formatNumber(e.ItemChartValue)}</ion-card-title>
          </ion-card-content>
        </ion-card>
      </ion-col>`;
      statisticPurchase.insertAdjacentHTML('beforeend', oneCol);
    });
  }

  /**
   * hàm thực hiện tạo dữ liệu cho biểu đồ (amchartjs)
   * created by HDNam 5/3/2020
   * @param data 
   */
  getDataChart(data) {
    const dataChart = [];
    data.forEach(e => {
      dataChart.push({
        product: e.ItemChart,
        value: Math.floor(e.ItemChartValue / e.SubcriberNumber * 100)
      });
    });
    return dataChart;
  }

  /**
   * hàm thực hiện load biểu đồ
   * created by HDNam 5/3/2020
   * @param data
   */
  loadChartSME(data) {
    const dataChart = this.getDataChart(data);
    let chart = am4core.create("chartContainer", am4charts.PieChart);
    chart.data = dataChart;
    chart.innerRadius = am4core.percent(15);
    chart.radius = am4core.percent(55);

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "product";
    pieSeries.labels.template.text = "{value.value}%";
    pieSeries.colors.list = [
      am4core.color("#55D7FF"),
      am4core.color("#FE8373"),
      am4core.color("#2DD36F"),
      am4core.color("#A49EF4"),
      am4core.color("#FEB300"),
    ];
  }

  /**
   * hàm thực hiện hiển thị phần tình hình gia hạn
   * created by HDNam 3/3/2020
   * @param data 
   * @param pointer 
   */
  setStatusPurchase(data, pointer) {
    const total = data[0]["SubcriberNumber"];
    const aboutToExpire = data[0]["AboutToExpire"];
    const repurchase = data[0]["Repurchase"];
    const statisticPurchase = document.getElementById('status-purchase');
    const dataPurchase = [
      {label: "Đã gia hạn", value: aboutToExpire, color: "secondary", percent: aboutToExpire / total},
      {label: "Sắp hết hạn", value: repurchase, color: "warning", percent: repurchase / total}
    ];
    dataPurchase.forEach(e => {
      const oneDiv = `<div>
        <ion-item>
          <ion-text color="medium">${e.label}</ion-text>
          <ion-text slot="end" class="number">${pointer.formatNumber(e.value)}</ion-text>
        </ion-item>
        <ion-progress-bar color="${e.color}" value="${e.percent}"></ion-progress-bar>
      </div>`;
      statisticPurchase.insertAdjacentHTML('beforeend', oneDiv);
    });
  }

  /**
   * hàm thực hiện chuyển trang
   * created by HDNam 3/3/2020
   */
  navigate(uri) {
    const origin = window.location.origin;
    window.location.href = origin + uri;
  }

  /**
   * hàm thực hiện đặt thời gian
   * created by HDNam 3/3/2020
   */
  setTime() {
    const currentTime = this.getCurrentTime();
    document.getElementById('timestamp-update').innerHTML = currentTime;
  }

  /**
   * hàm thực hiện lấy giờ hiện tại
   * created by HDNam 
   */
  getCurrentTime() {
    const date = new Date();
    const h = date.getHours() % 12;
    const m = date.getMinutes();
    const s = date.getSeconds();
    const hour = h < 10 ? '0' + h : h;
    const min = m < 10 ? '0' + m : m;
    const second = s < 10 ? '0' + s : s;
    return `${hour}:${min}:${second}`;
  }

  /**
   * hàm thực hiện đặt giá trị số khách hàng
   * created by HDNam 3/3/2020
   * @param data 
   * @param pointer 
   */
  setSubsciberNumber(data) {
    const subcriberNumber = this.formatNumber(data[0]["SubcriberNumber"]);
    document.getElementById('subcriber-number').innerHTML = subcriberNumber;
  }

  /**
   * hàm thực hiện đặt legend cho biểu đồ
   * created by HDNam 3/3/2020
   * @param pointer 
   */
  setLegend(data, pointer) {
    const chartLegend = document.getElementById('chart-legend');
    const color = ["secondary", "danger", "success", "tertiary", "warning"];
    data.forEach((item, i) => {
      const oneLegend = `<ion-item>
        <ion-icon class="legend-icon" name="ellipse-outline" color="${color[i]}"></ion-icon>
        <ion-text color="legend-label medium font-size-12 pl-8 ">${item.ItemChart}</ion-text>
        <ion-text slot="end" class="number pl-8">${pointer.formatNumber(item.ItemChartValue)}</ion-text>
      </ion-item>`;
      chartLegend.insertAdjacentHTML('beforeend', oneLegend);
    });
  }

  /**
   * hàm thực hiện format number
   * created by HDNam 2/3/2020
   * @param number 
   */
  formatNumber(number) {
    if (!isNaN(number)) {
      return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
  }
}
