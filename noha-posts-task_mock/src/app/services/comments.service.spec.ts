import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({    
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: CommentsService = TestBed.get(CommentsService);
    expect(service).toBeTruthy();
  });
});
