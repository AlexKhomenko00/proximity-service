import { Module, Provider } from '@nestjs/common';
import { GeohashedLocationsRepository } from './geohashed-locations.repository';
import { LocationBasedFinderRepository } from 'src/location-based-finder/location-based-finder.abstract-repository';

const repoProvider: Provider<LocationBasedFinderRepository> = {
  provide: LocationBasedFinderRepository,
  useExisting: GeohashedLocationsRepository,
};

@Module({
  providers: [GeohashedLocationsRepository, repoProvider],
  exports: [repoProvider],
})
export class GeohashedLocationsModule {}
