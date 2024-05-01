import { LongLat } from 'src/shared/long-lang';

export const LOCATION_BASED_MODULE_TEST_CONFIG_TOKEN =
  'LOCATION_BASED_MODULE_TEST_CONFIG_TOKEN';

export interface LocationBasedModuleTestConfig {
  radiusInKm: number;
  nearbyLocationCount: number;
  testPoint: LongLat;
}
