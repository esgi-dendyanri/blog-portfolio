import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop()
  id: string;

  @Prop({required: true})
  title: string;

  @Prop({required: true})
  body: string;

  @Prop()
  category: string;

  @Prop([String])
  tags: string[];

  @Prop({ default: Date.now })
  created_date: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article)