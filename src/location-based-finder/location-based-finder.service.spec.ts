import { TestingModule } from '@nestjs/testing';
import { getDistance } from 'geolib';
import { LongLat } from '../shared/long-lang';
import { getRandomLongLat } from '../shared/utils/random-long-lat.factory';
import { LocationBasedFinderService } from './location-based-finder.service';
import { LocationBasedFinderTestModule } from './test/location-based-finder.test.module';
import { LocationBasedModuleTestConfig } from './test/location-based.test-config-interface';

describe('LocationBasedFinderService', () => {
  const RADIUS_IN_KM = 10;
  const NEARBY_LOCATION_COUNT = 10;
  const testLongLat: LongLat = getRandomLongLat();

  let service: LocationBasedFinderService;

  beforeEach(async () => {
    const config: LocationBasedModuleTestConfig = {
      testPoint: testLongLat,
      radiusInKm: RADIUS_IN_KM,
      nearbyLocationCount: NEARBY_LOCATION_COUNT,
    };

    const module: TestingModule =
      await LocationBasedFinderTestModule.init(config);

    service = module.get<LocationBasedFinderService>(
      LocationBasedFinderService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.LOCATION_SEARCH_STRATEGY;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should return nearby locations when given a location's longLat", async () => {
    const nearbyLocations = await service.getNearbyLocations({
      longLat: testLongLat,
      radiusInKm: RADIUS_IN_KM,
      minimumDesiredLocationCount: NEARBY_LOCATION_COUNT,
    });

    expect(Array.isArray(nearbyLocations)).toBeTruthy();
  });

  it('should return a pre-generated nearby locations count', async () => {
    const nearbyLocations = await service.getNearbyLocations({
      longLat: testLongLat,
      radiusInKm: RADIUS_IN_KM,
      minimumDesiredLocationCount: NEARBY_LOCATION_COUNT,
    });

    expect(nearbyLocations.length).toBe(NEARBY_LOCATION_COUNT);
  });

  it('each returned location should be within the given radius', async () => {
    const nearbyLocations = await service.getNearbyLocations({
      longLat: testLongLat,
      radiusInKm: RADIUS_IN_KM,
      minimumDesiredLocationCount: NEARBY_LOCATION_COUNT,
    });

    nearbyLocations.forEach((location) => {
      const locationLongLat = location.longLat;
      const distance = getDistance(
        { longitude: testLongLat.getLong(), latitude: testLongLat.getLat() },
        {
          longitude: locationLongLat.getLong(),
          latitude: locationLongLat.getLat(),
        },
      );

      expect(distance).toBeLessThanOrEqual(RADIUS_IN_KM * 1000);
    });
  });
});
