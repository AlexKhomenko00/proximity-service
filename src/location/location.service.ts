import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { LocationAddDto } from './add-location.dto';
import { Location } from './location.entity';
import { v4 as uuidv4 } from 'uuid';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IntegrationEvents } from 'src/shared/integration-events.enum';
import { LongLat } from 'src/shared/long-lang';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  public async createLocation(dto: LocationAddDto) {
    const location = Object.assign(new Location(), {
      ...dto,
      longLat: new LongLat({
        longitude: dto.longLat.longitude,
        latitude: dto.longLat.latitude,
      }),
      id: uuidv4(),
    });

    await this.locationRepository.addLocation(location);
    await this.eventEmitter.emitAsync(
      IntegrationEvents.LOCATION_ADDED,
      location,
    );
    return;
  }
}
