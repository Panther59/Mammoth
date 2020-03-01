import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FilesService {
    constructor(private httpClient: HttpClient) {

    }

    get3wordsList(): Observable<Array<string>> {
        return this.getFileData('/assets/words/3letterWords.json');
    }

    private getFileData(path: string): Observable<any> {
        return this.httpClient.get(path);
    }
}
