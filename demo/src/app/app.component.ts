import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'ngx-payment/core';
import { StripeCheckoutConfig, StripeCheckoutData } from 'ngx-payment/stripe';

declare var StripeCheckout: any;

@Component({
    selector: 'app-root',
    template: `
  test

  <button id="customButton" (click)="buy()">Purchase</button>
  
  
  `,
    styles: []
})
export class AppComponent implements OnInit {

    constructor(private paymentService: PaymentService) {
    }

    ngOnInit() {
        this.paymentService.configure(<StripeCheckoutConfig>{
            key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
            locale: 'auto',
            logoUrl: 'https://stripe.com/img/documentation/checkout/marketplace.png'
        });
    }

    buy() {
        this.paymentService.start(<StripeCheckoutData>{
            allowRememberMe: false,
            amount: 2000,
            currency: 'EUR',
            description: 'Abonement 1 mois',
            name: 'Voco'
        }).subscribe((tokenId: string) => {
            console.log('ok', tokenId);
        }, error => {
            console.log(error);
        });
    }

}
