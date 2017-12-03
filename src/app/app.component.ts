import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from './map/map.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  displayedColumns = ['schoolid', 'schoolname', 'category', 'medium_of_inst', 'address', 'area', 'pincode', 'landmark'];
  dataSource: any;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, private matDialog: MatDialog) { }

  ngAfterViewInit() {
    this.getData()
  }

  getData() {
    let tableData;
    this.http.get<School>('/assets/data/data.json').subscribe(data => {
      // Read the result field from the JSON response.
      tableData = data;
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applySearch(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showSchool(school: School) {
    const locationData = this.alterTheString(school.latlong);
    const dialogData = {
      lat: Number(locationData[1]),
      lng: Number(locationData[0])
    }
    this.matDialog.open(MapComponent, { data: dialogData, disableClose: true });

  }

  alterTheString(location: string) {
    let target = location.replace('POINT(', '');
    target = target.replace(')', '');
    return target.split(' ');
  }
}

export interface School {
  district: string;
  block: string;
  cluster: string;
  schoolid: string;
  schoolname: string;
  category: string;
  gender: string;
  medium_of_inst: string;
  address: string;
  area: string;
  pincode: string;
  landmark: string;
  identification1: string;
  busroutes: string;
  identification2: string;
  latlong: string;
}
