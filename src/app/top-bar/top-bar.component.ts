import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ListComponent } from '../list/list.component';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    constructor(private http: HttpClient) { }

    ngOnInit() {

    }

    sendFile(filetosend: FileList) {
        const formData: FormData = new FormData();
        formData.append('file', filetosend.item(0), filetosend.item(0).name);

        this.http.post('http://192.168.0.189:4200/upload', formData).subscribe(data => {
            console.log(data);
        });
    }

    uploadNew() {
        let elem: HTMLElement = document.getElementById('file-input') as HTMLElement
        elem.click();
    }
}