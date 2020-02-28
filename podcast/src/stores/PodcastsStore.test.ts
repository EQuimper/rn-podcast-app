import PodcastsStore, { ISearchPodcastServices } from './PodcastsStore';
import { IPodcast } from '../types/Podcast';
import { podcastFactory } from '../tests/factory';
import { FeedUrlServices } from '../services/FeedUrlServices';

class MockSearchServices implements ISearchPodcastServices {
  async searchPodcast(_: string): Promise<IPodcast[]> {
    return Promise.resolve(podcastFactory(10));
  }
}

describe('PodcastStore', () => {
  describe('#searchPodcast()', () => {
    it('should search from a term and return the result', async () => {
      const podcastsStore = new PodcastsStore(
        new MockSearchServices(),
        new FeedUrlServices(),
      );

      expect(podcastsStore.searchs.size).toBe(0);
      expect(podcastsStore.podcasts.size).toBe(0);

      await podcastsStore.searchPodcast('test');

      expect(podcastsStore.searchs.has('test')).toBeTruthy();
      expect(podcastsStore.searchs.get('test')!.length).toBe(10);

      expect(podcastsStore.podcasts.size).toBe(10);
    });
  });
});
