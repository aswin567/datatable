import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat:number;
  lng:number;
	constructor(public dialogRef: MatDialogRef<MapComponent>,
		@Inject(MAT_DIALOG_DATA) data: any) {
      this.lat=data.lat;
      this.lng=data.lng;
		};
	

  ngOnInit() {}

}
