'use strict';
'require form';
'require view';

return view.extend({
	render() {
		let m, s, o;

		m = new form.Map('phy_thermal', _('Port cooling'),
			_('A hot Ethernet PHY links one speed lower until it cools: 10G, 5G, 2.5G, never below 1G. ' +
			  'Each step renegotiates the link, which drops the port for a few seconds. ' +
			  'The trip point follows each PHY\'s own warning temperature.'));

		s = m.section(form.NamedSection, 'global', 'global');

		o = s.option(form.Flag, 'enabled', _('Enable'));
		o.rmempty = false;

		o = s.option(form.Value, 'offset', _('Trip below the warning point (°C)'),
			_('The step-down starts this many degrees below the PHY\'s warning temperature.'));
		o.datatype = 'range(0,30)';
		o.placeholder = '5';
		o.depends('enabled', '1');

		o = s.option(form.Value, 'hysteresis', _('Hysteresis (°C)'),
			_('A speed step comes back this many degrees below the trip point.'));
		o.datatype = 'range(2,30)';
		o.placeholder = '10';
		o.depends('enabled', '1');

		o = s.option(form.Value, 'hold', _('Minimum time between steps (s)'));
		o.datatype = 'range(10,3600)';
		o.placeholder = '60';
		o.depends('enabled', '1');

		s = m.section(form.TableSection, 'port', _('Ports'));
		s.anonymous = false;
		s.addremove = false;

		o = s.option(form.Flag, 'enabled', _('Step down when hot'));
		o.rmempty = false;
		o.default = '1';

		return m.render();
	}
});
