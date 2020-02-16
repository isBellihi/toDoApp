import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { TaskModel } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isLoading = false;
  public todo: TaskModel[];
  public done: TaskModel[];
  private draggedTask: TaskModel;
  private tasksSubject = new BehaviorSubject<TaskModel[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todo = [];
    this.done = []
    this.isLoading = true;
    this.taskService.getTasks().subscribe(tasks => {
      const _tasks = tasks.map(e => {
        return {
          id: e.payload.doc.id,
          ...Object.assign({},e.payload.doc.data())
        } as TaskModel;
      })
      this.tasksSubject.next(_tasks);
      this.isLoading = false;
    });
    this.tasks$.subscribe(_tasks => {
      this.done = _tasks.filter(task => task.completed);
      this.todo = _tasks.filter(task => !task.completed);
    });
  }

  dragStart(event: CdkDragDrop<string[]>, task: TaskModel){
    this.draggedTask = task;
  }

  complete(event: CdkDragDrop<string[]>) {
    if(this.draggedTask.completed === true) return;
    this.draggedTask.completed = true
    this.taskService.updateTask(this.draggedTask);
  }

  reset(event: CdkDragDrop<string[]>){
    if(this.draggedTask.completed === false) return;
    this.draggedTask.completed = false
    this.taskService.updateTask(this.draggedTask);  
  }

  openDialog(task?: TaskModel): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      task: task,
      mode: "new"
    };
    dialogConfig.maxWidth = "400px";
    dialogConfig.maxHeight = "500px";
    dialogConfig.width = "400px";
    dialogConfig.height = "350px";
    const dialogRef = this.dialog.open(PopUpComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
