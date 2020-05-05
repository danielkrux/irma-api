import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { UsersModule } from '../users/users.module';
import { IncidentsModule } from '../incidents/incidents.module';

@Module({
  controllers: [NotificationsController],
  imports: [UsersModule, IncidentsModule]
})
export class NotificationsModule {}
