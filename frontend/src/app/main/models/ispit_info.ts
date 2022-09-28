export class IspitInfo {
    sifra: string;
    naziv: string;
    izborni: boolean;
    ocena: number;
    semestar: number;
    espb: number;
    rok: string;
    datum_polaganja: string;
    potpisao: string;
    broj_polaganja: number;

    constructor(sifra: string, naziv: string, izborni: boolean, ocena: number, semestar: number, espb: number, rok: string, datum_polaganja: string, potpisao: string, broj_polaganja: number = 0) {
        this.sifra = sifra;
        this.naziv = naziv;
        this.izborni = izborni;
        this.ocena = ocena;
        this.semestar = semestar;
        this.espb = espb;
        this.rok = rok;
        this.datum_polaganja = datum_polaganja;
        this.potpisao = potpisao;
        this.broj_polaganja = broj_polaganja;
    }

}