import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  email!: string;
  id!: number;
  expiry!: number;
  token!: string;
  constructor(private route: ActivatedRoute) {
    this.email = this.route.snapshot.params['email'];
    this.id = +this.route.snapshot.params['id'];
    this.expiry = +this.route.snapshot.params['expiry'];
    this.token = this.route.snapshot.params['token'];
    const date = new Date(this.expiry * 1000); // Pomnožiti sa 1000 jer je timestamp u sekundama, a Date očekuje milisekunde

    // Formatiranje datuma u string
    const expiryDate = new Date(this.expiry * 1000);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  console.log( expiryDate.toLocaleString()); // Ovde možete koristiti različite opcije formatiranja, zavisno od vaših potreba


  }
  ngOnInit(): void {

    this.email = this.route.snapshot.params['email'];
    this.id = this.route.snapshot.params['id'];
    this.expiry = this.route.snapshot.params['expiry'];
    this.token = this.route.snapshot.params['token'];
  }
}
