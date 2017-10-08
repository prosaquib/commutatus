import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";

import { OpportunityService } from '../_services/opportunity.service';
import { SkillsService } from '../_services/skills.service';
import { BackgroundsService } from '../_services/background.service'

import { Opportunity } from '../_models/opportunities.model';
import { Skills } from '../_models/skills.model';
import { Backgrounds } from '../_models/backgrounds.model'


@Component({
  selector: 'app-opportunity-update',
  templateUrl: './update.component.html'
})

export class OpportunityUpdateComponent implements OnInit {
  title = 'Update';
  opportunityId: number;
  opportunity = new Opportunity()
  skills = new Skills();
  skill = [];
  background = [];
  error: any = {};
  result: any = {
    class: '',
    message: ''
};
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private opservice: OpportunityService,
    private skillservice: SkillsService,
    private backgroundservice: BackgroundsService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.opportunityId = params['id']
      this.opservice.getOpportunity().subscribe(data => {
        this.opportunity = data;

        let tempSkill = Object.keys(this.opportunity.skills).map(key => this.opportunity.skills[key]);
        let tempBackground = Object.keys(this.opportunity.backgrounds).map(key => this.opportunity.backgrounds[key]);
        // console.log(tempSkill);
        tempSkill.forEach( t => {
          this.skill.push(t);
        });
        
        tempBackground.forEach( t => {
          this.background.push(t);
        });
        this.skillservice.getSkills().subscribe(datas => {
          // console.log(datas);
          
          datas.forEach(data => {
            this.skill.push(data);
          });
        })

        this.backgroundservice.getBackground().subscribe(datas => {
          datas.forEach(data => {
            this.background.push(data);
          });
        })        
      });
    })
  }

  onUpdate(val: any) {
    // console.log(val);
    
    // val.skills.option = "required";
    // val.skills.level = 0;
    // let data = val.title;
    let tempData = { opportunity:{}}
    if(val.title){      
      tempData.opportunity = val;      
    } if(val.application_close_date){      
      tempData.opportunity = val;
    } if(val.earliest_start_date){
      tempData.opportunity = val;
    } if(val.latest_end_date){
      tempData.opportunity = val;
    } if(val.description){
      tempData.opportunity = val;
    } if(val.description){
      tempData.opportunity = val;
    } if(val.skills){
      console.log(val.skills);      
      // let tempSkills = {
      //   skills:[{
      //   "option":"required",
      //   "level": 0,
      //   "id":val.skills[0].id,
      //   "name":val.skills[0].name
      //   }]
      // }      
      // console.log(tempSkills);

      val.skills[0].option="required";
      val.skills[0].level=0;
      
      // tempData.opportunity = tempSkills;
      tempData.opportunity = val.skills;
      console.log(val.skills);
      
    } if(val.selection_process){
      console.log("Hello");
      let selectionProcess = {role_info:{"selection_process":val.selection_process}}
      tempData.opportunity = selectionProcess;
    }
    console.log(val);
    
    this.opservice.updateOpportunity(tempData).subscribe(data => {
      this.result.class = 'alert alert-success';
      this.result.message = 'Success!Opportunity has been updated successfully.';
      setTimeout(() => { this.result.class = ""; this.result.message = ""; }, 2000);
      setTimeout(() => { this.router.navigate(['/opportunity-view']) }, 2000)
    },error=>{
      console.log(error.json().error)
      this.result.class = 'alert alert-warning';
      this.result.message = "Error!"+error.json().error;
      setTimeout(() => { this.result.class = ""; this.result.message = ""; }, 2000);
      setTimeout(() => { this.router.navigate(['/opportunity-view']) }, 2000)
    }
  );
  }
}