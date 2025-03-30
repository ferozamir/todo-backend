import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true }) // Auto add createdAt and updatedAt
export class Todo {
    @Prop({ required: true })
    title: string;

    @Prop({ default: false })
    completed: boolean;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
