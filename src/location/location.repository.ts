import { Injectable } from '@nestjs/common';
import { Location } from './location.entity';

@Injectable()
export class LocationRepository {
  private readonly locations: Location[] = [];

  public async getAllLocations(): Promise<Location[]> {
    return this.locations;
  }

  public async getLocationById(id: string): Promise<Location | undefined> {
    return this.locations.find((location) => location.id === id);
  }

  public async getLocationsByIds(ids: string[]): Promise<Location[]> {
    return this.locations.filter((location) => ids.includes(location.id));
  }

  public async addLocation(location: Location): Promise<void> {
    this.locations.push(location);
  }
}
