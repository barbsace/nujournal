import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmissionPage } from './submission.page';

describe('SubmissionPage', () => {
  let component: SubmissionPage;
  let fixture: ComponentFixture<SubmissionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
