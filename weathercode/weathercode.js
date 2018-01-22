const request = require('request');

const apiKey = 'b25726219b6e7748047a44c1e8250c81';

var weatherAddressRequest = (latitute, longitute,callback) => {
	console.log('----Weather Information-----');
	request({
		url: `https://api.darksky.net/forecast/${apiKey}/${latitute},${longitute}`,
		json: true
	}, (error, response,body) => {
		if(!error && response.statusCode === 200){
			callback(undefined, {
				temperature : body.currently.temperature,
				apparentTempreratue: body.currently.apparentTemperature
			});
		}else{
			callback('Unable to fetch weathe');
		}
	})
};

module.exports.weatherAddressRequest = weatherAddressRequest;
// module.exports = {
// 	weatherAddressRequest
// }