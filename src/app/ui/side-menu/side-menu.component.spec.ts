import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideMenuComponent } from './side-menu.component';
import { SIDE_MENU_LOADER } from 'src/app/ports/mfePort/sideMenu/sideMenuLoaderToken';
import { MfePortLoader } from '../../ports/mfePortLoader.interface';
import { Router } from '@angular/router';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;

  let mfeLoaderMock: jasmine.SpyObj<MfePortLoader>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
  mfeLoaderMock = jasmine.createSpyObj<MfePortLoader>('MfePortLoader', [
    'load',
    'rebuild'
  ]);

  routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);

  await TestBed.configureTestingModule({
    imports: [SideMenuComponent],
    providers: [
      { provide: Router, useValue: routerMock }
    ]
  }).overrideComponent(SideMenuComponent, {
    set: {
        providers: [
            { provide: SIDE_MENU_LOADER, useValue: mfeLoaderMock }
        ]
    }
  }).compileComponents();

  fixture = TestBed.createComponent(SideMenuComponent);
  component = fixture.componentInstance;
});

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

describe('ngAfterViewInit', () => {
  it('should call mfeLoader.load with ViewContainerRef', () => {
    fixture.componentRef.setInput('screenType', 'desktop');
    fixture.detectChanges();

    expect(mfeLoaderMock.load).toHaveBeenCalledTimes(1);
    expect(mfeLoaderMock.load).toHaveBeenCalledWith(component.sideMenuRef);
  });
});

  describe('ngOnChanges', () => {
  it('should call mfeLoader.rebuild when screenType changes', () => {
    fixture.componentRef.setInput('screenType', 'desktop');
    fixture.detectChanges();

    mfeLoaderMock.rebuild.calls.reset();

    fixture.componentRef.setInput('screenType', 'mobile');
    fixture.detectChanges();

    expect(mfeLoaderMock.rebuild).toHaveBeenCalledTimes(1);
    expect(mfeLoaderMock.rebuild).toHaveBeenCalledWith(component.sideMenuRef);
  });
});

  describe('ngAfterContentInit', () => {
  it('should navigate when mfe-navbar-navigate event is emitted', () => {
    fixture.componentRef.setInput('screenType', 'desktop');
    fixture.detectChanges();

    const event = new CustomEvent('mfe-navbar-navigate', {
      detail: '/dashboard'
    });

    window.dispatchEvent(event);

    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});

  describe('ngOnDestroy', () => {
  it('should unsubscribe from navbar navigation event', () => {
    fixture.componentRef.setInput('screenType', 'desktop');
    fixture.detectChanges();

    const unsubscribeSpy = spyOn(
      component['$navbarNavigate']!,
      'unsubscribe'
    );

    component.ngOnDestroy();

    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
});