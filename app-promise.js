const yargs = require('yargs');
const axios = require('axios');

const geocode = require('./geocode/geocode');
const weathercode = require('./weathercode/weathercode');

const argv = yargs
	.options({
		a: {
			demand:true,
			alias: 'address',
			describe: 'Address for fecth the weather',
			string: true
		}
	})
	.help()
	.alias('help','h')
	.argv;

var encodeAddress = encodeURIComponent(argv.address);
var geocodeUrl =`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(geocodeUrl).then( (response) => {
	if(response.data.status === 'ZERO_RESULTS')
		throw new Error('Unable to find that address');
	var latitute = response.data.results[0].geometry.location.lat;
	var longitute = response.data.results[0].geometry.location.lng;
	var apiKey = 'b25726219b6e7748047a44c1e8250c81';
	var weatherUrl = `https://api.darksky.net/forecast/${apiKey}/${latitute},${longitute}`;
	console.log(response.data.results[0].formatted_address);
	return axios.get(weatherUrl);
})
.then( (response) => {
	var temperature = response.data.currently.temperature;
	var apparentTemperature = response.data.currently.apparentTemperature;
	console.log(` It's currently ${temperature}. It feels like ${apparentTemperature}.`);
})
.catch( (error) => {
	if(error.code === 'ENOTFOUND'){
		console.log('Unable to connect to server');
	}else{
		console.log(error.message);
	}
});