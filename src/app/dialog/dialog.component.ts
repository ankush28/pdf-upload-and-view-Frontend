import { Component } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { HttpClient } from  '@angular/common/http';
import { PdfDataService } from '../pdf-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(private http: HttpClient, private service: PdfDataService, public dialogRef: MatDialogRef<DialogComponent>) { }

  name: string = '';
  selectedFile: File | null = null; 
  data: {} = '';
  onSubmit(form: NgForm) {
    if(form.valid){
      const formData = new FormData();
      formData.append('title', this.name);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      this.http.post(`https://pdfuploadbackend.onrender.com/upload-files`, formData ).subscribe((response: any) => {
        if(response.status == "ok"){
          this.service.updateSharedData("uploaded successfully")
          this.dialogRef.close();
        }else{
          this.service.updateSharedData("Try Again")
        }
        console.log(response)
        });
    }
    
    // TODO: Implement file upload logic here
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }




}
