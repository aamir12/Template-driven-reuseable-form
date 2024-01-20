import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  importProvidersFrom,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { DataService } from './data.service';
import { SideKickComponent } from './kick.component';
import { Hero } from './model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SideKickComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './main.html',
})
export class App implements OnInit, AfterViewInit {
  @ViewChild('heroForm') heroForm!: NgForm;
  dataService = inject(DataService);
  powers = ['Power1', 'Power2', 'Power3', 'Power4'];

  model = new Hero(1, 'Test Hero', this.powers[0], 'Power1');

  ngOnInit() {
    this.sideKickChange();
  }

  sideKickChange() {
    this.dataService.sideKick$.subscribe((value) => {
      this.model.alterEgo = value;
    });
  }

  ngAfterViewInit() {
    const form = this.heroForm.form;
    form.valueChanges.subscribe((formVal) => {});
  }

  onValueChange() {
    this.dataService.heroPowerchangeFn(this.model.power);
    (<FormControl>this.otherDetail.get('otherPower')).setValue('Test');
  }

  onSubmit() {
    console.log(this.heroForm.valid);
  }

  get parentForm() {
    return this.heroForm.form as FormGroup;
  }

  get sidekickDetails() {
    return this.parentForm.get('sidekickDetails') as FormGroup;
  }

  get otherDetail() {
    return this.sidekickDetails.get('otherDetail') as FormGroup;
  }
}

//for reactive form
//https://github.com/aamir12/reuseable-form-group-in-angular-16

bootstrapApplication(App);
