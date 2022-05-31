import { Inject, forwardRef, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetCommentDto } from './dto/get-comment.dto';
import { Comment } from './interfaces/comment.interface';
import { CommentDocument } from './schemas/comment.schema';
import { ArticlesService } from 'src/articles/articles.service';
import { Article } from 'src/articles/interfaces/article.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { LikesService } from 'src/likes/likes.service';
import { Like } from 'src/likes/interfaces/like.interface';
import { GetLikeDto } from 'src/likes/dto/get-like.dto';
import LatestComments from './interfaces/latestComments.interface';
import urlChecker from 'src/helper/urlChecker';

@Injectable()
export class CommentsService {
  @Inject(forwardRef(() => LikesService))
  private likesService: LikesService

  @Inject(forwardRef(() => ArticlesService))
  private articlesService: ArticlesService

  constructor(@InjectModel("comments") private commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment | string> {
    let article: Article = await this.articlesService.getArticleById(createCommentDto.article_id);
    if ( article === null ) {
      return null
    }
    if ( urlChecker.isContainUrl(createCommentDto.body) ) {
      return "Comment CAN NOT contain URL"
    }
    const createdComment = new this.commentModel(createCommentDto)
    createdComment.article = article
    let comment: Comment = null
    try {
      comment = await createdComment.save()
      let comment_count: number = await this.commentModel.count({article}).exec()
      await this.articlesService.setCommentCount(article._id, comment_count)
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
    return comment
  }

  async getComments(getCommentDto: GetCommentDto, user_id: string): Promise<LatestComments> {
    let limit: number = 3
    let page: number = 0
    let latestComments: LatestComments = {} as LatestComments

    let article: Article = await this.articlesService.getArticleById(getCommentDto.article_id);
    if ( article === null ) {
      return null
    }

    if ( getCommentDto.limit )
      limit = parseInt(getCommentDto.limit)
    if ( limit < 1 )
      limit = 1
    if ( getCommentDto.page )
      page = parseInt(getCommentDto.page)
    if ( page < 0 )
      page = 0

    latestComments.limit = limit
    latestComments.page = page
    latestComments.comments = await this.commentModel.find({article})
      .sort({ created_date: "desc" })
      .limit(limit)
      .skip(limit * page)
      .exec()

    let total: number = await this.commentModel.find({article}).count().exec()
    latestComments.total = total
    latestComments.totalPage = Math.ceil(total/limit)
    
    if ( latestComments.comments && latestComments.comments.length ) {
      latestComments.comments = await Promise.all(
        latestComments.comments.map(async(comment: Comment): Promise<Comment> => {
          let like: Like | string = await this.likesService.getLike({
            user_id,
            comment_id: comment._id
          } as GetLikeDto)

          comment.is_liked = !!like
          return comment
        })
      )
    }

    return latestComments
  }

  async getCommentById(_id: string): Promise<Comment> {
    let comment: Comment = null;
    try {
      comment = await this.commentModel.findById(_id)
      .exec()
    } catch {}

    return comment
  }

  async setLikeCount(_id: string, like_count: number) {
    let comment: Comment = await this.getCommentById(_id)
    const updatedComment = new this.commentModel(comment)
    updatedComment.like_count = like_count
    await updatedComment.save()
  }
}
