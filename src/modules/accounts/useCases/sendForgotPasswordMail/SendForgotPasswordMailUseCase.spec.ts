import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '../../repositories/in-memory/UsersTokensRepositoryInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });
  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await usersRepositoryInMemory.create({
      driver_license: '123451',
      email: 'test@test.com',
      name: 'testUser',
      password: '123',
    });

    await sendForgotPasswordMailUseCase.execute('test@test.com');

    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('tea@aa.com'),
    ).rejects.toEqual(new AppError('User does not exists!'));
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      usersTokensRepositoryInMemory,
      'create',
    );
    await usersRepositoryInMemory.create({
      driver_license: '77851',
      email: 'testuser@testuser.com',
      name: 'testUser12',
      password: '12453',
    });

    await sendForgotPasswordMailUseCase.execute('testuser@testuser.com');

    expect(generateTokenMail).toBeCalled();
  });
});
