import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { LongLatDto } from 'src/shared/long-lang.dto';

export class LocationAddDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ValidateNested()
  @Type(() => LongLatDto)
  longLat: LongLatDto;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  city: string;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  state: string;

  @IsString()
  @MinLength(3)
  @MaxLength(10)
  county: string;
}
