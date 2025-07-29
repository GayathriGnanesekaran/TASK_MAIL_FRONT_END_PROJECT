import { TestBed } from '@angular/core/testing';

import { TaskmailserviceService } from './taskmailservice.service';

describe('TaskmailserviceService', () => {
  let service: TaskmailserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskmailserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
