import * as Faker from 'faker';

import { IPodcast } from '../types/Podcast';

export const podcastFactory = (
  amount: number,
  opts?: Partial<IPodcast>,
): IPodcast[] => {
  const podcasts: IPodcast[] = [];

  for (let i = 0; i < amount; i++) {
    const podcast: IPodcast = {
      wrapperType: Faker.lorem.word(),
      kind: Faker.lorem.word(),
      collectionId: Faker.random.number(),
      trackId: Number(Faker.random.number()),
      artistName: Faker.lorem.word(),
      collectionName: Faker.lorem.word(),
      trackName: Faker.lorem.word(),
      collectionCensoredName: Faker.lorem.word(),
      trackCensoredName: Faker.lorem.word(),
      collectionViewUrl: Faker.lorem.word(),
      feedUrl: Faker.lorem.word(),
      trackViewUrl: Faker.lorem.word(),
      artworkUrl30: Faker.lorem.word(),
      artworkUrl60: Faker.lorem.word(),
      artworkUrl100: Faker.lorem.word(),
      collectionPrice: Faker.random.number(),
      trackPrice: Faker.random.number(),
      trackRentalPrice: Faker.random.number(),
      collectionHdPrice: Faker.random.number(),
      trackHdPrice: Faker.random.number(),
      trackHdRentalPrice: Faker.random.number(),
      releaseDate: Faker.date.past(),
      collectionExplicitness: Faker.lorem.word(),
      trackExplicitness: Faker.lorem.word(),
      trackCount: Faker.random.number(),
      country: Faker.lorem.word(),
      currency: Faker.lorem.word(),
      primaryGenreName: Faker.lorem.word(),
      contentAdvisoryRating: Faker.lorem.word(),
      artworkUrl600: Faker.lorem.word(),
      genreIds: [],
      genres: [],
      ...(opts ?? {}),
    };

    podcasts.push(podcast);
  }

  return podcasts;
};
