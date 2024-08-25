import { Module } from '@nestjs/common';
import { ConditionalModule } from '@nestjs/config';
import 'dotenv/config';
import { GeohashedLocationsModule } from 'src/geohashed-locations/geohashed-locations.module';
import { LocationModule } from 'src/location/location.module';
import { QuadtreeLocationModule } from 'src/quadtree/quadtree-location.module';
import { LocationSearchStrategy } from './enum/search-strategy.enum';
import { LocationAddedEventListener } from './location-added.event-listener';
import { LocationBasedFinderController } from './location-based-finder.controller';
import { LocationBasedFinderService } from './location-based-finder.service';

@Module({
  imports: [
    LocationModule,
    ConditionalModule.registerWhen(
      QuadtreeLocationModule,
      (env) =>
        env['LOCATION_SEARCH_STRATEGY'] === LocationSearchStrategy.QUADTREE,
    ),
    ConditionalModule.registerWhen(
      GeohashedLocationsModule,
      (env) =>
        env['LOCATION_SEARCH_STRATEGY'] === LocationSearchStrategy.GEOHASH,
    ),
  ],
  providers: [LocationBasedFinderService, LocationAddedEventListener],
  controllers: [LocationBasedFinderController],
})
export class LocationBasedFinderModule {}
