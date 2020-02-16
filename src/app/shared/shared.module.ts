import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule,
        NgxChartsModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        NgxChartsModule
    ]
})

export class SharedModule {}