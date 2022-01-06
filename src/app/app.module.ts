import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { AddSongComponent } from './components/add-song/add-song.component';
import { ListSongComponent } from './components/list-song/list-song.component';
import { SafeUrlPipe } from './pipes/sanitize-url.pipe';
import { LocalStorageService } from './services/LocalStorage.service';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitcherComponent,
    AddSongComponent,
    ListSongComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    ThemeSwitcherComponent,
    SafeUrlPipe,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
