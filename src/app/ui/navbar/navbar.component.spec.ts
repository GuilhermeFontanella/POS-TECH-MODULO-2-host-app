import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NAVBAR_LOADER } from 'src/app/ports/mfePort/navbar/navbarLoaderToken';
import { MfePortLoader } from '../../ports/mfePortLoader.interface';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  let mfeLoaderMock: jasmine.SpyObj<MfePortLoader>;

  beforeEach(async () => {
    mfeLoaderMock = jasmine.createSpyObj<MfePortLoader>('MfePortLoader', [
      'load',
      'rebuild'
    ]);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    })
      .overrideComponent(NavbarComponent, {
        set: {
          providers: [
            { provide: NAVBAR_LOADER, useValue: mfeLoaderMock }
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
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
      expect(mfeLoaderMock.load).toHaveBeenCalledWith(component.navbarRef);
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
      expect(mfeLoaderMock.rebuild).toHaveBeenCalledWith(component.navbarRef);
    });
  });
});
