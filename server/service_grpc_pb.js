// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_pb = require('./service_pb.js');

function serialize_streaming_RequestMessage(arg) {
  if (!(arg instanceof service_pb.RequestMessage)) {
    throw new Error('Expected argument of type streaming.RequestMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_streaming_RequestMessage(buffer_arg) {
  return service_pb.RequestMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_streaming_ResponseMessage(arg) {
  if (!(arg instanceof service_pb.ResponseMessage)) {
    throw new Error('Expected argument of type streaming.ResponseMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_streaming_ResponseMessage(buffer_arg) {
  return service_pb.ResponseMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var StreamingServiceService = exports.StreamingServiceService = {
  streamData: {
    path: '/streaming.StreamingService/StreamData',
    requestStream: true,
    responseStream: false,
    requestType: service_pb.RequestMessage,
    responseType: service_pb.ResponseMessage,
    requestSerialize: serialize_streaming_RequestMessage,
    requestDeserialize: deserialize_streaming_RequestMessage,
    responseSerialize: serialize_streaming_ResponseMessage,
    responseDeserialize: deserialize_streaming_ResponseMessage,
  },
};

exports.StreamingServiceClient = grpc.makeGenericClientConstructor(StreamingServiceService);
