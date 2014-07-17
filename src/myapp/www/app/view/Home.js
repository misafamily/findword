Ext.define('MyApp.view.Home', {
	extend: 'Ext.Container',
	xtype: 'home',
	config: {
		cls: 'home',
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'center'
		},
		items: [{
			xtype: 'button',
			cls: 'button-icon button-start',
			text: 'CHƠI',
			title: 'start'
		}]
	}
});