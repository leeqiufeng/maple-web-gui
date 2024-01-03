import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-monster-drop-modify',
  templateUrl: './monster-drop-modify.component.html',
  styleUrls: ['./monster-drop-modify.component.scss']
})
export class MonsterDropModifyComponent implements OnInit {

  public formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    this.formGroup = this.fb.group({});
  }
}
