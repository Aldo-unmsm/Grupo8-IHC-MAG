import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBarComponent } from './post-bar.component';

describe('PostBarComponent', () => {
  let component: PostBarComponent;
  let fixture: ComponentFixture<PostBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
