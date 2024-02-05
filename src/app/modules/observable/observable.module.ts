import { NgModule } from "@angular/core";
import { ObservableExmpleComponent } from "./observable-exm/observable-exm.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations:[ObservableExmpleComponent],
    imports:[CommonModule],
    exports:[ObservableExmpleComponent]
})
export class ObservableModule{}