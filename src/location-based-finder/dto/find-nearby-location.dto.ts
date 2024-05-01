import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  Max,
} from 'class-validator';

export class FindNearbyLocationsDto {
  @IsLongitude()
  longitude: number;

  @IsLatitude()
  latitude: number;

  @IsNumber()
  radiusInKm: number;

  @IsNumber()
  @Max(50)
  @IsOptional()
  minimumDesiredLocationCount: number = 10;
}
