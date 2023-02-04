import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublisherListComponent } from './admin-publisher-list.component';

describe('AdminPublisherListComponent', () => {
  let component: AdminPublisherListComponent;
  let fixture: ComponentFixture<AdminPublisherListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPublisherListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPublisherListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
