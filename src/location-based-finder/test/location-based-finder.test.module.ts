import {
  DynamicModule,
  Inject,
  Logger,
  Module,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import * as crypto from 'crypto';
import 'dotenv/config';
import { computeDestinationPoint } from 'geolib';
import { Location } from 'src/location/location.entity';
import { LocationRepository } from 'src/location/location.repository';
import { LongLat } from 'src/shared/long-lang';
import { LocationBasedFinderRepository } from '../location-based-finder.abstract-repository';
import { LocationBasedFinderModule } from '../location-based-finder.module';
import {
  LOCATION_BASED_MODULE_TEST_CONFIG_TOKEN,
  LocationBasedModuleTestConfig,
} from './location-based.test-config-interface';
import { LocationSearchStrategy } from '../enum/search-strategy.enum';

@Module({
  imports: [LocationBasedFinderModule],
})
export class LocationBasedFinderTestModule implements OnApplicationBootstrap {
  private static searchStrategies = [
    LocationSearchStrategy.GEOHASH,
    LocationSearchStrategy.QUADTREE,
  ] as LocationSearchStrategy[];
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(LOCATION_BASED_MODULE_TEST_CONFIG_TOKEN)
    private readonly config: LocationBasedModuleTestConfig,
  ) {}

  static async init(
    config: LocationBasedModuleTestConfig,
  ): Promise<TestingModule> {
    this.setRandomSearchStrategy();

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        LocationBasedFinderTestModule.register(config),
      ],
    }).compile();

    return await module.init();
  }

  private static register(
    config: LocationBasedModuleTestConfig,
  ): DynamicModule {
    return {
      module: LocationBasedFinderTestModule,
      providers: [
        {
          provide: LOCATION_BASED_MODULE_TEST_CONFIG_TOKEN,
          useValue: config,
        },
      ],
    };
  }

  private static setRandomSearchStrategy() {
    const randomSearchStrategy =
      this.searchStrategies[
        Math.floor(Math.random() * this.searchStrategies.length)
      ];
    process.env.LOCATION_SEARCH_STRATEGY = randomSearchStrategy;

    const logger: Logger = new Logger(LocationBasedFinderTestModule.name);
    logger.log(`Search strategy: ${process.env.LOCATION_SEARCH_STRATEGY}`);
  }

  onApplicationBootstrap() {
    this.prepopulateRepos();
  }

  prepopulateRepos() {
    const locationSearchRepo =
      this.moduleRef.get<LocationBasedFinderRepository>(
        LocationBasedFinderRepository,
        { strict: false },
      );
    const locationRepository = this.moduleRef.get<LocationRepository>(
      LocationRepository,
      { strict: false },
    );

    const globalPoint = this.config.testPoint;

    const nearbyLocations = this.generateNearbyLocations({
      center: globalPoint,
      radiusInMeters: this.config.radiusInKm * 1000,
      count: this.config.nearbyLocationCount,
    });
    const locationsOutsideRadius = this.generateLocationsOutsideRadius(
      globalPoint,
      this.config.radiusInKm * 1000,
      this.config.radiusInKm * 10 * 1000,
      10,
    );

    const locations = [...nearbyLocations, ...locationsOutsideRadius];

    locations.forEach((longLat) => {
      const id = crypto.randomUUID();
      locationSearchRepo.addLocation(id, longLat);

      const location = new Location();
      Object.assign(location, {
        id,
        longLat,
        city: 'Test City',
        state: 'Test State',
        county: 'Test County',
      } as Partial<Location>);

      locationRepository.addLocation(location);
    });
  }

  generateNearbyLocations({
    center,
    radiusInMeters,
    count,
  }: {
    center: LongLat;
    radiusInMeters: number;
    count: number;
  }): LongLat[] {
    const locations = [];
    for (let i = 0; i < count; i++) {
      const bearing = Math.random() * 360;

      const distance = Math.random() * radiusInMeters;

      const { latitude, longitude } = computeDestinationPoint(
        { latitude: center.getLat(), longitude: center.getLong() },
        distance,
        bearing,
      );

      locations.push(
        new LongLat({
          longitude: longitude,
          latitude: latitude,
        }),
      );
    }

    return locations;
  }

  generateLocationsOutsideRadius(
    center: LongLat,
    minRadiusInMeters: number,
    maxDistanceInMeters: number,
    count: number,
  ): LongLat[] {
    const locations = [];
    for (let i = 0; i < count; i++) {
      const bearing = Math.random() * 360;
      const distance =
        Math.random() * (maxDistanceInMeters - minRadiusInMeters) +
        minRadiusInMeters;

      const { latitude, longitude } = computeDestinationPoint(
        { latitude: center.getLat(), longitude: center.getLong() },
        distance,
        bearing,
      );
      locations.push(
        new LongLat({
          longitude: longitude,
          latitude: latitude,
        }),
      );
    }
    return locations;
  }
}
