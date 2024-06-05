'use strict';
'require form';
'require view';
'require uci';
'require fs';
'require tools.widgets as widgets';

return view.extend({
    load: function () {
        return Promise.all([
            uci.load('msd'),
        ]);
    },
    render: function (data) {
        let m, s, o;

        m = new form.Map('msd', _('msd'), _('msd is a program for organizing IPTV streaming on the network via HTTP.'));

        s = m.section(form.NamedSection, 'config', 'config');

        s.tab('basic', _('Basic Config'));

        o = s.taboption('basic', form.Flag, 'enabled', _('Enable'));
        o.rmempty = false;

        o = s.taboption('basic', form.Value, 'bind_address', _('Bind Address'));
        o.datatype = 'hostport';

        o = s.taboption('basic', widgets.DeviceSelect, 'bind_interface', _('Bind Interface'));
        o.optional = true;

        o = s.taboption('basic', widgets.DeviceSelect, 'source_interface', _('Source Interface'));

        s.tab('advanced', _('Advanced Config'));

        o = s.taboption('advanced', form.Value, 'thread_count', _('Thread Count'));
        o.datatype = 'uinteger';

        o = s.taboption('advanced', form.Flag, 'thread_bind_cpu', _('Thread Bind CPU'));
        o.rmempty = false;

        o = s.taboption('advanced', form.Flag, 'hub_use_polling_for_send', _('Use Polling For Send'));
        o.rmempty = false;

        o = s.taboption('advanced', form.Flag, 'hub_zero_copy_on_send', _('Zero Copy On Send'));
        o.rmempty = false;

        o = s.taboption('advanced', form.Flag, 'hub_wait_precache', _('Wait Precache'));
        o.rmempty = false;

        o = s.taboption('advanced', form.Value, 'hub_precache_size', _('Precache Size'));
        o.datatype = 'uinteger';

        o = s.taboption('advanced', form.Value, 'source_ring_buffer_size', _('Ring Buffer Size'));
        o.datatype = 'uinteger';

        o = s.taboption('advanced', form.Value, 'source_rejoin_time', _('Rejoin Time'));
        o.datatype = 'uinteger';

        return m.render();
    }
});
