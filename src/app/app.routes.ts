import { Routes, RouterModule } from '@angular/router';

import {OpportunityUpdateComponent} from './opportunities/update.component';
import {OpportunityViewComponent} from './opportunities/view/view.component';
const appRoutes: Routes = [
    { path:'opportunity-view',component:OpportunityViewComponent},
    { path:'opportunity-update/:id',component:OpportunityUpdateComponent}
 ]

export const APP_ROUTES = RouterModule.forRoot(appRoutes)