import { Injectable, OnModuleInit } from '@nestjs/common';
import { Quadtree, QuadtreeLeaf } from 'd3-quadtree';
import { getDistance } from 'geolib';
import { NearbyLocationsSearchPayload } from 'src/location-based-finder/interface/nearby-locations-search-payload.interface';
import { LocationBasedFinderRepository } from 'src/location-based-finder/location-based-finder.abstract-repository';
import { LongLat } from 'src/shared/long-lang';

class QuadTreeLocation {
  locationId: string;
  longitude: number;
  latitude: number;
}

@Injectable()
export class QuadTreeRepository
  extends LocationBasedFinderRepository
  implements OnModuleInit
{
  private tree: Quadtree<QuadTreeLocation>;

  async onModuleInit() {
    const quadtree = await loadQuadTree();

    this.tree = quadtree<QuadTreeLocation>()
      .x((d) => d.longitude)
      .y((d) => d.latitude);
  }

  public async getNearbyLocationIds({
    radiusInKm,
    longLat,
  }: NearbyLocationsSearchPayload): Promise<string[]> {
    const result = [],
      x = longLat.getLong(),
      y = longLat.getLat(),
      radiusInMt = radiusInKm * 1000,
      accept = (d) => result.push(d);

    this.tree.visit((node, x1, y1, x2, y2) => {
      if (node.length) {
        return (
          x1 >= x + radiusInMt ||
          y1 >= y + radiusInMt ||
          x2 < x - radiusInMt ||
          y2 < y - radiusInMt
        );
      }

      const leafNode = node as QuadtreeLeaf<QuadTreeLocation>;
      const location = leafNode.data;
      const distance = getDistance(
        { longitude: x, latitude: y },
        { longitude: location.longitude, latitude: location.latitude },
      );

      if (distance <= radiusInMt) {
        do {
          accept(leafNode.data.locationId);
        } while ((node = leafNode.next));
      }
    });

    return result;
  }

  async addLocation(locationId: string, longLat: LongLat): Promise<void> {
    this.tree.add({
      locationId,
      longitude: longLat.getLong(),
      latitude: longLat.getLat(),
    });
  }
}

async function loadQuadTree() {
  const d3 = await import('d3-quadtree');

  return d3.quadtree;
}
