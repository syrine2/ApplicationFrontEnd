import { TestBed } from '@angular/core/testing';

import { SerVersionService } from './ser-version.service';

describe('SerVersionService', () => {
  let service: SerVersionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SerVersionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
