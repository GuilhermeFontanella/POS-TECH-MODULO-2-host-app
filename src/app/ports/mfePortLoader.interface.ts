import { ViewContainerRef } from "@angular/core";

export interface MfePortLoader {
    load(container: ViewContainerRef): Promise<void>;
    rebuild(container: ViewContainerRef): void;
}