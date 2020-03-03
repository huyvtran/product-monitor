import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MEINVOICEPageRoutingModule } from './meinvoice-routing.module';

import { MEINVOICEPage } from './meinvoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MEINVOICEPageRoutingModule
  ],
  declarations: [MEINVOICEPage]
})
export class MEINVOICEPageModule {}
