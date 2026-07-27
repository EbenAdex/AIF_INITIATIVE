import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({
    summary: 'Check API health',
    description:
      'Returns a lightweight liveness response for uptime monitors and load balancers. This endpoint does not require authentication.',
  })
  check() {
    return {
      status: 'ok',
      service: 'initiative-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
