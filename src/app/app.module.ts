import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule} from '@angular/material';
import 'hammerjs';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  entryComponents: [MapComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC2QQeYf0sJgU95YhZUamJf4sBxnexO62E'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
