import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';

import { SystemComponent } from './System.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from './shared/services/bill.services';

@NgModule({
    imports: [
        CommonModule,
        SharedModule, 
        SystemRoutingModule
    ],
    declarations: [
        SystemComponent,
        BillPageComponent, 
        HistoryPageComponent, 
        PlanningPageComponent, 
        RecordsPageComponent, 
        SidebarComponent, 
        HeaderComponent,
        DropdownDirective,
        BillCardComponent,
        CurrencyCardComponent
    ],
    providers: [BillService]
})

export class SystemModule {}