import { Component, Input, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { MatDialogConfig, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from 'src/app/to-do/pop-up/pop-up.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: TaskModel;


  constructor(private dialog: MatDialog, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  editTask(task: TaskModel): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {
        task: task,
        mode: "update"
      };
      dialogConfig.maxWidth = "400px";
      dialogConfig.maxHeight = "500px";
      dialogConfig.width = "400px";
      dialogConfig.height = "350px";
      const dialogRef = this.dialog.open(PopUpComponent, dialogConfig);
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
  }

  deleteTask(task: TaskModel){
    this.taskService.deleteTask(task.id)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err);
      })
  }

}
