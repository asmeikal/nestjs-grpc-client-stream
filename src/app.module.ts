import { Module } from '@nestjs/common';
import { StreamController } from './stream.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'StreamingClient',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:40051',
          package: 'streaming',
          protoPath: join(__dirname, '..', 'proto', 'service.proto'),
        }
      }
    ])
  ],
  controllers: [StreamController]
})
export class AppModule {

}
