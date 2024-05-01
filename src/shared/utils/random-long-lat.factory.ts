import { LongLat } from '../long-lang';

export function getRandomLongLat(): LongLat {
  const latitude = Math.random() * 180 - 90;
  const longitude = Math.random() * 360 - 180;
  return new LongLat({
    longitude,
    latitude,
  });
}
