import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsResolver } from './teams.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamSchema } from './team';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Team', schema: TeamSchema }]),
    UsersModule,
  ],
  exports: [TeamsService],
  providers: [TeamsService, TeamsResolver],
})
export class TeamsModule {}
