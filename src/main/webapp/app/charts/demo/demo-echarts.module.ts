import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CodeblockModule} from 'ng-prism';
import {TabsModule} from 'ngx-bootstrap';
import {AngularXEchartsModule} from '../src/index';

import {DemoEchartsComponent} from './demo.component';

@NgModule({
    declarations:[DemoEchartsComponent],
    imports:[BrowserModule, FormsModule, HttpModule, CodeblockModule, TabsModule.forRoot(), AngularXEchartsModule],
    bootstrap:[DemoEchartsComponent]
})

export class DemoEchartsModule {}