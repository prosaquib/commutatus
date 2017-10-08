import {Skills} from './skills.model';
import {RoleInfo} from './role_info.model';
import {SpecificsInfo} from './specifics_info.model'
import {Backgrounds} from './backgrounds.model'
export class Opportunity{
    constructor(
        id?:string,
        title?:string,
        applications_close_date?:string,
        earliest_start_date?:string,
        latest_end_date?:string,
        description?:string,        
        public skills = new Skills(),
        public role_info = new RoleInfo(),        
        public specifics_info = new SpecificsInfo(),   
        public backgrounds = new Backgrounds()             
    ){}
}

