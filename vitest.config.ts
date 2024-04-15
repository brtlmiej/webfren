import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
      coverage: {
        all: true,
        exclude: ['**/__utils.ts', '**/*.d.ts']
      }
    },
  })