export function uuid(size: number) {
    const data = new Array(size);
    for (let i = 0; i < size; ++i) {
        data[i] = Math.random() * 0xff | 0;
    }
    let result = '';
    for (let offset = 0; offset < size; ++offset) {
        const byte = data[offset];
        result += byte.toString(16).toLowerCase();
    }
    return result;
}