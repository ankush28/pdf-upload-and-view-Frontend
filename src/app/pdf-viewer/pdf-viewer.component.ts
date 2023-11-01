import { Component } from '@angular/core';
import { PdfDataService } from '../pdf-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  
  pdfUrl: string='';
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const pdfName = params['id']; // Retrieve the PDF name from the route parameters
      console.log(params['id'])
      this.pdfUrl = "https://pdfuploadbackend.onrender.com/files/"+pdfName;
    });
  }
  back(){
    this.router.navigate(['/'])
  }
}
