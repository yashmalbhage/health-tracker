import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
// import { WorkoutChartsComponent } from './workout-charts/workout-charts.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: WorkoutFormComponent },
  { path: 'list', component: WorkoutListComponent },
  // { path: 'charts', component: WorkoutChartsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
