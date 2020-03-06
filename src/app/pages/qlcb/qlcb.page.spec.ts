import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QlcbPage } from './qlcb.page';

describe('QlcbPage', () => {
  let component: QlcbPage;
  let fixture: ComponentFixture<QlcbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlcbPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QlcbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
