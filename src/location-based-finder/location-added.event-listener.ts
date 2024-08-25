import { OnEvent } from '@nestjs/event-emitter';
import { Location } from 'src/location/location.entity';
import { IntegrationEvents } from 'src/shared/integration-events.enum';
import { LocationBasedFinderRepository } from './location-based-finder.abstract-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationAddedEventListener {
  constructor(
    private readonly locationBasedRepository: LocationBasedFinderRepository,
  ) {}

  @OnEvent(IntegrationEvents.LOCATION_ADDED)
  public async handleLocationAddedEvent(payload: Location): Promise<void> {
    await this.locationBasedRepository.addLocation(payload.id, payload.longLat);
  }
}
