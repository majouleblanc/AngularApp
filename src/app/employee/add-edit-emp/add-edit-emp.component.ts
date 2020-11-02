import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { catchError, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {


  constructor(private servcie: SharedService) { }

  @Input() emp: any;
  // tslint:disable-next-line: no-inferrable-types
  id: string = '';
  // tslint:disable-next-line: no-inferrable-types
  name: string = '';
  department: string;
  dateOfJoining: Date;
  photoFileName: string;
  photoFilePath: string;

  DepartmentList: any[];

  ngOnInit(): void {
    this.loadDepartmentList();
    console.log('on init : ' + this.emp.photoFileName);

    // this.id = this.emp.id;
    // this.name = this.emp.name;
  }

  loadDepartmentList(): any {
    this.servcie.GetDepList()
      // .pipe(
      //   tap(resp => console.log(resp)))
        .subscribe(resp => {
          this.DepartmentList = resp.map(dep => dep.name);
          this.id = this.emp.id;
          this.name = this.emp.name;
          this.department = this.emp.department;
          this.dateOfJoining = this.emp.dateOfJoining;
          this.photoFileName = this.emp.photoFileName;
          this.photoFilePath = this.emp.photoFileName;
      }
    );
  }

addEmployee(): void {
    // tslint:disable-next-line: prefer-const
    let val = {
      id: this.id,
      name: this.name,
      department: this.department,
      dateOfJoining: this.dateOfJoining,
      photoFileName: this.photoFileName
    };

    // tslint:disable-next-line: prefer-const
    let formData: FormData = new FormData();
    // formData.append('Id', val.id);
    formData.append('Name', val.name);
    formData.append('DepartmentName', val.department);
    formData.append('DateOfJoinging', val.dateOfJoining.toString());
    // formData.append('PhotoFileName', val.photoFileName);

    this.servcie.AddEmployee(formData).subscribe(resp => {
      alert(`${resp.name} added successfully!`);
    });
  }

updateEmployee(): void {
    console.log('update emp :' + this.emp.PhotoFileName);
    this.emp.id = this.id;
    this.emp.name = this.name;
    this.emp.department = this.department;
    this.emp.dateOfJoining = this.dateOfJoining;
    this.emp.photoFileName = this.photoFileName;
    // const val = { id: this.id, name: this.name };
    this.servcie.UpdateEmployee(this.emp).subscribe(resp => {
    alert(`${resp.name} updated successfully!`);
    });
  }

uploadPhoto(event): void {
    const file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('photo', file, file.name);

    this.servcie.UploadPhoto(formData).subscribe((data: any) => {
      this.photoFileName = data.toString();
      this.photoFilePath = this.emp.photoFileName;
    });
  }
}
