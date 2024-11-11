import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoQuickbooksComponent } from './company-info-quickbooks.component';

describe('CompanyInfoQuickbooksComponent', () => {
  let component: CompanyInfoQuickbooksComponent;
  let fixture: ComponentFixture<CompanyInfoQuickbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyInfoQuickbooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInfoQuickbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
