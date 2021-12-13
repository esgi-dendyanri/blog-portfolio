import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { Article } from './interfaces/article.interface';
import { ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel("articles") private articleModel: Model<ArticleDocument>) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const createdArticle = new this.articleModel(createArticleDto)
    return createdArticle.save()
  }

  async getArticles(getArticleDto: GetArticleDto): Promise<Article[]> {
    let limit: number = 3
    let page: number = 0

    if ( getArticleDto.limit )
      limit = parseInt(getArticleDto.limit)
    if ( getArticleDto.page )
      page = parseInt(getArticleDto.page)

    return this.articleModel.find()
      .sort({ created_date: "desc" })
      .limit(limit)
      .skip(limit * page)
      .exec()
  }
}
