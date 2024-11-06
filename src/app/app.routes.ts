import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { SignupComponent } from './signup/signup.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientAddComponent } from './client/client-add/client-add.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { CarAddComponent } from './client/car-add/car-add.component';
import { JobCreateComponent } from './job/job-create/job-create.component';
import { HomepageComponent } from './homepage/homepage.component';

// Define routes under Main layout
const mainRoutes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', component: HomepageComponent },  // Ensure 'home' route exists if used
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },

            // Add other public routes if necessary
        ]
    },
];

// Define routes under User layout
const dashboardRoutes: Routes = [
    {
        path: 'dashboard',
        component: UserLayoutComponent,
        // canActivate: [AuthGuard],
        children: [
            { path: '', component: UsersComponent },  // Ensure 'overview' route exists if used
            { path: 'users', component: UsersComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'clients', component: ClientListComponent },
            { path: 'clients/add', component: ClientAddComponent },
            { path: 'clients/:id', component: ClientDetailComponent },
            { path: 'clients/:clientId/add-car', component: CarAddComponent },
            { path: 'jobs/create', component: JobCreateComponent },

            // Add other dashboard routes if necessary
        ]
    },
];

// Combine all routes
export const routes: Routes = [
    ...mainRoutes,
    ...dashboardRoutes,
    { path: '**', component: NotFoundComponent }  // Fallback route for undefined paths
];
