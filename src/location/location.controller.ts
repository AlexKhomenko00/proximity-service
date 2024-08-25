import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationRepository } from './location.repository';
import { LocationAddDto } from './add-location.dto';
import { LocationService } from './location.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  async getAllLocations() {
    return await this.locationRepository.getAllLocations();
  }

  @Post()
  async createLocation(@Body() dto: LocationAddDto) {
    return await this.locationService.createLocation(dto);
  }
}
