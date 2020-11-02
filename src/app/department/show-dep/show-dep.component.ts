import { SharedService } from './../../shared.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {
  DepartmentList: any = [];

  ModalTitle: string;
  // tslint:disable-next-line: no-inferrable-types
  ActivateAddEditDepComp: boolean = false;

  @Input() dep: any;

  constructor(private service: SharedService) {
  }

  ngOnInit(): void {
    this.refreshDepList();
  }

  deleteClick(department: any): void {
    this.dep = department;
    if (confirm('Are you sure ??')) {
      this.service.DeleteDepartment(this.dep).subscribe(resp => {
        alert(`${resp.name} was deleted successfully!`);
        this.refreshDepList();
      });
    }
 }

  editClick(item: any): void {
    this.dep = item;
    this.ModalTitle = 'Edit Department';
    this.ActivateAddEditDepComp = true;
  }

  addClick(): void{
    this.dep = {
      id: '',
      name: ''
    };
    this.ModalTitle = 'Add Department';
    this.ActivateAddEditDepComp = true;
  }

  closeClick(): void{
    this.ActivateAddEditDepComp = false;
    this.refreshDepList();
  }
  refreshDepList(): void{
      this.service.GetDepList().subscribe(data => {
        this.DepartmentList = data;
    });
  }
}
