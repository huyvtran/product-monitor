import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-meinvoice',
  templateUrl: './meinvoice.page.html',
  styleUrls: ['./meinvoice.page.scss'],
})
export class MEINVOICEPage implements OnInit {
  @ViewChild("barCanvas", {static: true}) barCanvas: ElementRef;
  private barChart: Chart;
  private url: string = "https://localhost:44324/api/productmonitor/meinvoice";

  constructor(private monitorService: MonitorService) {}

  ngOnInit() {
    const pointer = this;
    this.setTime();
    this.monitorService.sendGetData(this.url).subscribe(res => {
      const data = res["Data"];      
      pointer.loadChart(data);
      pointer.bindDataStatistic(data, pointer);
      pointer.setNumberCustomer(data);
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
   * hàm thực hiện đặt giá trị số khách hàng đăng kí
   * created by HDNam 5/3/2020
   * @param data 
   */
  setNumberCustomer(data) {
    const numberCustomer = data[0]["SubcriberNumber"] + data[0]["SubcriberNumberCancel"];
    document.getElementById('subcriber-number').innerHTML = this.formatNumber(numberCustomer);
  }

  /**
   * hàm đặt thời gian hiện tại
   * created by HDNam
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
   * hàm thực hiện format number
   * created by HDNam 2/3/2020
   * @param number 
   */
  formatNumber(number) {
    if (!isNaN(number)) {
      return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
  }

  /**
   * hàm thực hiện lấy thông tin dữ liệu cần thiết cho phần thống kê
   * created by HDNam 3/3/2020
   * @param data 
   */
  getDataStatistic(data) {
    const dataStatistic = [];
    const labels = ["Thuê bao còn hoạt động", "Thuê bao đã cắt", "Thuê bao tích hợp"];
    const labelData = ["SubcriberNumber", "SubcriberNumberCancel", "SubcriberNumberIntergated"];
    const icons = ["people-outline", "person-outline", "link-outline"];
    labels.forEach((label,i) => {
      dataStatistic.push({
        icon: icons[i],
        label: label,
        value: data[0][labelData[i]]
      });
    });
    return dataStatistic;
  }

  /**
   * hàm thực hiện binding dữ liệu ở phần thông kê
   * created by HDNam 3/3/2020
   * @param dataStatistic 
   * @param pointer 
   */
  bindDataStatistic(data, pointer) {
    const dataStatistic = this.getDataStatistic(data);
    const statistics = document.getElementById('statistics');
    dataStatistic.forEach(e => {
      const oneItem = `<ion-item>
        <ion-icon name="${e.icon}"></ion-icon>
        <ion-text class="pl-8">${e.label}</ion-text>
        <ion-text slot="end" class="number">${pointer.formatNumber(e.value)}</ion-text>
      </ion-item>`;
      statistics.insertAdjacentHTML('beforeend', oneItem);
    });
  }

  /**
   * hàm thực hiện tạo dữ liệu cho biểu đồ
   * created by HDNam 3/3/2020
   * @param data 
   */
  getDataChart(data) {
    const labels = [];
    const dataChart = [];
    data.forEach(item => {
      labels.push(item.ItemChart);
      dataChart.push(item.ItemChartValue);
    });
    return {labels, dataChart};
  }

  /**
   * hàm thực hiện load chart (chartjs)
   * created by HDNam 2/3/2020
   */
  loadChart(data) {
    const colorSet = ["#B26231", "#6C9421", "#F6C803", "#FF6600","#B31A49"];
    const { labels, dataChart } = this.getDataChart(data);
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: labels,
        datasets: [{
            data: dataChart,
            backgroundColor: colorSet,
            borderColor: colorSet,
            borderWidth: 1
        }]
      },
      options: {
        legend: { display: false },
        tooltips: { enabled: false },
        animation: {
          onComplete: function () {
              let ctx = this.chart.ctx;
              ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
              ctx.fillStyle = "black";
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              this.data.datasets.forEach(function (dataset) {
                  for (let i = 0; i < dataset.data.length; i++) {
                      for(let key in dataset._meta)
                      {
                        let model = dataset._meta[key].data[i]._model;
                        ctx.fillText(dataset.data[i], model.x + 17, model.y + 7);
                      }
                  }
              });
          }
        }
      }
    });
  }
}
