import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SMEPage } from './sme.page';

describe('SMEPage', () => {
  let component: SMEPage;
  let fixture: ComponentFixture<SMEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMEPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SMEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
