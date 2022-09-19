export class IspitInfo {
    sifra: string;
    naziv: string;
    izborni: boolean;
    ocena: number;
    espb: number;
    rok: string;
    datum_polaganja: string;
    potpisao: string;

    constructor(sifra: string, naziv: string, izborni: boolean, ocena: number, espb: number, rok: string, 
        datum_polaganja: string, potpisao: string) {
            this.sifra = sifra;
            this.naziv = naziv;
            this.izborni = izborni;
            this.ocena = ocena;
            this.espb = espb;
            this.rok = rok;
            this.datum_polaganja = datum_polaganja;
            this.potpisao = potpisao;
        }

}