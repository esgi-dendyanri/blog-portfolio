import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Article } from "src/articles/schemas/article.schema";

export type CommentDocument = Comment & mongoose.Document;

@Schema()
export class Comment {
  _id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
  article: Article;

  @Prop({required: [true, "name is required"]})
  name: string;

  @Prop({required: [true, "body is required"]})
  body: string;

  @Prop({ default: Date.now })
  created_date: Date;

  @Prop({ default: 0 })
  like_count: number

  @Prop()
  is_liked?: boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment)