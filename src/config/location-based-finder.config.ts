import { registerAs } from '@nestjs/config';
import { LocationSearchStrategy } from 'src/location-based-finder/enum/search-strategy.enum';
import { LocationBasedFinderConfig } from 'src/location-based-finder/interface/location-based-finder-config.interface';

export const locationBasedConfig = registerAs<LocationBasedFinderConfig>(
  'locationBasedFinderConfig',
  () => {
    const searchStrategy = process.env.LOCATION_SEARCH_STRATEGY;
    if (
      !Object.values(LocationSearchStrategy).includes(
        searchStrategy as LocationSearchStrategy,
      )
    ) {
      throw new Error(`Invalid search strategy ${searchStrategy}`);
    }

    return { searchStrategy: searchStrategy as LocationSearchStrategy };
  },
);
