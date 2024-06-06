import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const connectDB = async (): Promise<MongooseModuleOptions> => {
  const configService = new ConfigService();

  const user = configService.get<string>('USER');
  const password = configService.get<string>('PASSWORD');
  const nameCluster = configService.get<string>('NAME_CLUSTER');
  const url = configService.get<string>('URL');
  const nameDB = configService.get<string>('NAME_DB');
  const permissions = configService.get<string>('PERMISSIONS');

  const uri = `mongodb+srv://${user}:${password}@${nameCluster}.${url}/${nameDB}?${permissions}`;

  return {
    uri,
  };
};
