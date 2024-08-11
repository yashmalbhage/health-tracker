import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { WorkoutFormComponent } from './workout-form.component';
import { WorkoutDataService } from '../workout-data.service';
import { of } from 'rxjs';

describe('WorkoutFormComponent', () => {
  let component: WorkoutFormComponent;
  let fixture: ComponentFixture<WorkoutFormComponent>;
  let workoutDataService: WorkoutDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutFormComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: WorkoutDataService,
          useValue: {
            addWorkout: jasmine.createSpy('addWorkout')
          }
        }
      ]
    }).compileComponents();

    workoutDataService = TestBed.inject(WorkoutDataService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addWorkout and reset form on form submit', () => {
    component.userName = 'John Doe';
    component.workoutType = 'running';
    component.workoutMinutes = 30;

    component.addWorkout();

    expect(workoutDataService.addWorkout).toHaveBeenCalledWith('John Doe', 'running', 30);
    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBe(0);
  });

  it('should reset form fields', () => {
    component.userName = 'John Doe';
    component.workoutType = 'running';
    component.workoutMinutes = 30;

    component.resetForm();

    expect(component.userName).toBe('');
    expect(component.workoutType).toBe('');
    expect(component.workoutMinutes).toBe(0);
  });

  it('should not call addWorkout if inputs are invalid', () => {
    component.userName = '';
    component.workoutType = '';
    component.workoutMinutes = 0;

    component.addWorkout();

    expect(workoutDataService.addWorkout).not.toHaveBeenCalled();
  });
});
