import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { School } from './app';
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
    this.getData();
  }

  // fecth data from api
  getData(): void {
    let tableData;
    this.http.get<School>('/assets/data/data.json').subscribe(data => {
      tableData = data;
      this.dataSource = new MatTableDataSource(tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // apply Search
  applySearch(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  // show school map
  showSchool(school: School): void {
    const locationData = this.alterTheString(school.latlong);
    const dialogData = {
      lat: Number(locationData[1]),
      lng: Number(locationData[0])
    }
    this.matDialog.open(MapComponent, { data: dialogData, disableClose: true });
  }

  // get the lat and lng
  alterTheString(location: string): Array<string> {
    let target = location.replace('POINT(', '');
    target = target.replace(')', '');
    return target.split(' ');
  }
}

