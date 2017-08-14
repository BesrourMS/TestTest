import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { ContratComponent } from './contrat/contrat.component';
import { ProprieteComponent } from './propriete/propriete.component';
import { DepensesComponent } from './depenses/depenses.component';
import { PayementComponent } from './payement/payement.component';
import { CatTaxonomieComponent } from './cattaxonomie/cattaxonomie.component';
import { LoginComponent } from './login/login.component';
import {	Signup } from './signup/signup';
import { CanActivateAuthGuard } from './can-activate.authguard';


const routes: Routes = [
	{
    path: 'client',
    component: ClientComponent,canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'contrat',
    component: ContratComponent,canActivate: [CanActivateAuthGuard]
  },
  {
    path: 'payement',
    component: PayementComponent,canActivate: [CanActivateAuthGuard]
  },
  {
    path: '',
    redirectTo: '/cattaxonomie',canActivate: [CanActivateAuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
   {
    path: 'signup',
    component: Signup,
  },
  {
  path: 'propriete',
  component: ProprieteComponent,canActivate: [CanActivateAuthGuard]
	},
	  {
  path: 'cattaxonomie',
  component: CatTaxonomieComponent,canActivate: [CanActivateAuthGuard]
	},
	{
  path: 'depenses',
  component: DepensesComponent,canActivate: [CanActivateAuthGuard]
	}
];
export const appRouterModule = RouterModule.forRoot(routes);