import { Component, OnInit } from '@angular/core';
import { WorkoutDataService } from '../workout-data.service';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  name: string;
  workouts: Workout[];
}

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchName: string = '';
  filterMinTime: number | null = null;
  filterMaxTime: number | null = null;
  filterWorkoutType: string = ''; // New filter property
  pageSize: number = 5;
  currentPage: number = 1;

  workoutTypes: string[] = ['Swimming', 'Running', 'Cycling', 'Yoga'];

  constructor(private workoutDataService: WorkoutDataService) { }

  ngOnInit(): void {
    this.users = this.workoutDataService.getUsers();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(this.searchName.toLowerCase());
      const totalTime = this.computeTotalTime(user.workouts);
      const timeMatch = (!this.filterMinTime || totalTime >= this.filterMinTime) &&
                        (!this.filterMaxTime || totalTime <= this.filterMaxTime);
      const workoutTypeMatch = !this.filterWorkoutType ||
        user.workouts.some(workout => workout.type === this.filterWorkoutType);

      return nameMatch && timeMatch && workoutTypeMatch;
    });
    this.currentPage = 1;
  }

  getUserWorkouts(user: User): Workout[] {
    return user.workouts;
  }

  computeTotalTime(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  getWorkoutTypesDone(user: User): string[] {
    return user.workouts.map((workout: Workout) => workout.type);
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
