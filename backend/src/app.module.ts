import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ArticlesModule, CommentsModule, LikesModule, UsersModule, MongooseModule.forRoot('mongodb://localhost:27017/blogs')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
