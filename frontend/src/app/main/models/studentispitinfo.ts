import { Ispit } from "./ispit";

export class StudentIspitInfo {
    student: string;
    polozeni_ispiti: Array<Ispit>;
    prijavljeni_ispiti: Array<Ispit>;
    izabrani_predmeti: Array<Ispit>;
    espb_prva: number;
    espb_druga: number;
    espb_treca: number;
    espb_cetvrta: number;
}