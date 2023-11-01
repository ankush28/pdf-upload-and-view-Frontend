import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfDataService {
  private pdfName: string = "";
  constructor() { }

  private sharedData = new BehaviorSubject<any>(null);

  getSharedData() {
    return this.sharedData.asObservable();
  }

  updateSharedData(data: any) {
    this.sharedData.next(data);
  }
  setPdfName(name: string): void {
    this.pdfName = name;
  }

  getPdfName(): string {
    return this.pdfName;
  }
}
