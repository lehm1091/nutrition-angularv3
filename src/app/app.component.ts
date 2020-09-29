import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { faHome, faPlusSquare, faChartBar, faCalculator } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'nutrition-app-v2';
  comparsionIds: string[] = ["1", "2"];
  faHome = faHome;
  faPlusSquare = faPlusSquare;
  faCharBar = faChartBar;
  faCalculator = faCalculator;

  constructor(private storageService: LocalStorageService) { }

  ngOnInit(): void {
    this.comparsionIds = this.storageService.getList();
  }



}
