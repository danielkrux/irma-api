import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AuthService, AuthResolver],
  imports: [UsersModule]
})
export class AuthModule {}
