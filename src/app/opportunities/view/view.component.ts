import { Component,OnInit } from '@angular/core';
import {Opportunity} from '../../_models/opportunities.model';
import {OpportunityService} from '../../_services/opportunity.service'
import { Router, ActivatedRoute, Params } from "@angular/router";
 
@Component({
  selector: 'opportunity-view',
  templateUrl: './view.component.html',  
})

export class OpportunityViewComponent implements OnInit{
    opportunity:Opportunity;
    opportunitData :any

    constructor(private opservice:OpportunityService,private router:Router,private activatedRoute: ActivatedRoute){}
    ngOnInit(){
      
      this.opservice.getOpportunity().subscribe(data=>{
        // console.log(response);
        this.opportunitData = data
        console.log(this.opportunitData)
      })

      }
    }
