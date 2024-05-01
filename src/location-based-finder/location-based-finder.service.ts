import { Injectable } from '@nestjs/common';
import { Location } from 'src/location/location.entity';
import { LocationRepository } from 'src/location/location.repository';
import { NearbyLocationsSearchPayload } from './interface/nearby-locations-search-payload.interface';
import { LocationBasedFinderRepository } from './location-based-finder.abstract-repository';

@Injectable()
export class LocationBasedFinderService {
  constructor(
    private readonly locationBasedRepo: LocationBasedFinderRepository,
    private readonly locationRepository: LocationRepository,
  ) {}

  public async getNearbyLocations(
    payload: NearbyLocationsSearchPayload,
  ): Promise<Location[]> {
    const locationIds =
      await this.locationBasedRepo.getNearbyLocationIds(payload);

    return this.locationRepository.getLocationsByIds(locationIds);
  }
}
