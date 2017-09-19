import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {OpportunityUpdateComponent} from './opportunities/update.component';
import {OpportunityViewComponent} from './opportunities/view/view.component';
import {APP_ROUTES} from './app.routes';
import { DatePipe } from '@angular/common';


import {OpportunityService} from './_services/opportunity.service'
import {SkillsService} from './_services/skills.service'

@NgModule({
  declarations: [
    AppComponent,    
    OpportunityUpdateComponent,
    OpportunityViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    APP_ROUTES,
    
  ],
  providers: [OpportunityService,DatePipe,SkillsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
