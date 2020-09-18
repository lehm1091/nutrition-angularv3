import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addId(id): void {
    let ids: string[] = this.getList();
    ids.push(id);
    this.clearList();
    localStorage.setItem('listOfIds', JSON.stringify(ids));
    const retrievedData = localStorage.getItem('listOfIds');
    console.log(retrievedData);

  }



  removeId(id): void {
    let ids: string[] = this.getList();
    const index = ids.indexOf(id, 0);
    if (index > -1) {
      ids.splice(index, 1);
    }
    this.clearList();
    localStorage.setItem('listOfIds', JSON.stringify(ids));

  }


  private initList(): void {
    const retrievedData = localStorage.getItem('listOfIds');
    if (retrievedData === null) {

      localStorage.setItem('listOfIds', '');
      console.log("se creo el item en local storage");
    }



  }


  getList(): string[] {
    this.initList();
    let ids: string[];
    const retrievedData = localStorage.getItem('listOfIds');
    if (retrievedData) {
      ids = JSON.parse(retrievedData);
    } else {

      ids = [];
    }





    return ids;

  }
  clearList(): void {
    localStorage.removeItem('listOfIds');

  }
  limitReached(): boolean {
    if (this.getList().length < 4) {
      return true;
    }
    else {
      return false;

    }


  }



}