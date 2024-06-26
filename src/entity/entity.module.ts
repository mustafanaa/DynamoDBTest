import { Module } from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityController } from './entity.controller';
import { DynamoDBConfigService } from '../config/dynamodb.config';

@Module({
  providers: [EntityService, DynamoDBConfigService],
  controllers: [EntityController],
})
export class EntityModule {}
