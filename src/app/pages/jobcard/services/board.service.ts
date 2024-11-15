import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Board } from './board.model';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    private jobCardsUrl = `${environment.apiUrl}/job-cards`;

    constructor(private http: HttpClient) { }

    getBoards(companyId: string): Observable<Board[]> {
        return this.http.get<Board[]>(`${this.jobCardsUrl}/boards/${companyId}`);
    }

}