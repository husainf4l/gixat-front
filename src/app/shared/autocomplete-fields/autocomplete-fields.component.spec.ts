import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteFieldsComponent } from './autocomplete-fields.component';

describe('AutocompleteFieldsComponent', () => {
  let component: AutocompleteFieldsComponent;
  let fixture: ComponentFixture<AutocompleteFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteFieldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
