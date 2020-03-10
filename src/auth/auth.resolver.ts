import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse, LoginDTO } from './auth';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginAttempt') { email, password }: LoginDTO,
  ): Promise<LoginResponse> {
    return await this.authService.login(email, password);
  }
}
