import { createEnvironmentInjector, EnvironmentInjector, Injectable, Type, ViewContainerRef } from "@angular/core";
import { loadRemoteModule } from "@angular-architects/module-federation";
import { environment } from '../environments/environment';
import { MfePortLoader } from "../app/ports/mfePortLoader.interface";

@Injectable()
export class HomeLoaderAdapter implements MfePortLoader {
    private component?: Type<unknown>;
    private childInjector?: EnvironmentInjector;

    constructor(private envInjector: EnvironmentInjector) {}
    
    async load(container: ViewContainerRef) {
        const routes = await loadRemoteModule({
            type: 'module',
            remoteEntry: environment.HOME_COMPONENT,
            exposedModule: './HomeRoutes',
        }).then(m => m.HomeRoutes);

        const routeConfig = routes[0];
        this.component = routeConfig.component;
        const providers = routeConfig.providers || [];

        this.childInjector = createEnvironmentInjector(providers, this.envInjector);

        container.clear();
        container.createComponent(this.component as Type<any>, {
            index: container.length,
            injector: this.childInjector,
        });
    }

    rebuild(container: ViewContainerRef) {
        if (!this.component) return;
        container.clear();
        container.createComponent(this.component as Type<any>, {
            injector: this.childInjector,
        });
    }
}