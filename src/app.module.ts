import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { IncidentsService } from './incidents/incidents.service';
import { IncidentsModule } from './incidents/incidents.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    DatabaseModule,
    IncidentsModule
  ],
  controllers: [AppController],
  providers: [AppService, IncidentsService],
})
export class AppModule {}
