import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TablasComponent } from './tablas.component';
import { TablePipePipe } from 'src/app/pipes/table-pipe.pipe';

describe('TablasComponent', () => {
  let component: TablasComponent;
  let fixture: ComponentFixture<TablasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TablasComponent, TablePipePipe],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
