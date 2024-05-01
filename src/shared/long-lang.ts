interface RawLongLat {
  longitude: number;
  latitude: number;
}

export class LongLat {
  private readonly longitude: number;
  private readonly latitude: number;

  constructor({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }) {
    this.longitude = longitude;
    this.latitude = latitude;
  }

  public getLong(): number {
    return this.longitude;
  }

  public getLat(): number {
    return this.latitude;
  }

  public toRaw(): RawLongLat {
    return {
      longitude: this.longitude,
      latitude: this.latitude,
    };
  }
}
