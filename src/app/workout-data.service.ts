import { Injectable } from '@angular/core';

interface Workout {
  type: string;
  minutes: number;
}

interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root',
})
export class WorkoutDataService {
  private users: User[] = [
    {
      id: 1,
      name: 'John',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 20 },
      ],
    },
    {
      id: 2,
      name: 'Jane',
      workouts: [
        { type: 'Swimming', minutes: 40 },
        { type: 'Yoga', minutes: 60 },
      ],
    },
  ];

  constructor() {
    this.loadFromLocalStorage();
  }

  getUsers(): User[] {
    return this.users;
  }

  addWorkout(userName: string, workoutType: string, minutes: number): void {
    const existingUser = this.users.find(u => u.name === userName);

    if (existingUser) {
      const existingWorkout = existingUser.workouts.find(w => w.type === workoutType);
      if (existingWorkout) {
        existingWorkout.minutes += minutes; // Update existing workout
      } else {
        existingUser.workouts.push({ type: workoutType, minutes }); // Add new workout type
      }
    } else {
      const newUser: User = {
        id: this.users.length + 1,
        name: userName,
        workouts: [{ type: workoutType, minutes }],
      };
      this.users.push(newUser);
    }

    this.saveToLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      this.users = JSON.parse(storedData);
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('userData', JSON.stringify(this.users));
  }
}
