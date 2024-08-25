import { Module } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  providers: [LocationRepository, LocationService],
  exports: [LocationRepository],
  controllers: [LocationController],
})
export class LocationModule {}
