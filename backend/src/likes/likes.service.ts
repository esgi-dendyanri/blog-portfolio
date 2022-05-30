import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like } from './interfaces/like.interface';
import { LikeDocument } from './schemas/like.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { Article } from 'src/articles/interfaces/article.interface';
import { CommentsService } from 'src/comments/comments.service';
import { Comment } from 'src/comments/interfaces/comment.interface';
import { CreateLikeDto } from './dto/create-like.dto';
import { GetLikeDto } from './dto/get-like.dto';

@Injectable()
export class LikesService {
  @Inject(forwardRef(() => CommentsService))
  private commentService: CommentsService

  @Inject(forwardRef(() => ArticlesService))
  private articlesService: ArticlesService

  constructor(@InjectModel("likes") private likeModel: Model<LikeDocument>) {}

  async like(user_id: string, createLikeDto: CreateLikeDto): Promise<Like | string> {
    let article: Article = null
    if ( createLikeDto.article_id ) {
      article = await this.articlesService.getArticleById(createLikeDto.article_id);
      if ( article === null ) {
        return "Article is not found"
      }
    }
    let comment: Comment = null
    if ( createLikeDto.comment_id ) {
      comment = await this.commentService.getCommentById(createLikeDto.comment_id);
      if ( comment === null ) {
        return "Comment is not found"
      }
    }

    const createdLike = new this.likeModel(createLikeDto)
    createdLike.user_id = user_id
    createdLike.article = article
    createdLike.comment = comment

    let like: Like = null
    try {
      let condition: Object
      let service: ArticlesService | CommentsService
      let liked_data_id: string
      
      if ( createLikeDto.article_id ) {
        liked_data_id = createLikeDto.article_id
        condition = {article}
        service = this.articlesService
      } else {
        liked_data_id = createLikeDto.comment_id
        condition = {comment}
        service = this.commentService
      }

      like = await this.likeModel.findOne({...condition, user_id: createLikeDto.user_id}).exec()
      
      if ( like == null )
        like = await createdLike.save()

      let count: number = await this.likeModel.count(condition).exec()
      await service.setLikeCount(liked_data_id, count)

    } catch(e) {
      if ( e.errors ) {
        console.log(e.errors)
        let messages: string[] = []
        Object.keys(e.errors).forEach((key) => {
          messages.push(
            e.errors[key].message
          )
        })
        return messages.join(", ")
      }
    }
    return like
  }

  async getLike(getLikeDto: GetLikeDto): Promise<Like | string> {
    let article: Article = null
    if ( getLikeDto.article_id ) {
      article = await this.articlesService.getArticleById(getLikeDto.article_id);
      if ( article === null ) {
        return "Article is not found"
      }
    }
    let comment: Comment = null
    if ( getLikeDto.comment_id ) {
      comment = await this.commentService.getCommentById(getLikeDto.comment_id);
      if ( comment === null ) {
        return "Comment is not found"
      }
    }

    let condition: Object
    
    if ( getLikeDto.article_id ) {
      condition = {article}
    } else {
      condition = {comment}
    }

    return this.likeModel.findOne({...condition, user_id: getLikeDto.user_id}).exec()
  }

  async unlike(user_id: string, getLikeDto: GetLikeDto): Promise<boolean | string> {
    let article: Article = null
    if ( getLikeDto.article_id ) {
      article = await this.articlesService.getArticleById(getLikeDto.article_id);
      if ( article === null ) {
        return "Article is not found"
      }
    }
    let comment: Comment = null
    if ( getLikeDto.comment_id ) {
      comment = await this.commentService.getCommentById(getLikeDto.comment_id);
      if ( comment === null ) {
        return "Comment is not found"
      }
    }

    let condition: Object
    
    if ( getLikeDto.article_id ) {
      condition = {article}
    } else {
      condition = {comment}
    }

    let deleteResult = await this.likeModel.deleteOne({...condition, user_id: user_id}).exec()
    let acknowledged: boolean = deleteResult.deletedCount > 0

    if ( acknowledged ) {
      let condition: Object
      let service: ArticlesService | CommentsService
      let liked_data_id: string
      
      if ( getLikeDto.article_id ) {
        liked_data_id = getLikeDto.article_id
        condition = {article}
        service = this.articlesService
      } else {
        liked_data_id = getLikeDto.comment_id
        condition = {comment}
        service = this.commentService
      }

      let count: number = await this.likeModel.count(condition).exec()
      await service.setLikeCount(liked_data_id, count)
    }

    return acknowledged
  }
}
