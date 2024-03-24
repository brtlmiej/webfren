import path from "path";

// Returns path to test asset
export function getAssetPath(file: string): string {
    return path.join('/src/services/tests/assets/', file);
}