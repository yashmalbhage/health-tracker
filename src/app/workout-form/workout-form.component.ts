import { Component, OnInit } from '@angular/core';
import { WorkoutDataService } from '../workout-data.service';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent implements OnInit {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutDataService: WorkoutDataService) { }

  ngOnInit(): void {
  }

  addWorkout(): void {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      this.workoutDataService.addWorkout(this.userName, this.workoutType, this.workoutMinutes);
      this.resetForm();
    }
  }

  resetForm(): void {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
