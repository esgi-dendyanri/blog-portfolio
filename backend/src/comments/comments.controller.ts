import { Body, Controller, Get, Headers, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetCommentDto } from './dto/get-comment.dto';
import { Comment } from './interfaces/comment.interface';
import { Request, Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getComments(@Query() getCommentDto: GetCommentDto = null, @Headers("user_id") user_id: string, @Res() res: Response ) {
    let comments: Comment[] = await this.commentsService.getComments(getCommentDto, user_id);
    if ( comments === null )
      res.status(HttpStatus.NOT_FOUND).send("Article is not found")
    else if ( comments.length == 0 )
      res.status(HttpStatus.NOT_FOUND).send("Comment is not found")
    else
      res.send(comments)
  }

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Res() res: Response) {
    let comment: Comment | string = await this.commentsService.create(createCommentDto);
    if ( comment === null )
      res.status(HttpStatus.NOT_FOUND).send("Article is not found")
    else
      res.send(comment)
  }
}
