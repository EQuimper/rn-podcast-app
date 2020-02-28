import { IPodcast } from '../types/Podcast';
import { ISearchPodcastServices } from '../stores/PodcastsStore';

class ItunesApiServices implements ISearchPodcastServices {
  private baseUrl = 'https://itunes.apple.com/search';

  public async searchPodcast(term: string): Promise<IPodcast[]> {
    const url = `${this.baseUrl}?entity=podcast&term=${term}`;

    const res = await fetch(url, {
      method: 'GET',
    });

    const resJson = (await res.json()) as { results: IPodcast[] };

    return resJson.results;
  }
}

export const itunesApiServices = new ItunesApiServices();
