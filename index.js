'use strict';
require('dotenv').config();
const googleMapsClient = require('@google/maps').createClient({
	key: process.env.GOOGLE_MAPS_API,
	Promise
});
const inquirer = require('inquirer');

const WIFI_RANGE_THRESHOLD_IN_M = 92;

/**
 * Divide SSID by letters and digits or letters or digits
 * @param {String} ssid Network identifier
 *
 * @returns {Array<String>} Array of tokens
 */
function tokenizeSsid(ssid) {
	return ssid.match(/[a-zA-Z]+\d+|[a-zA-Z]+|\d+/g);
}

/**
 * Ask user to choose from possible words in network name
 * @param {String} ssid Network identifier
 *
 * @returns {Object} User's answer
 */
async function askUserQueryFromSsid(ssid) {
	const choices = tokenizeSsid(ssid);
	const questions = [
		{
			type: 'list',
			name: 'answer',
			message: 'What is the name of the venue to search?',
			choices
		}
	];
	return inquirer.prompt(questions);
}

/**
 * Checks if at least one venue with given name is located within reach.
 * @param {String} keyword Name of venue to search for on Google Maps
 * @param {Object} location Keys include latitude and longitude
 * @param {Number} radius Range to search centered on location
 *
 * @returns {Boolean} True if at least one result found
 */
function nearbyVenues(keyword, location, radius = WIFI_RANGE_THRESHOLD_IN_M) {
	return googleMapsClient.placesNearby({
		keyword,
		radius,
		location: [location.latitude, location.longitude]
	})
		.asPromise()
		.then(response => {
			return response.json.results.length > 0;
		})
		.catch(err => {
			console.error(err);
			return false;
		});
}

/**
 * Checks if Wi-Fi network is in a reasonable geographic location.
 * @param {String} ssid Network identifier
 * @param {Object} location Current location with latitude and longitude
 *
 * @returns {Boolean} True if next venue with given name is located
 * within reasonable distance from location.
 */
async function geoWifi(ssid, location) {
	displayHeader(ssid, location);
	// Substring of SSID to validate geographic location
	const {answer} = await askUserQueryFromSsid(ssid);
	return nearbyVenues(answer, location);
}

module.exports = geoWifi;
module.exports.tokenizeSsid = tokenizeSsid;
module.exports.askUserQueryFromSsid = askUserQueryFromSsid;
module.exports.nearbyVenues = nearbyVenues;
