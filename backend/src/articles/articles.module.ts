import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LikesModule } from "src/likes/likes.module";
import { ArticlesController } from "./articles.controller";
import { ArticlesService } from "./articles.service";
import { Article, ArticleSchema } from "./schemas/article.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: "articles", schema: ArticleSchema}]),
        forwardRef(() => LikesModule),
    ],
    controllers: [ArticlesController],
    providers: [ArticlesService],
    exports: [ArticlesService]
})
export class ArticlesModule {}