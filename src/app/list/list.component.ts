import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { files } from '../files';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    currpage = 1;
    files = [];

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.refreshList(this.currpage);
    }

    refreshList(pageno) {
        let elem: HTMLElement = document.getElementById('pages') as HTMLElement
        let chi = elem.childNodes[pageno - 1] as HTMLElement;
        elem.childNodes.forEach(child => {
            let cvChild = child as HTMLElement;
            cvChild.classList.remove('selected');
        });
        chi.classList.add('selected');

        this.http.get<any>('http://192.168.0.189:4200/download/page/'+pageno).subscribe(data => {
            if (data.res !== undefined && pageno == 1)
                this.files = [];
            else if (data.res !== undefined) {
                this.refreshList(this.currpage);
            } else {
                this.files = data;
                this.currpage = pageno;
            }
        });
    }

    download(idfile) {
        window.location.href='http://192.168.0.189:4200/download/'+idfile;
    }

    delete(idfile) {
        var ans = window.confirm('Do you realy want to delete this file ?', );
        if (ans) {
            this.http.get<any>('http://192.168.0.189:4200/delete/'+idfile).subscribe(data => {
                this.refreshList(this.currpage);
            });
        }
    }

    out() {
        let elem: HTMLElement = document.getElementById('qrcode') as HTMLElement
        elem.classList.add('hidden');
        elem.innerHTML = '';
    }

    over(id, desc) {
        let elem: HTMLElement = document.getElementById('qrcode') as HTMLElement
        this.http.get<any>('http://192.168.0.189:4200/download/qr/'+id).subscribe(data => {
            elem.innerHTML = '<p>'+desc+'</p><img src="' + data.res + '" />';
        });
        elem.classList.remove('hidden');
    }
}