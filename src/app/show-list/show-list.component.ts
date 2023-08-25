import { Component, OnInit } from '@angular/core';
import { RestService } from '../sevices/rest.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  apiUrl = 'http://68.178.166.216/api/API/BillToPartyMaster/GetData';
  datas: any[] = []

  constructor(public _rest: RestService, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post(this.apiUrl, { RowId: 0 }).subscribe(
      (response: any) => {
        console.log(response.Table)
        this.datas = response.Table;
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  // this.get_all_info();
}
  // get_all_info(){
  //   this._rest.get_all_info().subscribe(data=>{
  //     this.datas=(data as any)['data']
  //   },err=>{
  //     console.log(err);
  //   })
  // }

