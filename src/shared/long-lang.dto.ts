import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class LongLatDto {
  @ApiProperty({
    maximum: 180,
    minimum: -180,
    example: 180,
  })
  @IsLongitude()
  longitude: number;

  @ApiProperty({
    maximum: 90,
    minimum: -90,
    example: 90,
  })
  @IsLatitude()
  latitude: number;
}
