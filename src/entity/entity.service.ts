import { Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient, GetCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBConfigService } from '../config/dynamodb.config';

@Injectable()
export class EntityService {
  private client: DynamoDBDocumentClient;

  constructor(private readonly dynamoDBConfigService: DynamoDBConfigService) {
    this.client = this.dynamoDBConfigService.getClient();
  }

  async findOne(id: string): Promise<any> {
    try {
      const params = {
        TableName: 'Entity', // Update to your table name
        Key: { id },
      };
      const command = new GetCommand(params);
      const response = await this.client.send(command);
      return response.Item;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getBy(propertyName: string, index: string, value: any, limit?: number): Promise<any[]> {
    try {
      const params = {
        TableName: 'Entity', // Update to your table name
        IndexName: index,
        KeyConditionExpression: `${propertyName} = :value`,
        ExpressionAttributeValues: {
          ':value': value,
        },
        Limit: limit,
      };
      const command = new QueryCommand(params);
      const response = await this.client.send(command);
      return response.Items || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
