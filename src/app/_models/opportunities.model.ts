import {Skills} from './skills.model'
export class Opportunity{
    constructor(
        title?:string,
        applications_close_date?:string,
        earliest_start_date?:string,
        latest_end_date?:string,
        description?:string,
        backgrounds?:string,
        public skills = new Skills(),
        selection_process?:string,
        salary?:number,
        city?:string
    ){}
}

