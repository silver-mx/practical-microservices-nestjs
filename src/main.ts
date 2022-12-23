import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { MigrationService } from './service/migration/migration.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  dotenv.config();

  const signalAppStart = () => {
    console.log(`${process.env.APP_NAME} started`);
    console.table([['Port', process.env.PORT], ['Environment', process.env.NODE_ENV]]);
  };

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  // Do migrations
  /*const migrationService = app.get(MigrationService);
  await migrationService.migrate();*/

  await app.listen(process.env.PORT, signalAppStart);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
