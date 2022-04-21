import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Article } from "src/articles/schemas/article.schema";
import { Comment } from "src/comments/interfaces/comment.interface";

export type LikeDocument = Like & mongoose.Document;

@Schema()
export class Like {
  _id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Article' })
  article: Article;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
  comment: Comment;

  @Prop({ default: Date.now })
  created_date: Date;
}

export const LikeSchema = SchemaFactory.createForClass(Like)