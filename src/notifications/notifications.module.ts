import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [NotificationsController],
  imports: [UsersModule]
})
export class NotificationsModule {}
