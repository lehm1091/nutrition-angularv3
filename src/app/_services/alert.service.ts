import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router) { }


  deleteDialog(): Promise<boolean> {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("llego a true")
        return true;
      }
      else {
        return false;
      }
    });


  }


  deleteSucess(): void {
    Swal.fire(
      'Deleted!',
      'Food has been deleted.',
      'success'
    );
  }


  errorDialog(error): void {
    Swal.fire({
      icon: 'error',
      title: `Error ${error.status}`,
      text: 'Something went wrong!',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Go Back'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/list-food/']);
      }
    });


  }
  saveSucess(): void {
    Swal.fire({
      title: 'OK',
      text: 'Product sucessfully saved!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Done!',
    });
  }

  updateSucess(): void {
    Swal.fire({
      title: 'OK',
      text: 'Product sucessfully updated!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Done!',
    });
  }


}
