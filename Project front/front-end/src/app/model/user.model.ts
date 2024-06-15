export enum Role {
  ADMINISTRATOR = "ADMINISTRATOR",
  CLIENT = "CLIENT",
  EMPLOYEE = "EMPLOYEE"
}

export interface User{
    id:number,
    email:string,
    password:string;
    role:Role;
    emailChecked:boolean;
    blocked:boolean;

    firstName:string; //dodato da bi se kompajliralo
    lastName:string;
    city:string,
    country:string,
    phone:string
}