import {TestBed, inject} from '@angular/core/testing';

import {RxPipesService} from './rx-pipes.service';

describe('RxPipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RxPipesService]
    });
  });

  it('should be created', inject(
    [RxPipesService],
    (service: RxPipesService) => {
      expect(service).toBeTruthy();
    }
  ));
});
