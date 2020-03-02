1. Install dependencies with `yarn install`
2. Launch the NestJS App with `nest start`
3. Launch the gRPC server with `node ./server/index.js`

Call the NestJS App endpoint with:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"numMessages": 10}' \
  http://localhost:3000/stream
```
Server should answer with `You gave me 10 strings`, instead crashes.

The `StreamController` tries to send gRPC Metadata to the server, with the `authorization` header set to `secret`.
The gRPC server does not receive the `authorization` header, and returns an error.
