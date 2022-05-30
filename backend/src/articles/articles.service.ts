import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetLikeDto } from 'src/likes/dto/get-like.dto';
import { Like } from 'src/likes/interfaces/like.interface';
import { LikesService } from 'src/likes/likes.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { Article } from './interfaces/article.interface';
import LatestArticles from './interfaces/latestArticles.interface';
import { ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  @Inject(forwardRef(() => LikesService))
  private likesService: LikesService

  constructor(@InjectModel("articles") private articleModel: Model<ArticleDocument>) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto)
    createdArticle.slug = await this.generateSlugFromTitle(createdArticle.title)
    return createdArticle.save()
  }

  async getArticles(getArticleDto: GetArticleDto): Promise<LatestArticles> {
    let limit: number = 3
    let page: number = 0
    let latestArticles: LatestArticles = {} as LatestArticles

    if ( getArticleDto.limit )
      limit = parseInt(getArticleDto.limit)
    if ( limit < 1 )
      limit = 1
    if ( getArticleDto.page )
      page = parseInt(getArticleDto.page)
    if ( page < 0 )
      page = 0
    
    latestArticles.limit = limit
    latestArticles.page = page
    latestArticles.articles = await this.articleModel.find()
      .sort({ created_date: "desc" })
      .limit(limit)
      .skip(limit * page)
      .exec()
    
    let total: number = await this.articleModel.count().exec()
    latestArticles.total = total
    latestArticles.totalPage = Math.ceil(total/limit)
    
    return latestArticles
  }

  private generateSlugFromTitle(title: string): Promise<string> {
    let cleanTitle: string = title.toLowerCase().replace(/[^a-zA-Z0-9_-]/g, '-')
    return new Promise(async (resolve) => {
      let isExist: boolean = true
      let random: number = 0
      let slug: string
      while (isExist) {
        slug = cleanTitle + (random > 0 ? "-" + random : "")
        try {
          let article: Article = await this.articleModel.findOne({slug}).exec()
          if ( article === null ) {
            isExist = false
          }

        } catch {}

        random = 1 + Math.floor(Math.random() * 1000)
      }

      resolve(slug)
    })
  }

  async openArticle(slug: string, user_id: string): Promise<Article> {
    let article: Article = await this.articleModel.findOne({slug}).exec()

    if ( article !== null ) {
      article.view_count++
      const updateArticle = new this.articleModel(article)
      await updateArticle.save()

      let like: Like | string = await this.likesService.getLike({
        user_id,
        article_id:article._id
      } as GetLikeDto)
      
      article.is_liked = !!like
    }

    return article
  }

  async getArticleById(_id: string): Promise<Article> {
    let article: Article = null;
    try {
      article = await this.articleModel.findById(_id)
      .exec()
    } catch {}

    return article
  }

  async setCommentCount(_id: string, comment_count: number) {
    let article: Article = await this.getArticleById(_id)
    const updatedArticle = new this.articleModel(article)
    updatedArticle.comment_count = comment_count
    await updatedArticle.save()
  }

  async setLikeCount(_id: string, like_count: number) {
    let article: Article = await this.getArticleById(_id)
    const updatedArticle = new this.articleModel(article)
    updatedArticle.like_count = like_count
    await updatedArticle.save()
  }
}
