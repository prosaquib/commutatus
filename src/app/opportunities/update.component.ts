import { Component, OnInit,ViewChild,NgZone, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';


import { OpportunityService } from '../_services/opportunity.service';
import { SkillsService } from '../_services/skills.service';
import { BackgroundsService } from '../_services/background.service'

import { Opportunity } from '../_models/opportunities.model';
import { Skills } from '../_models/skills.model';
import { Backgrounds } from '../_models/backgrounds.model'

declare var google:any;
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
public latitude: number;
public longitude: number;
public searchControl: FormControl;
public zoom: number;
// public google:any;

@ViewChild("search")
public searchElementRef: ElementRef;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private opservice: OpportunityService,
    private skillservice: SkillsService,
    private backgroundservice: BackgroundsService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    this.searchControl = new FormControl();
    this.setCurrentPosition();
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
    
    
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
    });      
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onUpdate(val: any) {
        
    let tempData = { opportunity:{}}    
    
    val.role_info = {"city":val.city,"selection_process":val.selection_process};
    val.specifics_info = {"salary":val.salary};    
    val.skills.forEach(skill => {
      skill.option = "required";
      skill.level = 0;
    });
    val.backgrounds.forEach(background=>{
      background.option = "preferred";      
    })    
    tempData.opportunity = val    
               
    this.opservice.updateOpportunity(tempData).subscribe(data => {
      this.result.class = 'alert alert-success';
      this.result.message = 'Success!Opportunity has been updated successfully.';
      setTimeout(() => { this.result.class = ""; this.result.message = ""; }, 2000);
      setTimeout(() => { this.router.navigate(['/opportunity-view']) }, 2000)
    },err=>{
      console.log(err._body['error']);
      this.result.class = 'alert alert-warning';
      this.result.message = "Error!"+err._body;
      setTimeout(() => { this.result.class = ""; this.result.message = ""; }, 2000);
      setTimeout(() => { this.router.navigate(['/opportunity-view']) }, 2000)
    }
  );
  }
}