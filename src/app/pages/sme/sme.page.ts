import { Component, OnInit} from "@angular/core";
import { Router } from '@angular/router';
import { MonitorService } from '../../services/monitor.service';
import * as CanvasJS from '../../../assets/scripts/canvasjs.min';

@Component({
  selector: 'app-sme',
  templateUrl: './sme.page.html',
  styleUrls: ['./custom.css'],
})

export class SMEPage implements OnInit {
  url = "https://localhost:44324/api/productmonitor/sme";
  public legends = [];
  constructor(private router: Router, private monitorService: MonitorService) { }

  /**
   * hàm sẽ chạy ngay khi page được load
   * created by HDNam
   */
  ngOnInit() {
    this.setColorChart();
    this.setTime();
    const pointer = this;
    this.monitorService.sendGetData(this.url).subscribe(res => {
      const data = res["Data"];
      const dataPoints = pointer.setDataPoints(data);
      pointer.loadChart(dataPoints);
      pointer.setSubsciberNumber(data, pointer);
      pointer.setLegend(data, pointer);
      pointer.setStatusPurchase(data, pointer);
    });
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
    const statusPurchase = document.getElementById('status-purchase');
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
      statusPurchase.insertAdjacentHTML('beforeend', oneDiv);
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
    const hour = date.getHours() % 12;
    const min = date.getMinutes();
    const second = date.getSeconds();
    return `0${hour}:${min}:${second}`;
  }

  /**
   * hàm thực hiện đặt giá trị số khách hàng
   * created by HDNam 3/3/2020
   * @param data 
   * @param pointer 
   */
  setSubsciberNumber(data, pointer) {
    const subcriberNumber = pointer.formatNumber(data[0]["SubcriberNumber"]);
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
   * @param number 
   * created by HDNam 2/3/2020
   */
  formatNumber(number) {
    if (!isNaN(number)) {
      return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
  }

  /**
   * hàm thực hiện thiết lập giá trị datapoints cho biểu đồ chính
   * @param dataSME 
   * created by HDNam 28/2/2020
   */
  setDataPoints(dataSME) {
    const dataPoints = [];
    dataSME.forEach(e => {
      dataPoints.push({
        y: e.ItemChartValue,
        label: e.ItemChart,
        percent: (e.ItemChartValue / e.SubcriberNumber * 100).toFixed(1)
      })
    });
    return dataPoints;
  }

  /**
   * hàm thực hiện set color array
   * created by HDNam 2/3/2020
   */
  setColorChart() {
    CanvasJS.addColorSet("colorSet",["#55D7FF", "#FE8373", "#2dd36f", "#A49EF4", "#FEB300"]);
  }

  /**
   * hàm thực hiện load biểu đồ chính
   * @param dataSME 
   * created by HDNam 28/2/2020
   */
  loadChart(dataPoints){
    const chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      exportEnabled: false,
      animationEnabled: true,
      title: { enabled: false },
      toolTip:{ enabled: false },
      legend: {
        verticalAlign: 'center',
        horizontalAlign: 'right',
        maxHeight: 900,
        fontWeight: 'bold',
        fontSize: 12  
      },
      colorSet: "colorSet",
      data: [{
        type: "pie",
        startAngle: -90,
        showInLegend: false,
        legendText: "{label} {y}",
        indexLabelFontSize: 12,
        indexLabel: "{percent}%",
        dataPoints: dataPoints,
        indexLabelLineColor: "black",
        indexlabelLineThickness: 4,
      }]
    });
    chart.render();
  }
}
