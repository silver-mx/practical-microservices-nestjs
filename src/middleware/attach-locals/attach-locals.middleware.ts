import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AttachLocalsMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.locals.context = req.context;
    next();
  }
}
