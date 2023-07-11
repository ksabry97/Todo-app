import { Component } from '@angular/core';
import { Task } from 'src/app/models/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  // global variables
  objTask: Task = new Task();
  task: string = '';
  taskarr: Task[] = [];
  editMode: boolean = false;

  constructor(private crud: CrudService) {}

  ngOnInit(): void {
    this.taskarr = [];
    this.updateUI();
  }

  //submit :
  Onsubmit() {
    if (this.task === '') return;
    this.editMode ? this.update(this.objTask) : this.addTask();
  }
  //adding task to database:
  addTask() {
    this.objTask.name = this.task;
    this.objTask.date = Date.now();
    this.objTask.id = Math.random();
    this.crud.addTask(this.objTask).subscribe((task) => {
      this.ngOnInit();
    });
    this.task = '';
  }

  //updating UI
  updateUI() {
    this.crud.getTasks().subscribe((tasks) => {
      this.taskarr = tasks;
    });
  }

  // editing a task :

  edit(etask: Task) {
    this.editMode = true;
    this.task = etask.name;
    this.objTask.id = etask.id;
    this.objTask.name = etask.name;
    this.objTask.date = etask.date;
  }
  //deleteing a task:

  delete(task: Task) {
    this.crud.deleteTask(task).subscribe((etask) => {
      this.ngOnInit();
    });
  }
  //updating a task:
  update(etask: Task) {
    etask.name = this.task;
    this.crud.updateTask(etask).subscribe((task) => {
      this.ngOnInit();
    });
    this.task = '';
    this.editMode = false;
  }
}
