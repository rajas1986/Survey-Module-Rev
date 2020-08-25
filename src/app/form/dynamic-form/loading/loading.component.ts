import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  constructor(public dialogRef: MatDialogRef<LoadingComponent>) {}
  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close(0);
  }
  onYesClick() {
    this.dialogRef.close(1);
  }
}
