
import {
    Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output,
    SimpleChange
} from '@angular/core';

export declare let echarts: any;

@Directive({
    selector: '[echarts]'
})

/**
 * @ng-doc
 * @description Angular-X with Echarts
 * @Input options 初始化图表所需配置
 * @Input dataset 图表数据数组
 * @Input theme 通用视觉
 * @Input loading 加载中效果
 * @return-data-demo 返回配置成功的 echarts 对象及生成的图表
 */
export class AngularXEchartsDirective implements OnChanges, OnDestroy{

    @Input() options: any;
    @Input() dataset: Array<any>;
    @Input() theme: string = '';
    @Input() loading: boolean = true;
    //@Input() eventList: Array<any>; // 事件列表

    @Output() chartInit: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartContextMenu: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDataZoom: EventEmitter<any> = new EventEmitter<any>();

    private thisChart: any = null;
    private currentWindowWidth: any = null;

    constructor(private el:ElementRef) {}

    ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
        if(changes['dataset']){
            this.onDatasetChange(this.dataset);
        }
        if(changes['options']){
            this.onOptionsChange(this.options);
        }
        if(changes['loading']){
            this.onLoadingChange(this.loading);
        }
    }

    ngOnDestroy(){
        if(this.thisChart){
            this.thisChart.dispose();
            this.thisChart = null;
        }
    }

    private createChart(){
        this.theme = this.theme || '';
        this.currentWindowWidth = window.innerWidth;

        if(this.theme){
            return echarts.init(this.el.nativeElement, this.theme)
        }else{
            return echarts.init(this.el.nativeElement)
        }
    }

    private updateChart(){
        this.thisChart.setOption(this.options);
        this.thisChart.resize();
    }

    private onDatasetChange(dataset: Array<any>) {
        if(this.thisChart && this.options){
            if(!this.options.series){
                this.options.series = [];
            }
            this.mergeDataset(dataset);
        }
    }

    private onOptionsChange(options: any) {
        if(options){
            if(!this.thisChart){
                this.thisChart = this.createChart();
                this.chartInit.emit(this.thisChart);
                this.registerEvents(this.thisChart);
            }
            if(this.hasData()){
                this.updateChart();
            }else if(this.dataset && this.dataset.length){
                this.mergeDataset(this.dataset);
            }
        }
    }

    private onLoadingChange(loading: boolean) {
        if(this.thisChart){
            if(loading){
                this.thisChart.showLoading();
            }else{
                this.thisChart.hideLoading();
            }
        }
    }

    private registerEvents(thisChart: any) {
        if(thisChart){

            // todo use eventList
            // let eventList = ['click', 'dbclick', 'mousedown', 'moseup', 'mouseover', 'mouseout', 'globalout', 'contextmenu'];
            // eventList.forEach(item => thisChart.on(item, (e:any)=>this['chart'+???]))

            thisChart.on('click', (e: any) => this.chartClick.emit(e));
            thisChart.on('dblClick', (e: any) => this.chartDblClick.emit(e));
            thisChart.on('mousedown', (e: any) => this.chartMouseDown.emit(e));
            thisChart.on('mouseup', (e: any) => this.chartMouseUp.emit(e));
            thisChart.on('mouseover', (e: any) => this.chartMouseOver.emit(e));
            thisChart.on('mouseout', (e: any) => this.chartMouseOut.emit(e));
            thisChart.on('globalout', (e: any) => this.chartGlobalOut.emit(e));
            thisChart.on('contextmenu', (e: any) => this.chartContextMenu.emit(e));
            thisChart.on('dataZoom', (e: any) => this.chartDataZoom.emit(e));

        }
    }

    private hasData() : boolean {
        if(!this.options.series || !this.options.series.length){
            return false;
        }
        return this.options.series.some(elem => elem.data && elem.data.length > 0);
    }

    private mergeDataset(dataset: Array<any>) {
        if(dataset && dataset.length){
            dataset.forEach((value, index)=> {
                if(!this.options.series[index]){
                    this.options.series[index] = {data: value}
                }else{
                    this.options.series[index].data = value
                }
            });
            this.updateChart();
        }else{
            console.log('merge nothing, dataset is empty');
        }
    }
}