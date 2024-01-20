import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  NgModelGroup,
  Validators,
} from '@angular/forms';
import { DataService } from './data.service';

@Component({
  selector: 'other-power',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <fieldset ngModelGroup="otherDetail">
  <div class="form-group">
    <label for="sidekick-name">Other Power</label>
    <input
      class="form-control"
      id="sidekick-name"
      type="text"
      name="otherPower"
      [(ngModel)]="otherPower"
    />
  </div>  
</fieldset>

  `,
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
})
export class OtherComponent implements OnInit {
  dataService = inject(DataService);
  otherPower: string = '';

  constructor(private ngModelGroup: NgModelGroup) {}

  get parentNgFrom(): NgForm {
    return this.ngModelGroup.formDirective as NgForm;
  }

  get parentFormGroup(): FormGroup {
    return this.parentNgFrom.form as FormGroup;
  }

  get sidekickDetails(): FormGroup {
    return this.parentFormGroup.get('sidekickDetails') as FormGroup;
  }

  get otherDetail(): FormGroup {
    return this.sidekickDetails.get('otherDetail') as FormGroup;
  }

  get otherPowerControl(): FormControl {
    return this.otherDetail.get('otherPower') as FormControl;
  }

  ngOnInit() {
    this.dataService.otherPowerSetupComponent.next();
    this.powerChange();
    // console.log(this.ngModelGroup);
    // console.log(this.parentNgFrom);
    // console.log(this.parentFormGroup);
  }

  powerChange() {
    this.dataService.heroPower$.subscribe((value: string) => {
      //this.otherPower = value;

      this.otherPowerControl.clearValidators();

      if (value === 'Power2') {
        console.log('add');
        this.otherPowerControl.setValidators([Validators.required]);
      }
      this.otherPowerControl.updateValueAndValidity();
    });
  }
}
