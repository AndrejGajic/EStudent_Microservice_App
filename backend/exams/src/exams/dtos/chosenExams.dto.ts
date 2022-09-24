import { Exam } from "../schemas/exam.schema";

export class ChosenExamsDto {
    index: string;
    chosen: Exam[];
    price: number;
}