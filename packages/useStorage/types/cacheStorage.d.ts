declare class MapStorage {
    private storage;
    length: number;
    getItem(key: string): any;
    setItem(key: string, value: any): void;
    removeItem(key: string): void;
    clear(): void;
    updateLength(): void;
    key(index: number): string | null;
}
declare const _default: MapStorage;
export default _default;
