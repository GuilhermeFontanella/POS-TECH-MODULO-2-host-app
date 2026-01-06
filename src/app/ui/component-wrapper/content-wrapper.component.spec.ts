import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentWrapperComponent } from './content-wrapper.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { By } from '@angular/platform-browser';

describe('ContentWrapperComponent', () => {
  let component: ContentWrapperComponent;
  let fixture: ComponentFixture<ContentWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContentWrapperComponent, // standalone
        RouterTestingModule,
        NzLayoutModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render nz-content', () => {
    const nzContent = fixture.debugElement.query(By.css('nz-content'));
    expect(nzContent).toBeTruthy();
  });

  it('should render router-outlet inside nz-content', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
