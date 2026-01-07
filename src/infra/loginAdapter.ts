import { Injectable, Injector, Type, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from "@angular-architects/module-federation";
import { rebuildMfeComponents } from "src/utils/functions/rebuildMfeComponents";
import { environment } from '../environments/environment';
import { MfePortLoader } from "../app/ports/mfePortLoader.interface";

@Injectable()
export class LoginLoaderAdapter implements MfePortLoader {
    private component?: Type<unknown>;

    constructor(private injector: Injector) {}
    
    async load(container: ViewContainerRef) {
        this.component = await loadRemoteModule({
            type: 'module',
            remoteEntry: environment.LOGIN_COMPONENT,
            exposedModule: './LoginComponent',
        }).then(m => m.LoginComponent);

        rebuildMfeComponents(container, this.injector, this.component);
    }

    rebuild(container: ViewContainerRef) {
        if (!this.component) return;
        rebuildMfeComponents(container, this.injector, this.component);
    }
}