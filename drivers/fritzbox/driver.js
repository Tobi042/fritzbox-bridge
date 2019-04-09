'use strict';

const Homey = require( 'homey' );
const API = require('../../lib/fritzAPI');
const BaseDriver = require( '../../lib/baseDriver' );
const LOG = require('../../lib/logWrapper' );


class FritzboxDriver extends BaseDriver
{
	GetFunctionmask()
	{
		return -1;
	}

	onPairListDevices( data, callback )
	{
		if( Homey.ManagerSettings.get( 'validation' ) !== 1 )
		{
			callback( new Error( 'Invalid login - cant request device list' ) );
			return;
		}

		LOG.debug( 'request fritzbox device' );

		API.Get().getOverviewData().then( function( data )
		{
			callback( null, [{
				name: 'Fritzbox',
				data: { id: 'fritzbox' }
			}] );
		}.bind( this ) ).catch( function( error )
		{
			LOG.debug( 'failed to load fritzbox: ' + error );
			callback( new Error( 'failed to load fritzbox' ) );
		} );
	}
}

module.exports = FritzboxDriver;