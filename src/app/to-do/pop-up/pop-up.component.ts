import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskModel } from 'src/app/shared/models/task.model';
import { FormGroup, FormControl } from '@angular/forms';
import { TaskService } from 'src/app/shared/services/task.service';

interface inputData {
  task: TaskModel;
  mode: string;
}

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {
  public taskForm: FormGroup;
  public today: Date = new Date();
  public isSending = false;
  public sendingText = "sending data ..."

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: inputData,
    private serviceTask: TaskService) {}

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      completed: new FormControl(false)
    });
    if(this.data.task){
      this.taskForm.setValue({
        title: this.data.task.title,
        description: this.data.task.description,
        completed: this.data.task.completed,
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose(): void {
    this.isSending = true;
    switch (this.data.mode) {
      case "new":
        this.addTask();
        break;
      case "update":
        this.updateTask();
        break;
      default:
        break;
    }
  }

  addTask(): void {
    this.serviceTask.addTask(this.taskForm.value)
      .then(result => {
        this.isSending = false;
        this.dialogRef.close(this.taskForm.value);
      })
      .catch(err => {
        this.sendingText = " Error when sending data"
        this.isSending = true;
      });
  }

  updateTask(): void {
    this.serviceTask.updateTask({
      ...this.taskForm.value,
      id: this.data.task.id
    })
    .then(result => {
      this.isSending = false;
      this.dialogRef.close(this.taskForm.value);
    })
    .catch(err => {
      this.sendingText = " Error when sending data"
      this.isSending = true;
    });
  }
}
