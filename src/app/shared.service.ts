import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly ApiUrl: string = 'https://localhost:44350/api';
  readonly PhotoUrl: string = 'https://localhost:44350/api';
  // readonly headers: string = 'multipart/form-data';
  readonly headers: HttpHeaders;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders();
    this.headers.set('content-type', 'multipart/form-data')
    .set('Access-Control-Allow-Origin', '*');
  }

  GetDepList(): Observable<any[]>{
    return this.http.get<any[]>(this.ApiUrl + '/Department');
  }

  AddDepartment(val: any): Observable<any> {
    // debugger;
    return this.http.post<any>(this.ApiUrl + '/Department', val, {
      headers: this.headers
    });
  }

  UpdateDepartment(dep: any): Observable<any>{

    // tslint:disable-next-line: prefer-const
    let formdata: FormData = new FormData();
    formdata.append('Id', dep.id);
    formdata.append('Name', dep.name);
    return this.http.put<any>(this.ApiUrl + '/department/' + dep.id, formdata, {headers: this.headers});
  }

  DeleteDepartment(department: any): Observable<any>{
    return this.http.delete<any>(this.ApiUrl + '/department/' + department.id, {headers: this.headers});
  }


// employee
  GetEmpList(): Observable<any[]>{
    return this.http.get<any[]>(this.ApiUrl + '/employee');
  }

  AddEmployee(val: any): Observable<any>{
    return this.http.post<any>(this.ApiUrl + '/employee/', val, {headers: this.headers});
  }

  UpdateEmployee(emp: any): Observable<any>{
        // tslint:disable-next-line: prefer-const
        let formdata: FormData = new FormData();
        formdata.append('Id', emp.id);
        formdata.append('Name', emp.name);
        return this.http.put(this.ApiUrl + '/employee/' + emp.id, formdata, {headers: this.headers});
  }

  DeleteEmployee(emp: any): Observable<any>{
    return this.http.delete<any>(this.ApiUrl + '/employee/' + emp.id, {headers: this.headers});
  }

  UploadPhoto(data: any): Observable<any>{
    return this.http.post(this.ApiUrl + '/employee/' +  data.id, data.formData, { headers: this.headers });
  }

}
