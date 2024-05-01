import { Injectable } from '@nestjs/common';
import { getDistance } from 'geolib';
import { Geohash } from 'src/geohashed-locations/geohash.value-object';
import { NearbyLocationsSearchPayload } from 'src/location-based-finder/interface/nearby-locations-search-payload.interface';
import { LocationBasedFinderRepository } from 'src/location-based-finder/location-based-finder.abstract-repository';
import { LongLat } from 'src/shared/long-lang';

class GeohashedLocation {
  locationId: string;
  geohash: Geohash;
}

@Injectable()
export class GeohashedLocationsRepository extends LocationBasedFinderRepository {
  private readonly geohashedLocations: GeohashedLocation[] = [];
  private readonly minPrecision = 1;

  public async addLocation(id: string, longLat: LongLat): Promise<void> {
    const geohash = Geohash.fromLongLat(longLat);

    this.geohashedLocations.push({ locationId: id, geohash });
  }

  /*
   * That's a very naive implementation.
   * Could and should be optimized to search expanding the neighbors list and not jumping into decreased precision.
   */
  public async getNearbyLocationIds({
    longLat,
    radiusInKm,
    minimumDesiredLocationCount = 10,
  }: NearbyLocationsSearchPayload): Promise<string[]> {
    let currentPrecision = this.getGeohashPrecisionForRadius(radiusInKm);
    let foundLocations: GeohashedLocation[] = [];

    while (
      foundLocations.length < minimumDesiredLocationCount &&
      currentPrecision > this.minPrecision
    ) {
      const searchedLocation = this.searchLocations(longLat, currentPrecision);

      foundLocations = this.filterLocationsByDistance(
        searchedLocation,
        longLat,
        radiusInKm,
      );

      if (foundLocations.length >= minimumDesiredLocationCount) {
        break;
      }

      // Decrease precision to broaden search
      currentPrecision--;
      const geohash = Geohash.fromLongLat(longLat, currentPrecision);
      const neighbors = Geohash.getNeighbors(geohash);

      let extendedSearchArea: string[] = [
        geohash.getValue(),
        ...neighbors.map((n) => n.getValue()),
      ];
      neighbors.forEach((neighbor) => {
        const moreNeighbors = Geohash.getNeighbors(neighbor);
        extendedSearchArea = extendedSearchArea.concat(
          moreNeighbors.map((n) => n.getValue()),
        );
      });

      const potentialLocations = this.geohashedLocations.filter((location) =>
        extendedSearchArea.some((neighborGeohash) =>
          location.geohash.getValue().startsWith(neighborGeohash),
        ),
      );

      foundLocations = this.filterLocationsByDistance(
        potentialLocations,
        longLat,
        radiusInKm,
      );
    }

    return foundLocations.map((location) => location.locationId);
  }

  private searchLocations(longLat, precision) {
    return this.geohashedLocations.filter((location) =>
      this.checkIfGeohashedLocationInRangeOfLongLat(
        location,
        longLat,
        precision,
      ),
    );
  }

  private filterLocationsByDistance(
    locations: GeohashedLocation[],
    longLat: LongLat,
    radiusInKm: number,
  ) {
    return locations.filter((location) => {
      const distance = getDistance(
        longLat.toRaw(),
        location.geohash.toLongLat().toRaw(),
      );

      return distance <= radiusInKm * 1000;
    });
  }

  private checkIfGeohashedLocationInRangeOfLongLat(
    location: GeohashedLocation,
    longLat: LongLat,
    precision?: number,
  ): boolean {
    return location.geohash
      .getValue()
      .startsWith(Geohash.fromLongLat(longLat, precision).getValue());
  }

  private getGeohashPrecisionForRadius(radiusInKm?: number): number {
    if (radiusInKm > 630) return 2;
    if (radiusInKm > 78) return 3;
    if (radiusInKm > 5) return 4;
    if (radiusInKm > 1) return 5;
    if (radiusInKm > 0.61) return 6;
    if (radiusInKm > 0.076) return 7;

    return 8;
  }
}
