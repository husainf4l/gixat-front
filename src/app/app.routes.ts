import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddClientComponent } from './pages/clients/add-client/add-client.component';
import { ClientListComponent } from './pages/clients/client-list/client-list.component';
import { AddCarComponent } from './pages/cars/add-car/add-car.component';
import { CarListComponent } from './pages/cars/car-list/car-list.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { AddInventoryItemComponent } from './pages/inventory/add-inventory-item/add-inventory-item.component';
import { QuickbooksComponent } from './pages/quickbooks/quickbooks.component';
import { CompanyInfoQuickbooksComponent } from './pages/quickbooks/company-info-quickbooks/company-info-quickbooks.component';
import { InvoiceListComponent } from './pages/quickbooks/invoice-list/invoice-list.component';
import { BoardsListComponent } from './pages/jobcard/boards-list/boards-list.component';
import { NewjobComponent } from './pages/jobcard/newjob/newjob.component';
import { InvoiceComponent } from './invoice/invoice.component';

const mainRoutes: Routes = [
    {
        path: '', component: MainLayoutComponent, children: [
            { path: '', component: InvoiceComponent },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },

        ]
    },
];

const dashboardRoutes: Routes = [
    {
        path: 'app',
        component: UserLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'clients', component: ClientListComponent },
            { path: 'clients/add-client', component: AddClientComponent },
            { path: 'cars', component: CarListComponent },
            { path: 'cars/add-car', component: AddCarComponent },
            { path: 'inventory', component: InventoryComponent },
            { path: 'inventory/add', component: AddInventoryItemComponent },
            { path: 'reports', component: AddCarComponent },
            { path: 'quickbooks', component: QuickbooksComponent },
            { path: 'companyInfo', component: CompanyInfoQuickbooksComponent },
            { path: 'quick-invoices', component: InvoiceListComponent },
            { path: 'jobcards/kanban', component: BoardsListComponent },
            { path: 'jobcards/new', component: NewjobComponent },


        ]
    },
];

export const routes: Routes = [
    ...mainRoutes,
    ...dashboardRoutes,
    { path: '**', component: NotFoundComponent }  // Fallback route for undefined paths
];
