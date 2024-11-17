import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesModule } from './preferences/preferences.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    PreferencesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
