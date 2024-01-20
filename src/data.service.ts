import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private heroPowerSubject = new Subject<string>();
  heroPower$ = this.heroPowerSubject.asObservable();

  private sideKickSubject = new Subject<string>();
  sideKick$ = this.sideKickSubject.asObservable();

  otherPowerSetupComponent = new Subject<void>();

  heroPowerchangeFn(value: string) {
    this.heroPowerSubject.next(value);
  }

  sidKickChangeFn(value: string) {
    this.sideKickSubject.next(value);
  }
}
