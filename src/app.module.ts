import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IncidentsModule } from './incidents/incidents.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from './teams/team.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/irma', {
      useNewUrlParser: true,
      useUnifiedTopology:true
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    IncidentsModule,
    TeamsModule,
    UsersModule,
  ],
})
export class AppModule {}
