import { NgModule } from "@angular/core";

import { ListModule } from "./list/list.module";
import { TransactionRoutingModule } from "./transaction-routing.module";

@NgModule({
  imports: [TransactionRoutingModule, ListModule]
})
export class TransactionModule {}
