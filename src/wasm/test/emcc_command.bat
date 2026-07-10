emcc side_module.c -s SIDE_MODULE=2 -O1 -s EXPORTED_FUNCTIONS=['_Fibonacci'] -o side_module.wasm
