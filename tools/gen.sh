SRC_DIR=./proto

node_modules/.bin/grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:"./server" \
  --plugin=protoc-gen-grpc=node_modules/.bin/grpc_tools_node_protoc_plugin \
  -I "${SRC_DIR}" \
  ${SRC_DIR}/service.proto

node_modules/.bin/grpc_tools_node_protoc \
  --grpc_out="./server" \
  --plugin=protoc-gen-grpc=node_modules/.bin/grpc_tools_node_protoc_plugin \
  -I "${SRC_DIR}" \
  ${SRC_DIR}/service.proto
