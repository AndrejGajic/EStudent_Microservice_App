export class UpdateSurveysEvent {
    index: string;
    code: string;
    constructor(index: string, code: string) {
        this.index = index;
        this.code = code;
    }
}