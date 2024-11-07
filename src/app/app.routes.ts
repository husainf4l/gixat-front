import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { CarsComponent } from './pages/cars/cars.component';
import { AddCarComponent } from './pages/cars/add-car/add-car.component';

const mainRoutes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', component: HomepageComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },

        ]
    },
];

const dashboardRoutes: Routes = [
    {
        path: 'app',
        component: UserLayoutComponent,
        // canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'clients', component: ClientsComponent },
            { path: 'clients/list', component: ClientListComponent },
            { path: 'clients/add-client', component: AddClientComponent },
            { path: 'cars', component: CarsComponent },
            { path: 'cars/list', component: ClientListComponent },
            { path: 'cars/add-car', component: AddCarComponent },

        ]
    },
];

export const routes: Routes = [
    ...mainRoutes,
    ...dashboardRoutes,
    { path: '**', component: NotFoundComponent }  // Fallback route for undefined paths
];
