import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../business/home/home.component'
import {RegisterComponent} from '../business/register/register.component';
import {SearchComponent} from '../business/search/search.component';
import {ItemsComponent} from '../business/items/Items.component';
import {CartComponent} from '../business/cart/Cart.component';
import {ProfileComponent} from '../business/profile/profile.component';

const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path:'register',
        component: RegisterComponent
    },
    {
        path:'search',
        component: SearchComponent
    },
    {
        path:'profile',
        component: ProfileComponent
    },
    {
        path:'items',
        component: ItemsComponent
    },
    {
        path:'cart',
        component:CartComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    }
]
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);