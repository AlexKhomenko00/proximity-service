import { Module } from '@nestjs/common';
import { LocationRepository } from './location.repository';

@Module({
  providers: [LocationRepository],
  exports: [LocationRepository],
})
export class LocationModule {}
