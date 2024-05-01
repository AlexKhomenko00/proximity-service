import { Module } from '@nestjs/common';
import 'dotenv/config';
import { LocationModule } from 'src/location/location.module';
import { LocationBasedFinderController } from './location-based-finder.controller';
import { LocationBasedFinderService } from './location-based-finder.service';
import { ConditionalModule } from '@nestjs/config';
import { GeohashedLocationsModule } from 'src/geohashed-locations/geohashed-locations.module';
import { LocationSearchStrategy } from './enum/search-strategy.enum';
import { QuadtreeLocationModule } from 'src/quadtree/quadtree-location.module';

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
  providers: [LocationBasedFinderService],
  controllers: [LocationBasedFinderController],
})
export class LocationBasedFinderModule {}
