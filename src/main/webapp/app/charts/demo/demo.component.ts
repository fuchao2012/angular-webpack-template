import {Component, ViewEncapsulation} from '@angular/core';

import * as config from './options-config'

@Component({
    selector: 'demo-echarts',
    templateUrl: 'demo.component.html',
    styleUrls: ['demo.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class DemoEchartsComponent {
    // 实际的配置应该由 playground 导出，或者重用
    options1 = config.LineChartOptions1;
    options2:any = config.BarChartOptions1();
    options3 = config.PieChartOptions1;
    options4 = config.BarChartOptions2;
    options5:any = config.BarChartOptions1();

    dataset = config.BarChartDataset1;
    loading: boolean = false;
    revert: boolean = false;
    chartInstance = null;

    changeDataset() {
        this.dataset = (this.dataset == config.BarChartDataset2) ? config.BarChartDataset1 : config.BarChartDataset2;
    }

    toggleLoading() {
        this.loading = !this.loading;
    }

    onChartClick(e) {
        console.log('clicked event', e);
    }

    onChartDbClick(e) {
        console.log('double clicked event', e);
    }

    changeOptions() {
        this.options5 = Object.assign({}, this.options5);
        this.options5.legend = {show: true};
        this.options5.legend.data = [{name: '直接访问', icon: 'circle'}];
        this.options5.series = [];
        this.options5.series[0] = {
            name: '直接访问',
            type: 'line',
            markPoint: {
                data: [
                    {type: 'min', name: '最小值'},
                    {type: 'max', name: '最大值'},
                ]
            }
        };
        this.revert = true;
    }

    revertOptions(){
        this.options5 = config.BarChartOptions1();
        this.revert = false;
    }

    onChartInit(ei){
        this.chartInstance = ei;
    }

    showLoadingByInstance(){
        if(this.chartInstance){
            this.chartInstance.showLoading();
        }
    }
    hideLoadingByInstance(){
        if(this.chartInstance){
            this.chartInstance.hideLoading();
        }
    }
}