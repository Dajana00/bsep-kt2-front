import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUsersPageComponent } from './block-users-page.component';

describe('BlockUsersPageComponent', () => {
  let component: BlockUsersPageComponent;
  let fixture: ComponentFixture<BlockUsersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockUsersPageComponent]
    });
    fixture = TestBed.createComponent(BlockUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
