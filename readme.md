# geo-wifi [![Build Status](https://travis-ci.com/rodrigobdz/geo-wifi.svg?branch=master)](https://travis-ci.com/rodrigobdz/geo-wifi)

> Check if Wi-Fi network is located in a reasonable geographic location

## Install

```sh
$ npm install geo-wifi
```

## Usage

```js
const geoWifi = require('geo-wifi');

// Returns true if RestaurantXYZ is located near the location specified
geoWifi('RestaurantXYZ Hotspot', {latitude: 0.0, longitude: 0.0});
//=> true
```

## API

### geoWifi(ssid, location)

#### ssid

Type: `string`

Service Set Identifier (SSID).

#### location

Type: `Object`

Current location of user specified with latitude and longitude.

## Credits

* [generator-lnm](https://github.com/rodrigobdz/generator-lnm) - Awesome node module generator

## License

[MIT](license) © [Rodrigo Bermudez Schettino](https://rodrigobdz.github.io)
