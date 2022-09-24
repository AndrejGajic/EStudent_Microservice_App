export class Ispit {
    sifra: string;
    broj_polaganja: number;
    semestar: number;
    izborni: boolean;
    ocena: number;
    rok: string;
    datum_polaganja: string;
    potpisao: string;

    constructor(sifra: string, broj_polaganja: number, semestar: number, izborni: boolean, ocena: number, rok: string, datum_polaganja: string, potpisao: string) {
        this.sifra = sifra;
        this.broj_polaganja = broj_polaganja;
        this.semestar = semestar;
        this.izborni = izborni;
        this.ocena = ocena;
        this.rok = rok;
        this.datum_polaganja = datum_polaganja;
        this.potpisao = potpisao;
    }
}