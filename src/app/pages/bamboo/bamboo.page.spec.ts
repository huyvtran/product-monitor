import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BambooPage } from './bamboo.page';

describe('BambooPage', () => {
  let component: BambooPage;
  let fixture: ComponentFixture<BambooPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BambooPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BambooPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
