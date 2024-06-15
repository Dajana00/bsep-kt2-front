import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/service/client-service.service';

@Component({
  selector: 'app-client-register-form',
  templateUrl: './client-register-form.component.html',
  styleUrls: ['./client-register-form.component.css']
})
export class ClientRegisterFormComponent {
  isLegalEntity: boolean = false;
  userForm: FormGroup;
  packageType: string | undefined;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router) {
    this.userForm = this.formBuilder.group({
      userType: [false, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      packageType: ['BASIC', Validators.required],
      isTfaEnabled: [false] // New form control for two-factor authentication
    }, {
      validator: [ this.passwordMatchValidator, this.passwordStrengthValidator]
    });

    // Subscription to form changes
    this.userForm.get('packageType')?.valueChanges.subscribe((value) => {
      console.log('Selected package:', value);
      this.packageType = value;
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password && confirmPassword) {
      const match = password.value === confirmPassword.value;
      if (!match) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    }
    return null;
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(value)) {
        return { 'passwordStrength': true };
      }
      return null;
    };
  }

  register(): void {
    const client: any = {
      username: this.userForm.value.email || '',
      email: this.userForm.value.email || '',
      password: this.userForm.value.password || '',
      role: 'CLIENT',
      clientFirmName: this.userForm.value.name || '',
      clientSurnameFirmPIB: this.userForm.value.surname || '',
      clientFirmResidentialAddress: this.userForm.value.address || '',
      city: this.userForm.value.city || '',
      country: this.userForm.value.country || '',
      phone: this.userForm.value.phone || '',
      type: this.userForm.get('userType')?.value ? 'LEGALLY' : 'PHYSICALLY',
      packageType: this.packageType,
      tfaEnabled: this.userForm.value.isTfaEnabled // Include two-factor authentication
    };

    console.log('Registration data:', client);

    this.clientService.registerClient(client).subscribe({
      next: (res) => {
        console.log('Registration successful', res);
        this.sendRequest(client.username);
      },
      error: (err) => {
        console.log('Registration error', err);
      }
    });
  }

  sendRequest(username: string): void {
    this.clientService.sendRequest(username).subscribe({
      next: (res) => {
        console.log('Request successful', res);
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log('Request error', err);
      }
    });
  }
}
