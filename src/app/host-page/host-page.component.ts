import { loadRemoteModule } from '@angular-architects/module-federation';
import { Component, Injector, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-host-page',
  templateUrl: './host-page.component.html',
  styleUrls: ['./host-page.component.scss']
})
export class HostPageComponent implements OnInit {
  @ViewChild('mfe', { read: ViewContainerRef, static: true })
    viewContainerRef!: ViewContainerRef;

  constructor(private injector: Injector) {}

  async ngOnInit() {
    const component: any = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './TestComponent',
    }).then((m: any) => m.TestComponent);

    this.viewContainerRef.createComponent(component, {
      injector: this.injector,
    });
  }

}
