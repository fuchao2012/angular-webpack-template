import {NgModule} from '@angular/core'
import {AngularXEchartsDirective} from './directive/angualr-x-echarts.directive';

@NgModule({
    declarations: [AngularXEchartsDirective],
    exports:[AngularXEchartsDirective]
})
export class AngularXEchartsModule {}