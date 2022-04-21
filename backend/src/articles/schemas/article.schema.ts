import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  _id: string;

  @Prop({required: true})
  slug: string;

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

  @Prop({ default: 0 })
  view_count: number

  @Prop({ default: 0 })
  comment_count: number

  @Prop({ default: 0 })
  like_count: number

  @Prop()
  is_liked?: boolean
}

export const ArticleSchema = SchemaFactory.createForClass(Article)