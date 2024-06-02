import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { Logger } from '../../../core/utils/logger';
import { RoleRepository } from '../domain/repositories/role.repository';
import { Role } from '../domain/role';
import { RoleDto } from './dtos/role.dto';
import { RoleEntity } from './entities/role.entity';

export class RoleInfrastructure implements RoleRepository {
  private readonly logger = Logger.createLogger();

  async getAll(): Promise<Role[]> {
    try {
      const repository =
        DatabaseBootstrap.getDataSource().getRepository(RoleEntity);

      const rolesEntity = await repository.find();

      return RoleDto.fromDataToDomain(rolesEntity) as Role[];
    } catch (error) {
      this.logger.logError("Error getAll role", error);
      throw new Error("Error getAll role");
    }
  }
}
