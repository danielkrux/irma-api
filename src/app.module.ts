import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { IncidentsService } from './incidents/incidents.service';
import { IncidentsModule } from './incidents/incidents.module';
import { MongooseModule } from '@nestjs/mongoose';

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
  ],
})
export class AppModule {}
