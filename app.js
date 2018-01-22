const yargs = require('yargs');

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

geocode.geocodeAddress(argv.a , (errorMessage, results) => {
	if(errorMessage){
		console.log(errorMessage);
	}else{
		console.log(JSON.stringify(results, undefined, 2));

		weathercode.weatherAddressRequest(results.latitute,results.longitute, (errorMessage, results) => {
			if(errorMessage)
			{
				console.log(errorMessage);
			}else{
				console.log(JSON.stringify(results, undefined, 2));
			}
		});
		
	}
});
