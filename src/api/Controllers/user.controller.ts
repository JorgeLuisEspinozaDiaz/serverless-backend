import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetUserQuery } from '../../application/Queries/users/list/get-users.query';
import { User } from '../../domain/entities/user.entity';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private readonly queryBus: QueryBus) {}

  @ApiOperation({
    summary: 'Obtiene la lista de usuarios',
   })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida correctamente',
    type: [User],
  })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.queryBus.execute(new GetUserQuery());
  }
}
