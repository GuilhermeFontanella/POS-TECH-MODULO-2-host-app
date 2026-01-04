import { Injectable, Injector, Type, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from "@angular-architects/module-federation";
import { rebuildMfeComponents } from "src/utils/functions/rebuildMfeComponents";
import { MFE_ENVIRONMENTS } from "src/utils/constants/mfeEnvironments";
import { PortLoader } from "../app/ports/portLoader.interface";

@Injectable()
export class ModuleFederationNavbarLoader implements PortLoader {
    private component?: Type<unknown>;

    constructor(private injector: Injector) {}
    
    async load(container: ViewContainerRef) {
        this.component = await loadRemoteModule({
            type: 'module',
            remoteEntry: MFE_ENVIRONMENTS.NavbarComponent,
            exposedModule: './NavbarComponent',
        }).then(m => m.NavbarComponent);

        rebuildMfeComponents(container, this.injector, this.component);
    }

    rebuild(container: ViewContainerRef) {
        if (!this.component) return;
        rebuildMfeComponents(container, this.injector, this.component);
    }
}