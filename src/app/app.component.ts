import { Component } from '@angular/core';

import { SharedService } from './shared.service';

import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularApp';
}
