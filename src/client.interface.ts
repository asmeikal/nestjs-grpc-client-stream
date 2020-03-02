import { Observable } from 'rxjs';
import { Metadata } from 'grpc';

export interface RequestMessage {
  message: string;
}

export interface ResponseMessage {
  response: string;
}

export interface StreamingClient {
  streamData(request: Observable<RequestMessage>, metadata: Metadata): Observable<ResponseMessage>;
}
