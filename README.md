1. Install dependencies with `yarn install`
2. Launch the NestJS App with `nest start`
3. Launch the gRPC server with `node ./server/index.js`
4. Call the NestJS App endpoint with:
```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"numMessages": 10}' \
  http://localhost:3000/stream
```
