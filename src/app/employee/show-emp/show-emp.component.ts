import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

EmployeeList: any = [];

  ModalTitle: string;
  // tslint:disable-next-line: no-inferrable-types
  ActivateAddEditEmpComp: boolean = false;
  dep: any;

  @Input() emp: any;

  constructor(private service: SharedService) {
  }

  ngOnInit(): void {
    this.refreshEmpList();
  }

  deleteClick(employee: any): void {
    this.emp = employee;
    if (confirm('Are you sure ??')) {
      this.service.DeleteEmployee(this.emp).subscribe(resp => {
        alert(`${resp.name} was deleted successfully!`);
        this.refreshEmpList();
      });
    }
 }

  editClick(employee: any): void {
    console.log('edit click show emp : ' + employee.photoFileName);

    this.emp = employee;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  addClick(): void{
    this.emp = {
      id: '',
      name: '',
      department: '',
      dateOfJoining: '',
      photoFileName: ''
    };

    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  closeClick(): void{
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList(): void{
      this.service.GetEmpList().subscribe(data => {
        this.EmployeeList = data;
    });
  }
}
