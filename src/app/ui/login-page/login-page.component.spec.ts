// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HomePageComponent } from './home-page.component';
// import { MfePortLoader } from 'src/app/ports/mfePortLoader.interface';
// import { HOME_LOADER } from 'src/app/ports/mfePort/home/homeLoaderToken';

// describe('HomePageComponent', () => {
//   let component: HomePageComponent;
//   let fixture: ComponentFixture<HomePageComponent>;

//   let mfeLoaderMock: jasmine.SpyObj<MfePortLoader>;

//   beforeEach(async () => {
//     mfeLoaderMock = jasmine.createSpyObj<MfePortLoader>('MfePortLoader', [
//       'load',
//       'rebuild'
//     ]);

//     await TestBed.configureTestingModule({
//       declarations: [HomePageComponent],
//       providers: [
//         { provide: HOME_LOADER, useValue: mfeLoaderMock }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(HomePageComponent);
//     component = fixture.componentInstance;
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('ngAfterViewInit', () => {
//     it('should call mfeLoader.load with ViewContainerRef', () => {
//       fixture.detectChanges();

//       expect(mfeLoaderMock.load).toHaveBeenCalledTimes(1);
//       expect(mfeLoaderMock.load).toHaveBeenCalledWith(component.homePageRef);
//     });
//   });

//   describe('ngOnChanges', () => {
//     it('should call mfeLoader.rebuild when ngOnChanges is triggered', () => {
//       fixture.detectChanges();

//       component.ngOnChanges({} as any);

//       expect(mfeLoaderMock.rebuild).toHaveBeenCalledTimes(1);
//       expect(mfeLoaderMock.rebuild).toHaveBeenCalledWith(component.homePageRef);
//     });
//   });
// });
