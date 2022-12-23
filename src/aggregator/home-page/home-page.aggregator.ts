import { Injectable } from '@nestjs/common';
import { DbService } from 'src/service/db/db.service';
import { MessageStoreService } from 'src/service/message-store/message-store.service';

@Injectable()
export class HomePageAggregator {

  private static readonly INSERT_HOME_PAGE_DATA = `
      INSERT INTO pages(page_name, page_data)
      VALUES ('home', :pageData) ON CONFLICT DO NOTHING
  `;

  private static readonly INCREMENT_WATCHED_VIDEOS_QUERY = `
      UPDATE
          pages
      SET page_data = jsonb_set(
              jsonb_set(
                      page_data,
                      '{videosWatched}',
                      ((page_data ->> 'videosWatched'):: int + 1)::text::jsonb),
              '{lastViewProcessed}',
              :globalPosition::text::jsonb
          )
      WHERE page_name = 'home'
        AND (page_data ->>'lastViewProcessed')::int < :globalPosition
  `;

  private subscription: any;

  constructor(
    private db: DbService,
    private messageStore: MessageStoreService
  ) {
    this.subscription = this.messageStore.createSubscription({
      streamName: 'viewing',
      this.handleVideoViewed,
      subscriberId: 'aggregators:home-page',
    });
    this.init().then(this.subscription.start);
  }

  async handleVideoViewed(event: any): Promise<any> {
    return this.incrementVideosWatched(event.globalPosition);
  }

  private async init(): Promise<void> {
    return this.ensureHomePage();
  }

  private ensureHomePage(): Promise<any> {
    const initialData = {
      pageData: { lastViewProcessed: 0, videosWatched: 0 },
    };
    return this.db.executeRaw(HomePageAggregator.INSERT_HOME_PAGE_DATA, initialData);
  }


  async incrementVideosWatched(globalPosition): Promise<any> {
    return this.db.executeRaw(HomePageAggregator.INCREMENT_WATCHED_VIDEOS_QUERY, {
      globalPosition,
    });
  }



}
