import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;

@Schema()
export class Student {
    @Prop()
    korisnicko_ime: string;
    @Prop()
    lozinka: string;
    @Prop()
    indeks: string;
    @Prop()
    ime: string;
    @Prop()
    prezime: string;
    @Prop()
    ime_roditelja: string;
    @Prop()
    datum: string;
    @Prop()
    mesto_rodjenja: string;
    @Prop()
    JMBG: string;
    @Prop()
    telefon: string;
    @Prop()
    novac: number;
    @Prop()
    pol: string;
    @Prop()
    email: string;
    @Prop()
    slika: string;
    @Prop()
    upisana_godina: number;
    @Prop()
    aktiviran: boolean;
    @Prop()
    budzet: boolean;
    @Prop()
    ukupno_espb: number;
    @Prop()
    prosecna_ocena: number;
    @Prop()
    dugovanje: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);