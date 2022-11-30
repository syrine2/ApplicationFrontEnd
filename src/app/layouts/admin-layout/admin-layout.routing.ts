import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';

import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { RubriquesComponent } from 'app/rubriques/rubriques.component';
import { LoginComponent } from 'app/login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { AjoutRubriqueComponent } from 'app/ajout-rubrique/ajout-rubrique.component';
import { BlocsComponent } from 'app/blocs/blocs.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'rubriques/:id',  component: RubriquesComponent },
    { path: 'register',        component: RegisterComponent },
    { path: 'ajout-rubrique',        component: AjoutRubriqueComponent },
    { path: 'blocs',        component: BlocsComponent },

];
