import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AppSettings } from '../config/settings';
import { Check, Result } from '../model/game';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  firstRound = true;
  humanScore = 0;

  constructor(private http: HttpClient) {}

  getTasks(): Observable<string[]> {
    return this.http.get<{ values: string[] }>(`${AppSettings.API_ENDPOINT}/tasks`).pipe(
      tap((tasks) => console.log(tasks)),
      map((tasks) => tasks.values)
    );
  }

  checkTask(task: number, guess: number): Observable<Check> {
    return this.http.post<Check>(`${AppSettings.API_ENDPOINT}/check`, { task, guess }).pipe(
      tap((check: Check) => {
        this.humanScore += check.humanPoints;
      })
    );
  }

  getResult(): Observable<Result> {
    this.firstRound = false;
    return this.http
      .get<{ tasks: number[]; correct: number[]; botGuess: number[]; botPoints: number[]; humanPoints: number[] }>(
        `${AppSettings.API_ENDPOINT}/result`
      )
      .pipe(
        tap((result) => console.log(result)),
        map((result) => {
          let checks: Check[] = [];
          result.tasks.map((task, idx) => {
            checks.push({
              task,
              correct: result.correct[idx],
              botGuess: result.botGuess[idx],
              botPoints: result.botPoints[idx],
              humanPoints: result.humanPoints[idx],
            });
          });
          return {
            humanTotal: result.humanPoints.reduce((prev, cur) => prev + cur),
            botTotal: result.botPoints.reduce((prev, cur) => prev + cur),
            checks,
          };
        })
      );
  }
}
