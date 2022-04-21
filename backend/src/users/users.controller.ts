import { Body, Controller, Headers, Delete, Get, HttpStatus, Param, Post, Query, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller("users")
export class UsersController {
  @Get("/get_user_id")
  async get(@Headers("user_id") user_id: string) {
    if ( user_id )
      return user_id
    
    let date: Date = new Date()
    let new_user_id: string = Math.random().toString(36).slice(2, 12) + "_"
    new_user_id += date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "_"
    new_user_id += date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    return new_user_id
  }
}