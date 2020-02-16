import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firestore: AngularFirestore) { }

  getTasks(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('tasks').snapshotChanges();
  }

  addTask(task: TaskModel): Promise<DocumentReference> {
    return this.firestore.collection('tasks').add(task);
  }

  updateTask(task: TaskModel): Promise<void>{
    const id = task.id;
    delete task.id;
    return this.firestore.doc('tasks/' + id).update(task);
  }

  deleteTask(taskId: string): Promise<void>{
    return this.firestore.doc('tasks/' + taskId).delete();
  }

}
