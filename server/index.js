const grpc = require('grpc');
const streamingService = require('./service_grpc_pb');
const service_pb = require('./service_pb.js');

const server = new grpc.Server();

server.addService(streamingService.StreamingServiceService, {
  streamData: (call, callback) => {
    const metadata = call.metadata;
    console.log(metadata);

    if (metadata.get('authorization')[0] !== 'secret') {
      console.error('Missing secret!');
      callback(new Error('Missing secret!'));
      return;
    }

    let count = 0;

    call.on('data', () => {
      console.log('received new chunk');
      count += 1;
      console.log(`count is now at ${count}`)
    });

    call.on('error', err => {
      console.error('an error happened');
      console.error(err);
      callback(new Error('error happened'));
    });

    call.on('end', () => {
      console.log('request ended, sending response back');
      const response = new service_pb.ResponseMessage();
      response.setResponse(`You gave me ${count} strings`);
      callback(null, response);
    });
  },
});

server.bind('localhost:40051', grpc.ServerCredentials.createInsecure());

server.start();

console.log('server started on port 40051');
