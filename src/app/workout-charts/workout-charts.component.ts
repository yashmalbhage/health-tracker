// import { Component, OnInit } from '@angular/core';
// import { WorkoutDataService } from '../workout-data.service';
// import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

// interface Workout {
//   type: 'Swimming' | 'Running' | 'Cycling' | 'Yoga';
//   minutes: number;
// }

// @Component({
//   selector: 'app-workout-charts',
//   templateUrl: './workout-charts.component.html',
//   styleUrls: ['./workout-charts.component.css']
// })
// export class WorkoutChartsComponent implements OnInit {
//   users: any[] = [];
//   selectedUser: any = null;

//   chartOptions: ChartOptions = {
//     responsive: true,
//     scales: {
//       y: {
//         beginAtZero: true
//       }
//     }
//   };
//   chartLabels: string[] = ['Swimming', 'Running', 'Cycling', 'Yoga'];
//   chartType: ChartType = 'bar';
//   chartLegend = true;
//   chartData: ChartDataSets[] = [];

//   constructor(private workoutDataService: WorkoutDataService) { }

//   ngOnInit(): void {
//     this.users = this.workoutDataService.getUsers();
//   }

//   selectUser(user: any): void {
//     this.selectedUser = user;
//     this.updateChart();
//   }

//   updateChart(): void {
//     if (this.selectedUser) {
//       // Initialize with default values
//       const workoutMinutes: { [key in Workout['type']]: number } = {
//         Swimming: 0,
//         Running: 0,
//         Cycling: 0,
//         Yoga: 0
//       };

//       // Accumulate minutes based on workout type
//       this.selectedUser.workouts.forEach((workout: Workout) => {
//         if (workoutMinutes[workout.type] !== undefined) {
//           workoutMinutes[workout.type] += workout.minutes;
//         }
//       });

//       this.chartData = [{
//         data: [
//           workoutMinutes.Swimming,
//           workoutMinutes.Running,
//           workoutMinutes.Cycling,
//           workoutMinutes.Yoga
//         ],
//         label: 'Workout Minutes'
//       }];
//     }
//   }
// }
