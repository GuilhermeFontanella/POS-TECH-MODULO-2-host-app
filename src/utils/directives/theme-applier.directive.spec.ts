import { ElementRef, Renderer2 } from '@angular/core';
import { ThemeApplierDirective } from './theme-applier.directive';
import { Store } from '@ngrx/store';
import { defaultState, Theme } from '../reducers/them.reducer';
import { of } from 'rxjs';

const elMock: ElementRef<any> = {
  nativeElement: document.createElement('div')
};

const rendererMock: Renderer2 = {
  // métodos que a diretiva provavelmente usa
  addClass: jasmine.createSpy('addClass'),
  removeClass: jasmine.createSpy('removeClass'),
  setStyle: jasmine.createSpy('setStyle'),
  removeStyle: jasmine.createSpy('removeStyle'),
  setProperty: jasmine.createSpy('setProperty'),
  // métodos obrigatórios que não usamos podem ser stubs vazios
  createElement: jasmine.createSpy('createElement').and.returnValue(document.createElement('div')),
  createComment: jasmine.createSpy('createComment').and.returnValue(document.createComment('')),
  createText: jasmine.createSpy('createText').and.returnValue(document.createTextNode('')),
  appendChild: jasmine.createSpy('appendChild'),
  insertBefore: jasmine.createSpy('insertBefore'),
  removeChild: jasmine.createSpy('removeChild'),
  selectRootElement: jasmine.createSpy('selectRootElement').and.callFake((selector: string | any) => {
    return typeof selector === 'string' ? document.querySelector(selector) as any : selector;
  }),
  parentNode: jasmine.createSpy('parentNode'),
  nextSibling: jasmine.createSpy('nextSibling'),
  setAttribute: jasmine.createSpy('setAttribute'),
  removeAttribute: jasmine.createSpy('removeAttribute'),
  listen: jasmine.createSpy('listen').and.returnValue(() => {}),
} as unknown as Renderer2;

export const storeMock: Partial<Store<{ theme: Theme }>> = {
  select: jasmine.createSpy('select').and.returnValue(of(defaultState)),
  dispatch: jasmine.createSpy('dispatch')
};

describe('ThemeApplierDirective', () => {
  it('should create an instance', () => {
    const directive = new ThemeApplierDirective(elMock, rendererMock, storeMock as Store<{ theme: Theme }>);
    expect(directive).toBeTruthy();
  });
});
