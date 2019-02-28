import { Component, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { DatabaseService } from '../../providers/database.service';

export interface Todo {
  title: string;
  date: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {
  value = '';

  public todo: Todo[];

  public done: Todo[];

  arr = [];

  constructor(public dataService: DatabaseService) {}

  ngOnInit() {
    this.todo = this.dataService.get('todo');
    this.done = this.dataService.get('done');

    if ( ! this.todo  ) {
      this.todo = [];
    }

    if ( ! this.done ) {
      this.done = [];
    }
  }

  onSubmit() {
    this.todo.push({ title: this.value, date: new Date().toString() });
    this.dataService.set('todo', this.todo);
    this.value = '';
  }

  clearInput(event: MouseEvent) {
    if ((<HTMLElement>event.target).nodeName === 'MAT-ICON') {
      this.value = '';
    }
  }

  deleteTask(index: number) {
    this.done.splice(index, 1);
    this.dataService.set('done', this.done);
  }

  onAreaListControlChanged(index: number) {
    setTimeout(() => {
      const task = this.todo.splice(index, 1);
      this.done.unshift(task[0]);
      this.dataService.set('done', this.done);
    }, 1000);
  }

  drop(event: CdkDragDrop<string[]>, type: string) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
        if (type === 'todo') {
          this.dataService.set('todo', this.todo);
        } else {
          this.dataService.set('done', this.done);
        }
    } else {
      if (type === 'todo') {
        moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
        this.dataService.set('todo', this.todo);
        console.log(this.todo);
      } else {
        moveItemInArray(this.done, event.previousIndex, event.currentIndex);
        this.dataService.set('done', this.done);
      }
    }
  }
}
