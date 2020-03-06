import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QltsPage } from './qlts.page';

describe('QltsPage', () => {
  let component: QltsPage;
  let fixture: ComponentFixture<QltsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QltsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QltsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
