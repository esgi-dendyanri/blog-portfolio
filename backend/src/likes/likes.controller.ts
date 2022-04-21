import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { LikesService } from './likes.service';
import { GetLikeDto } from './dto/get-like.dto';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './interfaces/like.interface';
import { Request, Response } from 'express';

@Controller("likes")
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async like(@Body() createLikeDto: CreateLikeDto, @Headers("user_id") user_id: string, @Res() res: Response) {
    let like: Like | string = await this.likesService.like(user_id, createLikeDto);
    if ( typeof like === 'string' )
      res.status(HttpStatus.BAD_REQUEST).send(like)
    else
      res.status(HttpStatus.OK).send(like)
  }

  @Delete()
  async unlike(@Query() getLikeDto: GetLikeDto, @Headers("user_id") user_id: string, @Res() res: Response) {
    let unlikeResult: boolean | string = await this.likesService.unlike(user_id, getLikeDto);
    if ( typeof unlikeResult === 'string' )
      res.status(HttpStatus.BAD_REQUEST).send(unlikeResult)
    else if ( !unlikeResult )
      res.status(HttpStatus.NOT_FOUND).send('Like is not found')
    else
      res.status(HttpStatus.OK).send(unlikeResult)
  }
}
