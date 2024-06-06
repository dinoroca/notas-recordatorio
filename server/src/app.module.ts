import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './modules/notes/notes.module';
import { ReminderModule } from './modules/reminder/reminder.module';

import { ConfigModule } from '@nestjs/config';
import { connectDB } from './config/bd-config/mongoose.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({ useFactory: async () => await connectDB() }),
    UserModule,
    AuthModule,
    NotesModule,
    ReminderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
