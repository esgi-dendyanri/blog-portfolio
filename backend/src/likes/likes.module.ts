import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticlesModule } from "src/articles/articles.module";
import { CommentsModule } from "src/comments/comments.module";
import { LikesController } from "./likes.controller";
import { LikesService } from "./likes.service";
import { Like, LikeSchema } from "./schemas/like.schema"

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "likes", schema: LikeSchema}]),
        forwardRef(() => ArticlesModule),
        forwardRef(() => CommentsModule),
    ],
    controllers: [LikesController],
    providers: [LikesService],
    exports: [LikesService]
})
export class LikesModule {}