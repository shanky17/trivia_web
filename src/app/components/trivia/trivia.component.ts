import { Component, OnDestroy, OnInit } from '@angular/core';
import { TriviaService } from '../../services/trivia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trivia',
  imports: [],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
})
export class TriviaComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {
    this.getTrivia();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getTrivia(): void {
    this.subscriptions.add(
      this.triviaService.getTrivia().subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      })
    );
  }
}
