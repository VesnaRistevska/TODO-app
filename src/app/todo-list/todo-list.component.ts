import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';

interface Todo {
  item: string;
  id?: string;
  datemodified?: Date;
  isDone?: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todoList: Array<Todo> = [];

  constructor(
    private sharedService: SharedService
  ) {
    this.sharedService.addedItem.subscribe(res => {
      if (res) {
        const findItem = this.todoList.find(element => element.id === res.id);
        if (findItem) {
          findItem.item = res.item;
          let itemIndex = this.todoList.findIndex(item => item.id === res.id);
          this.todoList[itemIndex] = findItem;
        } else {
          this.todoList.push(res);
        }
        localStorage.setItem('list', btoa(escape(JSON.stringify(this.todoList))));
      }
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('list')) {
      this.todoList = JSON.parse(unescape(atob(localStorage.getItem('list') || '[]')));
    } else {
      this.todoList = [];
    }
  }

  markDone(item) {
    item.isDone = true;
  }

  markItemAsNotDone(item) {
    item.isDone = false;
  }

  editItem(item) {
    this.sharedService.shareEditItem(item);
  }

  deleteItem(item) {
    const findIndex = this.todoList.findIndex(element => element.id === item.id);
    if (findIndex !== -1) {
      this.todoList.splice(findIndex, 1);
    }
    localStorage.setItem('list', btoa(escape(JSON.stringify(this.todoList))));
  }

}
