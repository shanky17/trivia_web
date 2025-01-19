import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule, MatRadioChange } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

import { TriviaService } from '../../services/trivia.service';
import { Answer, Question } from '../../interfaces/trivia.interface';

@Component({
  selector: 'app-trivia',
  imports: [CommonModule, FormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './trivia.component.html',
  styleUrl: './trivia.component.css',
})
export class TriviaComponent implements OnInit, OnDestroy {
  triviaData: Question[] = [];
  question: Question | null = null;
  answer: Answer | null = null;
  disableRadioButtons = false;
  disableNextButton = true;
  questionNumber = 0;
  correctAnswers = 0;

  private subscriptions: Subscription = new Subscription();

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

    if (this.answer) {
      this.questionNumber++;
      if (this.answer.is_correct) {
        this.correctAnswers++;
      }
    }

    this.answer = null;
    this.disableRadioButtons = false;
    this.disableNextButton = true;
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

  answerSelected(event: MatRadioChange) {
    this.disableRadioButtons = true;
    this.disableNextButton = false;
  }

  getCorrectAnswer() {
    if (this.question) {
      return this.question.answers.filter((answer) => answer.is_correct)[0]
        .answer;
    }
    return '';
  }

  resetTrivia() {
    this.questionNumber = 0;
    this.correctAnswers = 0;

    this.getTrivia();
  }
}
