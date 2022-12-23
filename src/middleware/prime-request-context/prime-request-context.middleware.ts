import { Injectable, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PrimeRequestContextMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    req.context = {
      traceId: uuidv4(),
      userId: req.session ? req.session.userId : null
    };
    next();
  }
}
