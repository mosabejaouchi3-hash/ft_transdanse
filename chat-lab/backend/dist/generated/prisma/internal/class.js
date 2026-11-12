import * as runtime from "@prisma/client/runtime/client";
const config = {
    "previewFeatures": [],
    "clientVersion": "7.10.1",
    "engineVersion": "d1b3f377ca835d73fd50954a5e22128b9ebdd6b8",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Chat {\n  id        Int      @id @default(autoincrement())\n  senderId  String\n  roomId    String\n  text      String\n  createdAt DateTime @default(now())\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Chat\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"senderId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"roomId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"text\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null,\"schema\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Chat.findUnique\",\"Chat.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Chat.findFirst\",\"Chat.findFirstOrThrow\",\"Chat.findMany\",\"data\",\"Chat.createOne\",\"Chat.createMany\",\"Chat.createManyAndReturn\",\"Chat.updateOne\",\"Chat.updateMany\",\"Chat.updateManyAndReturn\",\"create\",\"update\",\"Chat.upsertOne\",\"Chat.deleteOne\",\"Chat.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Chat.groupBy\",\"Chat.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"senderId\",\"roomId\",\"text\",\"createdAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "MAsQCBwAACUAMB0AAAQAEB4AACUAMB8CAAAAASABACcAISEBACcAISIBACcAISNAACgAIQEAAAABACABAAAAAQAgCBwAACUAMB0AAAQAEB4AACUAMB8CACYAISABACcAISEBACcAISIBACcAISNAACgAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAFHwIAAAABIAEAAAABIQEAAAABIgEAAAABI0AAAAABAQgAAAkAIAUfAgAAAAEgAQAAAAEhAQAAAAEiAQAAAAEjQAAAAAEBCAAACwAwAQgAAAsAMAUfAgAwACEgAQAuACEhAQAuACEiAQAuACEjQAAvACECAAAAAQAgCAAADgAgBR8CADAAISABAC4AISEBAC4AISIBAC4AISNAAC8AIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAACkAIBYAACoAIBcAAC0AIBgAACwAIBkAACsAIAgcAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiAQAcACEjQAAdACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAgcAAAaADAdAAAXABAeAAAaADAfAgAbACEgAQAcACEhAQAcACEiAQAcACEjQAAdACENFQAAHwAgFgAAJAAgFwAAHwAgGAAAHwAgGQAAHwAgJAIAAAABJQIAAAAEJgIAAAAEJwIAAAABKAIAAAABKQIAAAABKgIAAAABKwIAIwAhDhUAAB8AIBgAACIAIBkAACIAICQBAAAAASUBAAAABCYBAAAABCcBAAAAASgBAAAAASkBAAAAASoBAAAAASsBACEAISwBAAAAAS0BAAAAAS4BAAAAAQsVAAAfACAYAAAgACAZAAAgACAkQAAAAAElQAAAAAQmQAAAAAQnQAAAAAEoQAAAAAEpQAAAAAEqQAAAAAErQAAeACELFQAAHwAgGAAAIAAgGQAAIAAgJEAAAAABJUAAAAAEJkAAAAAEJ0AAAAABKEAAAAABKUAAAAABKkAAAAABK0AAHgAhCCQCAAAAASUCAAAABCYCAAAABCcCAAAAASgCAAAAASkCAAAAASoCAAAAASsCAB8AIQgkQAAAAAElQAAAAAQmQAAAAAQnQAAAAAEoQAAAAAEpQAAAAAEqQAAAAAErQAAgACEOFQAAHwAgGAAAIgAgGQAAIgAgJAEAAAABJQEAAAAEJgEAAAAEJwEAAAABKAEAAAABKQEAAAABKgEAAAABKwEAIQAhLAEAAAABLQEAAAABLgEAAAABCyQBAAAAASUBAAAABCYBAAAABCcBAAAAASgBAAAAASkBAAAAASoBAAAAASsBACIAISwBAAAAAS0BAAAAAS4BAAAAAQ0VAAAfACAWAAAkACAXAAAfACAYAAAfACAZAAAfACAkAgAAAAElAgAAAAQmAgAAAAQnAgAAAAEoAgAAAAEpAgAAAAEqAgAAAAErAgAjACEIJAgAAAABJQgAAAAEJggAAAAEJwgAAAABKAgAAAABKQgAAAABKggAAAABKwgAJAAhCBwAACUAMB0AAAQAEB4AACUAMB8CACYAISABACcAISEBACcAISIBACcAISNAACgAIQgkAgAAAAElAgAAAAQmAgAAAAQnAgAAAAEoAgAAAAEpAgAAAAEqAgAAAAErAgAfACELJAEAAAABJQEAAAAEJgEAAAAEJwEAAAABKAEAAAABKQEAAAABKgEAAAABKwEAIgAhLAEAAAABLQEAAAABLgEAAAABCCRAAAAAASVAAAAABCZAAAAABCdAAAAAAShAAAAAASlAAAAAASpAAAAAAStAACAAIQAAAAAAAS8BAAAAAQEvQAAAAAEFLwIAAAABMAIAAAABMQIAAAABMgIAAAABMwIAAAABAAAAAAUVAAYWAAcXAAgYAAkZAAoAAAAAAAUVAAYWAAcXAAgYAAkZAAoBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIaGAUbGQs"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
export function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map