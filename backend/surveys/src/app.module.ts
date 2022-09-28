import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/surveys'),
    SurveysModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
