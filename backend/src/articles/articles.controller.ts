import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { GetArticleDto } from './dto/get-article.dto';
import { Article } from './interfaces/article.interface';
import { Request } from 'express';

@Controller("articles")
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles(@Query() getArticleDto: GetArticleDto = null, @Req() req: Request ): Promise<Article[]> {
    return this.articlesService.getArticles(getArticleDto);
  }

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(createArticleDto);
  }
}
