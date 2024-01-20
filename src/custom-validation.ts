import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, FormControl } from '@angular/forms';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

export function teamNameValidator(teamNamePrefix: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const v = control.value;
    return v !== null && v !== '' && !v.startsWith(teamNamePrefix)
      ? { teamNamePrefix: true }
      : null;
  };
}

@Directive({
  selector: '[teamNamePrefix]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: TeamNameValidatorDirective,
      multi: true,
    },
  ],
})
export class TeamNameValidatorDirective implements Validator {
  @Input()
  teamNamePrefix!: string;

  validate(control: FormControl): ValidationErrors | null {
    return teamNameValidator(this.teamNamePrefix)(control);
  }
}
