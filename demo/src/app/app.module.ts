import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaymentCoreModule } from 'ngx-payment/core';
import { StripeCheckoutPaymentProvider } from 'ngx-payment/stripe';
import { OgoneCheckoutPaymentProvider } from 'ngx-payment/ogone';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PaymentCoreModule.forRoot({
      paymentService: OgoneCheckoutPaymentProvider
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
