import { Body, Controller, Get } from '@nestjs/common';
import { LongLat } from 'src/shared/long-lang';
import { FindNearbyLocationsDto } from './dto/find-nearby-location.dto';
import { NearbyLocationDto } from './dto/nearby-location.dto';
import { LocationBasedFinderService } from './location-based-finder.service';

@Controller('location-based-finder')
export class LocationBasedFinderController {
  constructor(
    private readonly locationBasedFinder: LocationBasedFinderService,
  ) {}

  @Get('nearby-locations')
  public async getNearbyLocations(
    @Body() dto: FindNearbyLocationsDto,
  ): Promise<NearbyLocationDto[]> {
    const locations = await this.locationBasedFinder.getNearbyLocations({
      longLat: new LongLat(dto),
      radiusInKm: dto.radiusInKm,
      minimumDesiredLocationCount: dto.minimumDesiredLocationCount,
    });

    return locations.map((location) =>
      NearbyLocationDto.fromLocation(location),
    );
  }
}
