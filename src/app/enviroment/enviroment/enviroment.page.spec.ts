import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnviromentPage } from './enviroment.page';

describe('EnviromentPage', () => {
  let component: EnviromentPage;
  let fixture: ComponentFixture<EnviromentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviromentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviromentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
