export class SaveHomeStateCommand {
    constructor(
        public readonly key: string,
        public readonly value: any
    ){}
}