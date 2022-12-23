import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { v4 as uuidv4 } from "uuid";
import { Message } from "src/model/event/event.interface";
import { MessageStoreService } from "../message-store/message-store.service";

@Injectable()
export class VideoService {

  constructor(
    private db: DbService,
    private messageStore: MessageStoreService
  ) {

  }

  async getHomePageData(): Promise<any> {
    return this.db.getPageData('home');
  }

  async createRecordViewing(
    traceId: string,
    videoId: string,
    userId: string
  ): Promise<void> {
    const viewedEvent: Message = {
      id: uuidv4(),
      type: "VideoViewed",
      metadata: {
        traceId,
        userId
      },
      data: {
        userId,
        videoId
      }
    };

    const streamName = `viewing-${videoId}`;
    await this.messageStore.write(streamName, viewedEvent, 0);
  }

}
