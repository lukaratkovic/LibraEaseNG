import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGenreListComponent } from './admin-genre-list.component';

describe('AdminGenreListComponent', () => {
  let component: AdminGenreListComponent;
  let fixture: ComponentFixture<AdminGenreListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGenreListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGenreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
