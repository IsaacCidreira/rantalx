import { Specification } from '../infra/typeorm/entities/Specification';

interface IcreateSpecificationDto {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({
    description,
    name,
  }: IcreateSpecificationDto): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, IcreateSpecificationDto };
