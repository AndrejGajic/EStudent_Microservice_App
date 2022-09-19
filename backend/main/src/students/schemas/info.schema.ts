import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InfoDocument = Info & Document;

@Schema()
export class Info {
    @Prop()
    id: number;
    @Prop()
    naslov: string;
    @Prop()
    tekst: string;
    @Prop()
    glavno: boolean;
    @Prop()
    datum_od: string;
    @Prop()
    datum_do: string;
}

export const InfoSchema = SchemaFactory.createForClass(Info);