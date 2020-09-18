import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nutrition-app-v2';
  comparsionIds: string[] = ["1","2"];
  constructor(private storageService: LocalStorageService) { }

  ngOnInit(): void {
    this.comparsionIds = this.storageService.getList();
  }



}
