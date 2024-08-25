import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LongLat } from 'src/shared/long-lang';
import { FindNearbyLocationsDto } from './dto/find-nearby-location.dto';
import { NearbyLocationDto } from './dto/nearby-location.dto';
import { LocationBasedFinderService } from './location-based-finder.service';

@ApiTags('location-based-finder')
@Controller('location-based-finder')
export class LocationBasedFinderController {
  constructor(
    private readonly locationBasedFinder: LocationBasedFinderService,
  ) {}

  @Get('nearby-locations')
  public async getNearbyLocations(
    @Query() dto: FindNearbyLocationsDto,
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
