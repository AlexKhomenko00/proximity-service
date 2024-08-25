import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class FindNearbyLocationsDto {
  @IsLongitude()
  @ApiProperty({
    maximum: 180,
    minimum: -180,
    example: 180,
  })
  longitude: number;

  @IsLatitude()
  @ApiProperty({
    maximum: 90,
    minimum: -90,
    example: 90,
  })
  latitude: number;

  @ApiProperty({
    example: 50,
    description: 'The radius in kilometers to search for locations',
    maximum: 50,
    minimum: 1,
  })
  @IsNumber()
  @Max(50)
  @Min(1)
  radiusInKm: number;

  @IsNumber()
  @Max(100)
  @Min(1)
  @IsOptional()
  @ApiProperty({
    example: 10,
    description: 'The minimum number of locations to return',
    maximum: 50,
    minimum: 1,
    default: 10,
  })
  minimumDesiredLocationCount: number = 10;
}
