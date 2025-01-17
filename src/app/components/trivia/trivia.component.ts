import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Subscription } from 'rxjs';

import { TriviaService } from '../../services/trivia.service';
import {
  Answer,
  Question,
  QuestionArray,
} from '../../interfaces/trivia.interface';

@Component({
  selector: 'app-trivia',
  imports: [CommonModule, FormsModule, MatRadioModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
})
export class TriviaComponent implements OnInit, OnDestroy {
  triviaData: QuestionArray = [];
  question: Question | null = null;
  answer: Answer | null = null;

  private subscriptions = new Subscription();

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {
    this.getTrivia();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  getNextQuestion() {
    if (this.triviaData.length) {
      const index = Math.floor(Math.random() * this.triviaData.length);
      this.question = this.triviaData[index];
      this.triviaData.splice(index, 1);
    } else {
      this.question = null;
    }
  }

  getTrivia(): void {
    this.subscriptions.add(
      this.triviaService.getTrivia().subscribe({
        next: (data) => {
          this.triviaData = data;
          this.getNextQuestion();
        },
        error: (err) => console.log(err),
      })
    );
  }

  getCorrectAnswer() {
    if (this.question) {
      return this.question.answers.filter((answer) => answer.is_correct)[0]
        .answer;
    }
    return '';
  }
}
