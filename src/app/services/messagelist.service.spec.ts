import { TestBed, inject } from '@angular/core/testing';

import { MessagelistService } from './messagelist.service';

describe('MessagelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessagelistService]
    });
  });

  it('should be created', inject([MessagelistService], (service: MessagelistService) => {
    expect(service).toBeTruthy();
  }));
});
