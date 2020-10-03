import {TestBed, inject} from '@angular/core/testing';

import {BucketApiService} from './bucket-api.service';

describe('BucketApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketApiService]
    });
  });

  it('should be created', inject(
    [BucketApiService],
    (service: BucketApiService) => {
      expect(service).toBeTruthy();
    }
  ));
});
