import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule
    ]
})

export class SharedModule {}