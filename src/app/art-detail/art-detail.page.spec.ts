import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtDetailPage } from './art-detail.page';

describe('ArtDetailPage', () => {
  let component: ArtDetailPage;
  let fixture: ComponentFixture<ArtDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
