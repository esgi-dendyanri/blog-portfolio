import { Body, Controller, Get, Headers, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetCommentDto } from './dto/get-comment.dto';
import { Comment } from './interfaces/comment.interface';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';
import LatestComments from './interfaces/latestComments.interface';

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(@Query() getCommentDto: GetCommentDto = null, @Headers("user_id") user_id: string ): Promise<LatestComments> {
    return this.commentsService.getComments(getCommentDto, user_id);
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Headers("user_id") user_id: string, @Res() res: Response) {
    createCommentDto.user_id = user_id
    let comment: Comment | string = await this.commentsService.create(createCommentDto);
    if ( comment === null )
      res.status(HttpStatus.NOT_FOUND).send("Article is not found")
    else
      res.send(comment)
  }
}
