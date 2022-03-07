import { Specification } from '../entities/Specification';

interface IcreateSpecificationDto {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ description, name }: IcreateSpecificationDto): void;
  findByName(name: string): Specification;
}

export { ISpecificationsRepository, IcreateSpecificationDto };
