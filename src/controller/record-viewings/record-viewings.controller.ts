import { Controller, Param, Post, Render, Request, Response } from '@nestjs/common';
import { VideoService } from 'src/service/video/video.service';

@Controller('record-viewings')
export class RecordViewingsController {

  constructor(private videoService: VideoService) {
  }

  @Post('/:videoId')
  @Render('home/templates/home.pug')
  async createRecordViewing(@Param('videoId') videoId: string, @Request() request, @Response() response) {
    await this.videoService.createRecordViewing(request.context.traceId, videoId, request.context.userId);
    response.status(302).redirect('/');
  }

}
