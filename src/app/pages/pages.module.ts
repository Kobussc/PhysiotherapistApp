import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PagesComponent, HomeComponent, AboutMeComponent, ContactComponent, ServicesComponent]
})
export class PagesModule { }
