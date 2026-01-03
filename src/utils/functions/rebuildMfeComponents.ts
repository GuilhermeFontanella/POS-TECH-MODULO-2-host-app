import { Injector, ViewContainerRef } from "@angular/core";

export function rebuildMfeComponents(ref: ViewContainerRef, injector: Injector, component: any) {
    ref?.clear();
    ref?.createComponent(component, {
      injector: injector,
    });
}