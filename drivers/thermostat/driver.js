'use strict';

const Homey = require('homey');
const API = require('../../lib/fritzAPI');
const BaseDriver = require( '../../lib/baseDriver' );
const LOG = require('../../lib/logWrapper' );

const ThermostatV0 = require('./deviceV0' );
const ThermostatV1 = require('./deviceV1' );

class ThermostatDriver extends BaseDriver
{
	onInit() {
		super.onInit();

		new Homey.FlowCardAction('activate_window_open_mode')
				.register()
				.registerRunListener(async (args) => {
					LOG.debug(`Triggering action activate_window_open_mode on ${args.my_device.getName()} for ${args.minutes} minutes`);
					if (args.my_device instanceof ThermostatV0) {
						return Promise.reject(Homey.__('DeviceNeedsRepair'));
					}
					return args.my_device.onMinutesLeftOpenWindow(args.minutes);
				});
		new Homey.FlowCardAction('deactivate_window_open_mode')
				.register()
				.registerRunListener(async (args) => {
					LOG.debug(`Triggering action deactivate_window_open_mode on ${args.my_device.getName()}`);
					if (args.my_device instanceof ThermostatV0) {
						return Promise.reject(Homey.__('DeviceNeedsRepair'));
					}
					return args.my_device.onMinutesLeftOpenWindow(0);
				});

		new Homey.FlowCardAction('activate_boost_mode')
				.register()
				.registerRunListener(async (args) => {
					LOG.debug(`Triggering action activate_boost_mode on ${args.my_device.getName()} for ${args.minutes} minutes`);
					if (args.my_device instanceof ThermostatV0) {
						return Promise.reject(Homey.__('DeviceNeedsRepair'));
					}
					return args.my_device.onMinutesLeftBoostActive(args.minutes);
				});
		new Homey.FlowCardAction('deactivate_boost_mode')
				.register()
				.registerRunListener(async (args) => {
					LOG.debug(`Triggering action deactivate_boost_mode on ${args.my_device.getName()}`);
					if (args.my_device instanceof ThermostatV0) {
						return Promise.reject(Homey.__('DeviceNeedsRepair'));
					}
					return args.my_device.onMinutesLeftBoostActive(0);
				});
	}

	GetFunctionmask()
	{
		return API.CONST_THERMOSTAT;
	}

	GetDeviceClass( version )
	{
		switch( version )
		{
			case 0:
				return ThermostatV0;
			case 1:
				return ThermostatV1
		}
		return ThermostatV1;
	}

	GetVersion()
	{
		return 1;
	}
}

module.exports = ThermostatDriver;
