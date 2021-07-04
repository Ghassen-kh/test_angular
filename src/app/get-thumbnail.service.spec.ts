import { TestBed } from '@angular/core/testing';

import { GetThumbnailService } from './get-thumbnail.service';

describe('GetThumbnailService', () => {
  let service: GetThumbnailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetThumbnailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
