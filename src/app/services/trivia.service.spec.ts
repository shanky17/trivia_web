import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { TriviaService } from './trivia.service';

describe('TriviaService', () => {
  let service: TriviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(TriviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
