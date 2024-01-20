import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Host,
  inject,
  Input,
  OnInit,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NgForm,
  NgModelGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeamNameValidatorDirective } from './custom-validation';
import { DataService } from './data.service';
import { OtherComponent } from './other.component';

@Component({
  selector: 'side-kick',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OtherComponent,
    TeamNameValidatorDirective,
  ],
  templateUrl: './kick.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class SideKickComponent implements OnInit, AfterViewInit {
  sidekickName: string = '';
  sidekickAge: string = '';
  customValidation: string = '';
  @ViewChild(NgModelGroup) ngModelGroup!: NgModelGroup;
  dataService = inject(DataService);

  constructor(private parentForm: NgForm) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  kickNameChange() {
    this.dataService.sidKickChangeFn(this.sidekickName);
    console.log('Change');
    console.log(this.parentFormField);
  }

  get parentFormField() {
    return this.parentForm.form as FormGroup;
  }
}
