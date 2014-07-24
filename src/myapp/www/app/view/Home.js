Ext.define('MyApp.view.Home', {
	extend: 'Ext.Container',
	xtype: 'home',
	config: {
		cls: 'home',
		layout: {
			type: 'vbox',
			align: 'center',
			pack: 'center'
		},
		items: [{
			xtype: 'container',
			flex: 2,
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			items:[{
				xtype: 'container',
				cls: 'home-level',
				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},
				style: {
					'margin-top': '30px'
				},
				items:[{
					xtype: 'label',
					html: 'CÂU XXX'
				}]
			}, {
				xtype: 'label',
				cls: 'home-game-title',
				html: 'CÙNG CHƠI ĐOÁN CHỮ'
			}, {
				xtype: 'image',
				cls: 'home-logo',
				src: 'resources/images/Icon.png',
				width: 146,
				height: 146,
				mode: ''
			}]
		}, {
			xtype: 'container',
			width: '100%',
			cls: 'home-buttons',
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			flex: 1,
			items: [{
				xtype: 'button',
				cls: 'button-icon button-start',
				text: 'CHƠI',
				title: 'start'
			},  {
				xtype: 'label',
				cls: 'home-game-title option',
				html: 'TÙY CHỌN'
			}, {
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'center',
					pack: 'center'
				},
				items:[{
					xtype: 'button',
					cls: 'button-icon button-info',
					title: 'info'
				}]
			}]
		}]
	},

	initialize: function() {
		var me = this;
		me.callParent(arguments);
	}
});