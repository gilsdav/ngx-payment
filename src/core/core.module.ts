import { NgModule, Provider, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentService } from './payment.service';

export interface PaymentCoreModuleConfig {
    paymentService: Type<PaymentService>;
}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class PaymentCoreModule {

    static forRoot(config: PaymentCoreModuleConfig): ModuleWithProviders {
        return {
            ngModule: PaymentCoreModule,
            providers: [
                { provide: PaymentService, useClass: config.paymentService }
            ]
        };
    }

}
