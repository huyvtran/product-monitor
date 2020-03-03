import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MEINVOICEPage } from './meinvoice.page';

describe('MEINVOICEPage', () => {
  let component: MEINVOICEPage;
  let fixture: ComponentFixture<MEINVOICEPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MEINVOICEPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MEINVOICEPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
