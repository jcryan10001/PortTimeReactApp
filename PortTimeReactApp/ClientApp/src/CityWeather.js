export class CityWeather {
    city: string;
    region: string;
    country: string;
    localTime: Date;
    temperature: number;
    sunrise: Date;
    sunset: Date;
    flatData: FlatData;

    constructor(city, region, country, localTime, temperature, sunrise, sunset, flatData) {
        this.city = city;
        this.region = region;
        this.country = country;
        this.localTime = localTime;
        this.temperature = temperature;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.flatData = flatData;
    }
}

export class FlatData {
    currentData: CurrentData;
    astronomyData: AstronomyData;
}
export class CurrentData {
    location: Location[];
    current: Current[];
}
export class Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}
export class Current {
    last_updated: string;
    temp_c: number;
    last_updated_epoch: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}
export class AstronomyData {
    astronomies: Astronomy[];
}
export class Astronomy {
    astro: Astro;
}
export class Astro {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: number;
    is_sun_up: number;
}

