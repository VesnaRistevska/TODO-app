import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as uuid from 'uuid';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})

export class TodoAddComponent implements OnInit {

  addItemsForm: FormGroup;
  itemToEdit: any;

  constructor(
    private sharedService: SharedService
  ) {
    this.sharedService.editItem.subscribe(res => {
      if (res) {
        this.itemToEdit = res;
        this.addItemsForm = this.initAddItemsFormGroup();
      }
    })
    this.addItemsForm = this.initAddItemsFormGroup();
  }

  ngOnInit(): void {
  }

  private initAddItemsFormGroup() {
    return new FormGroup({
      item: new FormControl(this.itemToEdit ? this.itemToEdit.item : null)
    })
  }

  addItems(data) {
    if (data.item !== '') {
      data.id = uuid.v4();
      this.sharedService.shareAddedItem(data);
      this.addItemsForm.reset();
    }
  }

  saveItem(data) {
    this.itemToEdit.item = data.item;
    this.addItemsForm.reset();
    this.sharedService.shareAddedItem(this.itemToEdit);
    this.itemToEdit = null;
  }

}
