import { ViewContainerRef } from "@angular/core";

export interface PortLoader {
    load(container: ViewContainerRef): Promise<void>;
    rebuild(container: ViewContainerRef): void;
}