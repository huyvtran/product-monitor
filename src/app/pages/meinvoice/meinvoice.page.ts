import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from '@angular/router';
import {Chart} from "chart.js";
import { MonitorService } from 'src/app/services/monitor.service';

@Component({
  selector: 'app-meinvoice',
  templateUrl: './meinvoice.page.html',
  styleUrls: ['./meinvoice.page.scss'],
})
export class MEINVOICEPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  private barChart: Chart;
  url = "https://localhost:44324/api/productmonitor/meinvoice";

  constructor(private router: Router, private monitorService: MonitorService) {}

  ngOnInit() {
    this.setTime();

    const pointer = this;
    this.monitorService.sendGetData(this.url).subscribe(res => {
      const data = res["Data"];
      
      const {labels, dataChart} = pointer.setDataChart(data);      
      pointer.loadChart(labels, dataChart);

      const dataStatistic = pointer.getDataStatistic(data);
      pointer.bindDataStatistic(dataStatistic, pointer);

      const numberCustomer = data[0]["SubcriberNumber"] + data[0]["SubcriberNumberCancel"];
      document.getElementById('subcriber-number').innerHTML = pointer.formatNumber(numberCustomer);

      
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
    const hour = date.getHours() % 12;
    const min = date.getMinutes();
    const second = date.getSeconds();
    return `0${hour}:${min}:${second}`;
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
  bindDataStatistic(dataStatistic, pointer) {
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
  setDataChart(data) {
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
  loadChart(labels, data) {
    const colorSet = ["#B26231", "#6C9421", "#F6C803", "#FF6600","#B31A49"];
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "horizontalBar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "",
            data: data,
            backgroundColor: colorSet,
            borderColor: colorSet,
            borderWidth: 1
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        animation: {
          onComplete: function () {
              var ctx = this.chart.ctx;
              ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
              ctx.fillStyle = "black";
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              this.data.datasets.forEach(function (dataset) {
                  for (var i = 0; i < dataset.data.length; i++) {
                      for(var key in dataset._meta)
                      {
                          var model = dataset._meta[key].data[i]._model;
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
