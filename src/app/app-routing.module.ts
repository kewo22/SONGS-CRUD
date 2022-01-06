import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSongComponent } from './components/add-song/add-song.component';
import { ListSongComponent } from './components/list-song/list-song.component';

const routes: Routes = [
  {
    path: 'list-song', component: ListSongComponent
  },
  {
    path: 'add-song', component: AddSongComponent
  },
  {
    path: 'edit-song/:id', component: AddSongComponent
  },
  { path: '', redirectTo: 'list-song', pathMatch: 'full' },
  // { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
