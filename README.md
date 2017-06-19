## Satori-Cubism Client

Satori is a realtime platform for open-data. [https://satori.com](https://satori.com)

Cubism is a visualization library open-sourced by Square, [https://square.github.io/cubism/](https://square.github.io/cubism/)

## Implementation

This system is a bare bones Javascript and HTML implementation of charting Satori data from the [Rosett Home Satori Channel](https://www.satori.com/channels/rosetta-home) into Cubism Horizon and Comparison charts.

Once checked-out, copy example-config.js to config.js and update the variables in config.js.

Rosetta Home's data structure is the following

```
{
  timestamp: 1497903087662495700,
  measurement: "weather_station.outdoor_temperature",
  tags: {
    zipcode: "60626",
    type: "weather_station",
    node_id: "000000008b27b55d",
    id: "MeteoStick-MeteoStation-73",
    climate_zone: "6a"
  },
  fields: {
    value: 24.7
  }
```

It should be easy enough to update [index.html](https://github.com/rosetta-home/satori_cubism_client/blob/master/index.html#L42) and the [Horizon](https://github.com/rosetta-home/satori_cubism_client/blob/master/js/horizon.js#L20) and [Comparison](https://github.com/rosetta-home/satori_cubism_client/blob/master/js/comparison.js#L20) files to match your data structure.

## Gotchya's

Cubism is usually backed by a time-series database of some sort, this allows it to fill-in for data that's happened in the past. Because of Satori's realtime behavior, we don't have access to historical data on the order of hours and days. This dashboard is meant to run continually and will eventually `fill up` once enough time has past.
