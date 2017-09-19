import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import {OpportunityService} from '../_services/opportunity.service'
import {SkillsService} from '../_services/skills.service'
import {Opportunity} from '../_models/opportunities.model';
import {Skills} from '../_models/skills.model'


@Component({
  selector: 'opportunity-update',
  templateUrl: './update.component.html',  
})

export class OpportunityUpdateComponent implements OnInit{
    title = "Update";
    opportunityId:number
    opportunity = new Opportunity()
    skills = new Skills()
    names;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
      private opservice:OpportunityService,
      private skillservice:SkillsService){

        
      }

    ngOnInit(){
      this.activatedRoute.params.subscribe((params: Params) => {
            this.opportunityId = params['id']
            this.opservice.getOpportunity().subscribe(data=>{
              this.opportunity = data;
              // this.opportunity.skills.forEach(skill => {
              //   this.names = skill.name;
              // });
              // for(let i = 0; i<this.opportunity.skills.length(); i++){

              // }
              console.log(this.opportunity);
            })
            // this.skillservice.getSkills().subscribe(skills=>{
            //   this.skills = skills;              
            // })
        })
    }

    
}