import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttachLocalsMiddleware } from './middleware/attach-locals/attach-locals.middleware';
import { PrimeRequestContextMiddleware } from './middleware/prime-request-context/prime-request-context.middleware';
import { HomeController } from './controller/home/home.controller';
import { VideoService } from './service/video/video.service';
import { DbService } from './service/db/db.service';
import { MigrationService } from './service/migration/migration.service';
import { RecordViewingsController } from './controller/record-viewings/record-viewings.controller';
import { MessageStoreService } from './service/message-store/message-store.service';
import { HomePageAggregator } from './aggregator/home-page/home-page.aggregator';

@Module({
  imports: [],
  controllers: [AppController, HomeController, RecordViewingsController],
  providers: [AppService, VideoService, DbService, MigrationService, MessageStoreService, HomePageAggregator],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PrimeRequestContextMiddleware, AttachLocalsMiddleware)
      .forRoutes('');
  }

}
