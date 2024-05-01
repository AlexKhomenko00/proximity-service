import * as geohash from 'ngeohash';
import { LongLat } from '../shared/long-lang';

export class Geohash {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public toLongLat(): LongLat {
    const { latitude, longitude } = geohash.decode(this.value);
    return new LongLat({
      longitude,
      latitude,
    });
  }

  public static fromLongLat(longLat: LongLat, precision?: number): Geohash {
    return new Geohash(
      geohash.encode(longLat.getLat(), longLat.getLong(), precision),
    );
  }

  public static getNeighbors(hash: Geohash): Geohash[] {
    const neighbors = geohash.neighbors(hash.getValue());

    const neighboringGeohashes = neighbors.map(
      (neighbor) => new Geohash(neighbor),
    );

    return neighboringGeohashes;
  }
}
