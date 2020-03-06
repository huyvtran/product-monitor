import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

@Component({
  selector: 'app-bamboo',
  templateUrl: './bamboo.page.html',
  styleUrls: ['./bamboo.page.scss'],
})
export class BambooPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.loadChartSME();
    this.loadLegend();
  }

  formatNumber(number) {
    if (!isNaN(number)) {
      return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    }
  }

  navigate(uri) {
    const origin = window.location.origin;
    window.location.href = origin + uri;
  }

  loadLegend() {
    const pointer = this;
    const chartLegend = document.getElementById('chart-legend');
    const color = ["secondary", "danger", "warning", "tertiary"];
    const data = [
      {ItemChart: "Bamboo", ItemChartValue: 8674},
      {ItemChart: "Bamboo2017", ItemChartValue: 267},
      {ItemChart: "Bamboo2015", ItemChartValue: 263},
      {ItemChart: "Bamboo2012", ItemChartValue: 24},
    ];
    data.forEach((item, i) => {
      const oneLegend = `<ion-item>
        <ion-icon class="legend-icon" name="ellipse-outline" color="${color[i]}"></ion-icon>
        <ion-text color="legend-label medium font-size-12 pl-8 ">${item.ItemChart}</ion-text>
        <ion-text slot="end" class="number pl-8">${pointer.formatNumber(item.ItemChartValue)}</ion-text>
      </ion-item>`;
      chartLegend.insertAdjacentHTML('beforeend', oneLegend);
    });
  }

  loadChartSME() {
    let chart = am4core.create("chartContainer", am4charts.PieChart);
    chart.data = [
      {product: "Bamboo", value: 94},
      {product: "Bamboo 2017", value: 3},
      {product: "Bamboo 2015", value: 2},
      {product: "Bamboo 2012", value: 1},
    ];
    chart.innerRadius = am4core.percent(15);
    chart.radius = am4core.percent(55);

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "product";
    pieSeries.labels.template.text = "{value.value}%";
    pieSeries.colors.list = [
      am4core.color("#72DAF9"),
      am4core.color("#EE988C"),
      am4core.color("#F7BF34"),
      am4core.color("#B3ADF6"),
    ];
  }

}
