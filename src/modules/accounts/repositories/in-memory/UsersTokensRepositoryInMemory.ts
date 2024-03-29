import { ICreateUserTokenDTO } from '../../dtos/ICreateUserTokenDTO';
import { UserToken } from '../../infra/typeorm/entities/UserToken';
import { IUsersTokenRepository } from '../IUsersTokenRepository';

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
  usersTokens: UserToken[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (ut) => ut.user_id === user_id && ut.refresh_token === refresh_token,
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersTokens.find((ut) => ut.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }

  async findByUserRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.usersTokens.find(
      (ut) => ut.refresh_token === refresh_token,
    );

    return userToken;
  }
}

export { UsersTokensRepositoryInMemory };
