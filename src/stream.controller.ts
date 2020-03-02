import {
  Body,
  Controller,
  Inject,
  Logger,
  OnModuleInit,
  Post
} from '@nestjs/common';
import { StreamDto } from './stream.dto';
import { RequestMessage, StreamingClient } from './client.interface';
import { ClientGrpc } from '@nestjs/microservices';
import { ReplaySubject } from 'rxjs';
import { Metadata } from 'grpc';

@Controller('stream')
export class StreamController implements OnModuleInit {
  private client: StreamingClient;

  private readonly logger = new Logger(StreamController.name);

  constructor(@Inject('StreamingClient') private readonly clientProvider: ClientGrpc) {
  }

  onModuleInit() {
    this.client = this.clientProvider.getService<StreamingClient>('StreamingService');
  }

  @Post()
  stream(@Body() streamDto: StreamDto): Promise<string> {
    return new Promise((resolve, reject) => {
      this.logger.debug('Received a new request...');

      const requestObservable = new ReplaySubject<RequestMessage>();

      const metadata = new Metadata();
      metadata.set('authorization', 'secret');

      const responseObserver = this.client.streamData(requestObservable, metadata);

      let response: string = null;

      responseObserver.subscribe(value => {
        response = value.response;
      }, err => {
        reject(err);
      }, () => {
        this.logger.debug('Request finished, sending response...');
        this.logger.debug(response);
        resolve(response);
      });

      this.logger.debug(`Sending ${streamDto.numMessages} messages to gRPC server`);
      for (let i = 0; i < streamDto.numMessages; i++) {
        requestObservable.next({ message: 'a message' });
      }

      requestObservable.complete();
    });
  }
}
