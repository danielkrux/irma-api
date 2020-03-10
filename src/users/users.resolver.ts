import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, CreateUserDTO, UpdateUserDTO } from './user';

@Resolver('Users')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => [User])
  async users() {
    return this.usersService.getUsers();
  }

  @Query(() => [User])
  async user(@Args('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Mutation(() => User)
  async createUser(@Args('user') input: CreateUserDTO) {
    return this.usersService.createUser(input);
  }

  @Mutation(() => User)
  async updateUser(@Args('user') input: UpdateUserDTO) {
    return this.usersService.updateUser(input);
  }
}
