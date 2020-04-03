import { Component } from '@angular/core';

import { files } from '../files';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    files = files;

    refreshList() {
        window.alert('Refresh!');
    }

    download(idfile) {
        window.alert('Download ' + idfile);
    }

    delete(idfile) {        
        // window.alert('Delete ' + idfile);
    }
}