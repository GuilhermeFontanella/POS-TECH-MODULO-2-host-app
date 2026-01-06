import { Injectable, Injector, Type, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from "@angular-architects/module-federation";
import { rebuildMfeComponents } from "src/utils/functions/rebuildMfeComponents";
import { MfePortLoader } from "../app/ports/mfePortLoader.interface";
import { environment } from "src/environments/environment";

@Injectable()
export class NavbarLoaderAdapter implements MfePortLoader {
    private component?: Type<unknown>;

    constructor(private injector: Injector) {}
    
    async load(container: ViewContainerRef) {
        this.component = await loadRemoteModule({
            type: 'module',
            remoteEntry: environment.NAVBAR_COMPONENT,
            exposedModule: './NavbarComponent',
        }).then(m => m.NavbarComponent);

        rebuildMfeComponents(container, this.injector, this.component);
    }

    rebuild(container: ViewContainerRef) {
        if (!this.component) return;
        rebuildMfeComponents(container, this.injector, this.component);
    }
}