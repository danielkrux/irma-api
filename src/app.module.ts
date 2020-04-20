import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IncidentsModule } from './incidents/incidents.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from './teams/team.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/irma', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    IncidentsModule,
    TeamsModule,
    UsersModule,
    AuthModule,
    NotificationsModule,
  ],
  providers: [NotificationsService],
})
export class AppModule {}
