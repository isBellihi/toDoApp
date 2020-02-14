import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskModel } from 'src/app/shared/models/task.model';
import { TaskService } from 'src/app/shared/services/task.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  /*todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];*/
  public todo: TaskModel[];
  public done: TaskModel[];

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log("okk")
    this.todo = [];
    this.done = []
    this.taskService.getTasks().subscribe(tasks => {
      const _tasks = tasks.map(e => {
        return {
          id: e.payload.doc.id,
          ...Object.assign({},e.payload.doc.data())
        } as TaskModel;
      })
      this.done = _tasks.filter(task => task.completed);
      this.todo = _tasks.filter(task => !task.completed);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  addTask(task: TaskModel){

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
