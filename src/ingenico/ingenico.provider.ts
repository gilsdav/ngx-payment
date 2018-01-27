import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { PaymentService } from "../core/payment.service";


/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
@Injectable()
export class IngenicoPaymentProvider extends PaymentService {
    pay(): Observable<any> {
        return of({});
    }
}
