import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdministracionEventosComponent } from './panel-administracion-eventos.component';

describe('PanelAdministracionEventosComponent', () => {
  let component: PanelAdministracionEventosComponent;
  let fixture: ComponentFixture<PanelAdministracionEventosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PanelAdministracionEventosComponent]
    });
    fixture = TestBed.createComponent(PanelAdministracionEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
