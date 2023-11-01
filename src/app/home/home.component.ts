import { Component } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PdfDataService } from '../pdf-data.service';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'frontend';
  sharedData: any;

  constructor(public dialog: MatDialog, private http: HttpClient, private service: PdfDataService, private router: Router, private _snackBar: MatSnackBar) {
    this.service.getSharedData().subscribe((data) => {
      this.sharedData = data;
    });
  }

  pdfs: any[] = [];
  ngOnInit(): void {
    this.getpdf()
    
  }
  getpdf(){
    this.http.get('https://pdfuploadbackend.onrender.com/get-files').subscribe((data: any) => {
      this.pdfs = data.data;
      console.log(this.pdfs,"hey")
    });
  }

  deletePdf(pdfId: string) {
    if (confirm('Are you sure you want to delete this PDF?')) {
      this.http.delete(`https://pdfuploadbackend.onrender.com/pdf/${pdfId}`).subscribe((response: any) => {
        if (response.message === 'PDF deleted successfully') {
          // Reload the list of PDFs after deletion or update the list as needed
          this.getpdf()
        } else {
          // Handle errors or display a message
          console.error('Error deleting PDF');
        }
      });
    }
  }
  showPdf(pdf: any, id : any){
    this.service.setPdfName(pdf);
    this.router.navigate([`/pdf/${pdf}`])
  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  openSnackBar() {
    this._snackBar.open(this.sharedData, "close", {
      duration: 2 * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,
      {  
        height: '350px', 
        width: '100vw', 
        position: {right:'0px', top: '10px'} 
        });
        
  dialogRef.afterClosed().subscribe(() => {
    this.openSnackBar();
    this.getpdf();
          console.log( this.sharedData);
  });
}
}
