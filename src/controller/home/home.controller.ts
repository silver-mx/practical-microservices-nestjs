import { Controller, Get, Render } from '@nestjs/common';
import { VideoService } from 'src/service/video/video.service';

@Controller('home')
export class HomeController {
  constructor(private videoService: VideoService) {}

  @Get()
  @Render('home/templates/home.pug')
  async getHome() {
    return this.videoService.getHomePageData();
  }
}
