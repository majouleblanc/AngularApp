import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-dep',
  templateUrl: './add-edit-dep.component.html',
  styleUrls: ['./add-edit-dep.component.css']
})
export class AddEditDepComponent implements OnInit {

  constructor(private servcie: SharedService) { }

  @Input() dep: any;
  // tslint:disable-next-line: no-inferrable-types
  id: string = '';
  // tslint:disable-next-line: no-inferrable-types
  name: string = '';

  ngOnInit(): void {
    this.id = this.dep.id;
    this.name = this.dep.name;
  }

  addDepartment(): void {
    // tslint:disable-next-line: prefer-const
    let val = {
      id: this.id,
      name: this.name
    };

    // tslint:disable-next-line: prefer-const
    let formData: FormData = new FormData();
    // formData.append('Id', val.id);
    formData.append('Name', val.name);

    this.servcie.AddDepartment(formData).subscribe(resp => {
      alert(`${resp.name} added successfully!`);
    });
  }

  updateDepartment(): void {
    // console.log(this.dep);
    this.dep.name = this.name;
    // const val = { id: this.id, name: this.name };
    this.servcie.UpdateDepartment(this.dep).subscribe(resp => {
    alert(`${resp.name} updated successfully!`);
    });
  }
}
