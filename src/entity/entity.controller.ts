import { Controller, Get, Param, Query } from '@nestjs/common';
import { EntityService } from './entity.service';

@Controller('entity')
export class EntityController {
  constructor(private readonly entityService: EntityService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.entityService.findOne(id);
  }

  @Get()
  async getBy(
    @Query('propertyName') propertyName: string,
    @Query('index') index: string,
    @Query('value') value: any,
    @Query('limit') limit?: number,
  ) {
    return this.entityService.getBy(propertyName, index, value, limit);
  }
}
