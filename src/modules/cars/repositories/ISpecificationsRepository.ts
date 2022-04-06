import { Specification } from '../infra/typeorm/entities/Specification';

interface IcreateSpecificationDto {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: IcreateSpecificationDto): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, IcreateSpecificationDto };
