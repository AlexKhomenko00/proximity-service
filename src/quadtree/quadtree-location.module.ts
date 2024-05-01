import { Module, Provider } from '@nestjs/common';
import { LocationBasedFinderRepository } from 'src/location-based-finder/location-based-finder.abstract-repository';
import { QuadTreeRepository } from './quadtree.repository';

const repoProvider: Provider<LocationBasedFinderRepository> = {
  provide: LocationBasedFinderRepository,
  useClass: QuadTreeRepository,
};

@Module({
  providers: [repoProvider, QuadTreeRepository],
  exports: [repoProvider, QuadTreeRepository],
})
export class QuadtreeLocationModule {}
