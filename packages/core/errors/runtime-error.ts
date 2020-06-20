export class RuntimeError {
    constructor(private message: string) {
        this.message = 'EasyType Runtime Error:' + this.message;
    }
}