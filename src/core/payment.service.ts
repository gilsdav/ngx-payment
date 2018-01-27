import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

export abstract class PaymentService {
    abstract configure(config: any): void;
    abstract start(data: any): Observable<any>;
    abstract cancel(): void;
}

/**
 * This loader is just a placeholder that does nothing, in case you don't need a loader at all
 */
// @Injectable()
// export class PaymentServiceFakeProvider extends PaymentServiceProvider {
    
//     constructor() {
//         super();
//         throw new Error('You need to specify a PaymentService. Please call PaymentCoreModule.forRoot(...) to set it.');
//     }

//     pay(): Observable<any> {
//         return of({});
//     }
// }
