import { Component } from '@angular/core';
import { KeycloakService } from 'src/app/service/keycloak/keycloak.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  /*constructor(private authService:AuthService,private router:Router,private service:AdminProfileService){
    localStorage.clear();
  }

  role: String = ""
  emailChecked: boolean = false
  request!: Requestt
  otpCode: string = ''
  isTfaEnabled: boolean = false



  //constructor(private authService: AuthService, private router: Router, private requestService: RequestService) { }
  
  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  user:User={
    id: 0,
    email: '',
    password: '',
    blocked: false,
    role: Role.ADMINISTRATOR,
    emailChecked: false,
    city: '',
    country: '',
    phone: '',
    
    firstName: '',
    lastName: ''
  }

  admin:Administrator={
    isPredefined: false,
    firstName: '',
    lastName: '',
    firstLogging: false,
    id: 0,
    email: '',
    password: '',
    blocked: false,
    role: Role.ADMINISTRATOR,
    emailChecked: false,
    city: '',
    country: '',
    phone: ''
  }

  employee:Employee={
    firstName: '',
    lastName: '',
    firstLogging: false,
    id: 0,
    email: '',
    password: '',
    blocked: false,
    role: Role.EMPLOYEE,
    emailChecked: false,
    city: '',
    country: '',
    phone: '',
    
    //company: undefined
  }

  

  LogIn() {
    const user: any = {
      email: this.userForm.value.email || '',

      password: this.userForm.value.password || '',
    };
    console.log("afdsaf")
    


    this.authService.login(user).subscribe({
      next: (userTokenState: UserTokenState) => {
        console.log('successfull', userTokenState)

        if (userTokenState.tfaEnabled && !userTokenState.accessToken) {
          console.log("Uslo!!!!!!")
          this.isTfaEnabled = true;
          return
        }

        const id = this.authService.getUserId();
        this.role = this.authService.getUserRole();
        
        if (this.role == "CLIENT") {
          console.log('clieent')
            if(this.isEmailChecked(id)){

              this.router.navigate(['home']);
            }else{
              //alert("You cannot login")
            }

        } else {
          console.log('nije klijent')
          this.router.navigate(['home']);
        }

        if(this.authService.getUserRole()[0] == 'ADMINISTRATOR' ){
            this.loadAdminData()
        }
        else if(this.authService.getUserRole()[0] == 'EMPLOYEE'){
              this.loadEmployeeData();
        }

        this.router.navigate(['home'])
      },
      error: (err) => {
        console.log('greska', err)
      }
    });
  }


  isEmailChecked(id: number): Boolean {

    this.authService.isEmailChecked(id).subscribe({
      next: (res) => {
        this.emailChecked = res as boolean
      }
    })

    if (this.emailChecked) {
      return true
    } else {
      return false
    }
  }

  
  loadAdminData(): void {
    this.service.getAdminById(this.authService.getUserId()).subscribe({
      next: (data: Administrator) => {
        this.admin = data;
        console.log("Vraceni admin: ",this.admin);
        if(this.admin.firstLogging){
          this.router.navigate(['/changePassword']);
        }
      },
      error: (err) => {
        console.error('Error loading admin data', err);
      }
    });
  }


  
  
  loadEmployeeData(): void {
    this.service.getEmployeeById(this.authService.getUserId()).subscribe({
      next: (data: Employee) => {
        this.employee = data;
        console.log("Vraceni employee: ",this.employee);
        if(this.employee.firstLogging){
          this.router.navigate(['/changePassword']);
        }
      },
      error: (err) => {
        console.error('Error loading admin data', err);
      }
    });
  }

  verifyTfa() {
    const verifyRequest: TfaCodeVerificationRequest = {
      email: this.userForm.value.email as string,
      code: this.otpCode
    };
    this.authService.verifyTfaCode(verifyRequest)
      .subscribe({
        next: (response) => {

          localStorage.setItem('token', response.accessToken as string);
          localStorage.setItem('refreshToken', response.refreshToken as string);

          this.authService.setUserClaims();
          this.authService.setAccessToken(response.accessToken as string);
          this.authService.setLoginSource(true);
          this.router.navigate(['home']);
        }
      });
  }*/

    constructor(
        private ss: KeycloakService
      ) {
      }
    
    async ngOnInit(): Promise<void> {
        await this.ss.init();
        await this.ss.login();
      }
}
