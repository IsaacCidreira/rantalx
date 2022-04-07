import { ICreateCarDto } from '../dtos/ICreateCarDto';

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<void>;
}

export { ICarsRepository };
