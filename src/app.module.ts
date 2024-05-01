import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationBasedFinderModule } from './location-based-finder/location-based-finder.module';
import { LocationModule } from './location/location.module';
import { locationBasedConfig } from './config/location-based-finder.config';

@Module({
  imports: [
    LocationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [locationBasedConfig],
    }),
    LocationBasedFinderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
