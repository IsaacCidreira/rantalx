import { getRepository, Repository } from 'typeorm';
import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO';
import { IUsersTokenRepository } from '../../../repositories/IUsersTokenRepository';
import { UserToken } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}

export { UsersTokensRepository };
