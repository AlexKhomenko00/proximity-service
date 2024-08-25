import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { appConfig } from './config/app.config';
import { locationBasedConfig } from './config/location-based-finder.config';
import { LocationBasedFinderModule } from './location-based-finder/location-based-finder.module';
import { LocationModule } from './location/location.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    LocationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [locationBasedConfig, appConfig],
    }),
    LocationBasedFinderModule,
    EventEmitterModule.forRoot(),
  ],
})
export class AppModule {}
