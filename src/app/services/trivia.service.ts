import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../interfaces/trivia.interface';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  constructor(private http: HttpClient) {}

  getTrivia(): Observable<Question[]> {
    return this.http.get(
      'https://shanky17.pythonanywhere.com/api/v1/questions/'
    ) as Observable<Question[]>;
  }
}
