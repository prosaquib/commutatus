import { Skills } from './skills.model';
import { RoleInfo } from './role_info.model';
import { SpecificsInfo } from './specifics_info.model'
import { Backgrounds } from './backgrounds.model'
export class Opportunity {
    constructor(
        public id?: string,
        public title?: string,
        public applications_close_date?: string,
        public earliest_start_date?: string,
        public latest_end_date?: string,
        public description?: string,
        public skills = new Skills(),
        public role_info = new RoleInfo(),
        public specifics_info = new SpecificsInfo(),
        public backgrounds = new Backgrounds()
    ) { }
}

