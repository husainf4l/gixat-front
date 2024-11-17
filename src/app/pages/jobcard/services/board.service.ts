import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { Board } from './board.model';
import { AuthService } from '../../../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class BoardService {
    private jobCardsUrl = `${environment.apiUrl}/job-cards`;

    constructor(private http: HttpClient, private auth:AuthService) { }

    getBoards(companyId: string): Observable<Board[]> {
        return this.http.get<Board[]>(`${this.jobCardsUrl}/boards/${companyId}`,
            { headers: this.auth.getHeaders() }
        );
    }


}