import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubDataViewerComponent } from './github-data-viewer.component';

describe('GithubDataViewerComponent', () => {
  let component: GithubDataViewerComponent;
  let fixture: ComponentFixture<GithubDataViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubDataViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GithubDataViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
