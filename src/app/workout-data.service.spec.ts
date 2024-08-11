import { TestBed } from '@angular/core/testing';
import { WorkoutDataService, User } from './workout-data.service';

describe('WorkoutDataService', () => {
  let service: WorkoutDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutDataService);
  });

  // Clean up localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load users from local storage if available', () => {
    const mockData: User[] = [
      {
        id: 1,
        name: 'Alice',
        workouts: [{ type: 'Running', minutes: 45 }],
      },
    ];
    localStorage.setItem('userData', JSON.stringify(mockData));

    const newService = TestBed.inject(WorkoutDataService);
    expect(newService.getUsers()).toEqual(mockData);
  });

  it('should return the list of users', () => {
    const expectedUsers: User[] = [
      {
        id: 1,
        name: 'John',
        workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 20 }],
      },
      {
        id: 2,
        name: 'Jane',
        workouts: [{ type: 'Swimming', minutes: 40 }, { type: 'Yoga', minutes: 60 }],
      },
    ];
    expect(service.getUsers()).toEqual(expectedUsers);
  });

  it('should add a workout to an existing user', () => {
    service.addWorkout('John', 'Running', 15);
    const users = service.getUsers();
    const john = users.find(user => user.name === 'John');
    expect(john).toBeDefined();
    expect(john?.workouts.find(w => w.type === 'Running')?.minutes).toBe(45); // 30 + 15
  });

  it('should add a new user if the user does not exist', () => {
    service.addWorkout('Mike', 'Yoga', 30);
    const users = service.getUsers();
    const mike = users.find(user => user.name === 'Mike');
    expect(mike).toBeDefined();
    expect(mike?.workouts).toEqual([{ type: 'Yoga', minutes: 30 }]);
  });

  it('should update an existing workout for a user', () => {
    service.addWorkout('Jane', 'Swimming', 20); // Adds 20 minutes to existing 40 minutes
    const users = service.getUsers();
    const jane = users.find(user => user.name === 'Jane');
    expect(jane).toBeDefined();
    expect(jane?.workouts.find(w => w.type === 'Swimming')?.minutes).toBe(60); // 40 + 20
  });

  it('should save users to local storage', () => {
    const spy = spyOn(localStorage, 'setItem');
    service.addWorkout('Alice', 'Cycling', 25);
    expect(spy).toHaveBeenCalledWith('userData', JSON.stringify(service.getUsers()));
  });

  it('should load users from local storage on initialization', () => {
    const mockData: User[] = [
      {
        id: 1,
        name: 'Bob',
        workouts: [{ type: 'Running', minutes: 50 }],
      },
    ];
    localStorage.setItem('userData', JSON.stringify(mockData));
    const newService = TestBed.inject(WorkoutDataService);
    expect(newService.getUsers()).toEqual(mockData);
  });
});
