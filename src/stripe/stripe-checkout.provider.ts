import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { PaymentService } from '../core/payment.service';

declare var StripeCheckout: any;

export interface StripeCheckoutConfig {
    key: string;
    logoUrl: string;
    locale: string;
}

export interface StripeCheckoutData {
    name: string;
    description: string;
    amount: number,
    zipCode?: boolean,
    currency?: string,
    panelLabel?: string
    allowRememberMe?: boolean
}

@Injectable()
export class StripeCheckoutPaymentProvider extends PaymentService {

    private instance: any;
    private token: any;
    private observer: Observer<string>;

    private checkLib(): boolean {
        let result = true;
        if (typeof StripeCheckout === 'undefined') {
            result = false;
            throw Error('Strip checkout unavailable. Did you add `<script src="https://checkout.stripe.com/checkout.js"></script>` in your HTML head ?');
        }
        return result;
    }

    private checkConfig(): boolean {
        let result = true;
        if (typeof this.instance === 'undefined') {
            result = false;
            throw Error('No config found. Did you call PaymentService.configure(...) ?');
        }
        return result;
    }

    public configure(config: StripeCheckoutConfig): void {
        this.checkLib();
        this.instance = StripeCheckout.configure({
            key: config.key,
            image: config.logoUrl,
            locale: config.locale,
            token: (token: any) => this.tokenResponse(token),
            closed: () => this.closed()
        });
    }

    private tokenResponse(token: any): void {
        this.token = token;
    }

    private closed(): void {
        if (this.token) {
            this.observer.next(this.token.id);
        } else {
            this.observer.error('No token found');
        }
        this.observer.complete();
    }

    public start(data: StripeCheckoutData): Observable<any> {
        this.checkConfig();
        this.token = null;
        return Observable.create((observer: Observer<string>) => {
            this.observer = observer;
            this.instance.open(data);
        });
    }

    public cancel(): void {
        this.checkConfig();
        if (this.observer) {
            this.closed();
        }
    }

}
