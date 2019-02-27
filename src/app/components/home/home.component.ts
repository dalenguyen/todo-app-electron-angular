import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { MatListOption } from '@angular/material/list';

export interface Todo {
  title: string;
  date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  value = '';

  public todo: Todo[] = [
    { title: 'Watch Bohemian Rhapsody', date: new Date().toString() },
    { title: 'Read Medium Article', date: new Date().toString()},
    { title: 'Swimming', date: new Date().toString() }
  ];

  public done: Todo[] = [
    { title: 'Write a blog', date: new Date().toString() },
    { title: 'Study Angular', date: new Date().toString() },
    { title: 'Check e-mail', date: new Date().toString() },
    { title: 'Walk dog', date: new Date().toString() }
  ];

  arr = [];

  onSubmit() {
    this.todo.push({ title: this.value, date: new Date().toString() });
    this.value = '';
  }

  clearInput(event: MouseEvent) {
    if ((<HTMLElement>event.target).nodeName === 'MAT-ICON') {
      this.value = '';
    }
  }

  onAreaListControlChanged(index: number) {
    setTimeout(() => {
      const task = this.todo.splice(index, 1);
      this.done.unshift(task[0]);
    }, 1000);
  }

  drop(event: CdkDragDrop<string[]>, type: string) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data,
        event.previousIndex, event.currentIndex);
    } else {
      if (type === 'todo') {
        moveItemInArray(this.todo, event.previousIndex, event.currentIndex);
      } else {
        moveItemInArray(this.done, event.previousIndex, event.currentIndex);
      }
    }
  }
}
