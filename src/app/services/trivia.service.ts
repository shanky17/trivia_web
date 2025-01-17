import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionArray } from '../interfaces/trivia.interface';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  constructor(private http: HttpClient) {}

  getTrivia(): Observable<QuestionArray> {
    return this.http.get(
      'https://shanky17.pythonanywhere.com/api/v1/questions/'
    ) as Observable<QuestionArray>;
  }
}
