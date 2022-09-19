export class Kurs {
    id: number;
    akronim: string;
    sifra: string;
    naziv: string;
    izborni: boolean;
    semestar: number;
    espb: number;
    nivo: string;
    smer: string;
    profesori: Array<string>;
    asistenti: Array<string>;
}