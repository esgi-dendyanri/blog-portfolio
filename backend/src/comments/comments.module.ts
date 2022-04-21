import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticlesModule } from "src/articles/articles.module";
import { LikesModule } from "src/likes/likes.module";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { Comment, CommentSchema } from "./schemas/comment.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "comments", schema: CommentSchema}]),
        forwardRef(() => ArticlesModule),
        forwardRef(() => LikesModule),
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [CommentsService]
})
export class CommentsModule {}