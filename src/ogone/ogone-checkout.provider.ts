import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { PaymentService } from '../core/payment.service';

export interface OgoneCheckoutConfig {
    commerce: string;
    key: string;
    logoUrl: string;
    locale: string;
    url: string;
}

export interface OgoneCheckoutData {
    name: string;
    description: string;
    amount: number,
    currency?: string
}

@Injectable()
export class OgoneCheckoutPaymentProvider extends PaymentService {

    private pspid: string;
    private key: string;
    private logo: string;
    private language: string;
    private url: string;

    public configure(config: OgoneCheckoutConfig): void {
        this.pspid = config.commerce;
        this.key = config.key;
        this.logo = config.logoUrl;
        this.language = config.locale;
        this.url = config.url;
    }

    public start(data: OgoneCheckoutData): Observable<any> {

        if (typeof document === 'undefined') {
            throw new Error('document missing. Are you sure you run this method on browser ?');
        }

        const form = document.createElement('form');
        // form.style.display = 'none';
        form.method = 'POST';
        form.action = this.url;

        // init fields
        const pspid = document.createElement('input');
        pspid.type = 'hidden';
        pspid.name = 'PSPID';
        const hash = document.createElement('input');
        hash.type = 'hidden';
        hash.name = 'SHASIGN';
        const amount = document.createElement('input');
        amount.type = 'hidden';
        amount.name = 'AMOUNT';
        const currency = document.createElement('input');
        currency.type = 'hidden';
        currency.name = 'CURRENCY';
        const language = document.createElement('input');
        language.type = 'hidden';
        language.name = 'LANGUAGE';

        const title = document.createElement('input');
        title.type = 'hidden';
        title.name = 'TITLE';
        const logo = document.createElement('input');
        logo.type = 'hidden';
        logo.name = 'LOGO';

        // const acceptUrl = document.createElement('input');
        // acceptUrl.type = 'hidden';
        // acceptUrl.name = 'ACCEPTURL';
        // const declineUrl = document.createElement('input');
        // declineUrl.type = 'hidden';
        // declineUrl.name = 'DECLINEURL';
        // const exceptionUrl = document.createElement('input');
        // exceptionUrl.type = 'hidden';
        // exceptionUrl.name = 'EXCEPTIONURL';
        // const cancelUrl = document.createElement('input');
        // cancelUrl.type = 'hidden';
        // cancelUrl.name = 'CANCELURL';


        // Fill fields
        pspid.value = this.pspid;
        hash.value = this.key;
        logo.value = this.logo;
        language.value = this.language;
        amount.value = data.amount.toString();
        currency.value = data.currency;
        title.value = `${data.name} - ${data.description}`;
        // acceptUrl.value = 'http://localhost:4200';
        // declineUrl.value = 'http://localhost:4200';
        // exceptionUrl.value = 'http://localhost:4200';
        // cancelUrl.value = 'http://localhost:4200';

        // Add fields
        form.appendChild(pspid);
        form.appendChild(hash);
        form.appendChild(logo);
        form.appendChild(language);
        form.appendChild(amount);
        form.appendChild(currency);
        form.appendChild(title);
        // form.appendChild(acceptUrl);
        // form.appendChild(declineUrl);
        // form.appendChild(exceptionUrl);
        // form.appendChild(cancelUrl);

        document.body.appendChild(form);
        form.submit();

        return of(true);

    }
    public cancel(): void {
        throw new Error('Method not implemented.');
    }
}
