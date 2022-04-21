import { Body, Controller, Get, Header, Headers, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { Article } from './interfaces/article.interface';
import { Request, Response } from 'express';
import LatestArticles from './interfaces/latestArticles.interface';

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles(@Query() getArticleDto: GetArticleDto = null ): Promise<LatestArticles> {
    return this.articlesService.getArticles(getArticleDto);
  }

  @Get(":slug")
  async openArticle(@Param("slug") slug: string, @Headers("user_id") user_id: string, @Res() res: Response ) {
    let article: Article = await this.articlesService.openArticle(slug, user_id);
    if ( article === null )
      res.status(HttpStatus.NOT_FOUND).send()
    else
      res.status(HttpStatus.OK).send(article)
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }
}
