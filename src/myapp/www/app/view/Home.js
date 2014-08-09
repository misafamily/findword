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
			flex: 3,
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
					html: '',
					title: 'cauxxx'
				}]
			}, {
				xtype: 'label',
				cls: 'home-game-title',
				html: 'CÙNG CHƠI ĐOÁN CHỮ'
			}, {
				xtype: 'image',
				cls: 'home-logo',
				src: 'resources/images/Icon.png',
				width: 166,
				height: 166,
				mode: ''
			}]
		}, {
			xtype: 'container',
			width: '100%',
			cls: 'home-buttons',
			layout: {
				type: 'hbox',
				align: 'center',
				pack: 'center'
			},
			flex: 1,
			items: [{
				xtype: 'spacer',
				width: 57
			}, {
				xtype: 'button',
				cls: 'button-icon button-start',
				text: 'CHƠI',
				title: 'start'
			},  /*{
				xtype: 'label',
				cls: 'home-game-title option',
				html: 'THÔNG TIN'
			},*/ {
				xtype: 'container',
				layout: {
					type: 'hbox',
					align: 'center',
					pack: 'center'
				},
				
				style: {
					'margin-left': '20px'
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
		me.updateInfo();
		MyApp.app.on('gamedata_changed', me.updateInfo, me);
	},

	updateInfo: function() {
		var me = this;
		if (!me.levelLabel) me.levelLabel = me.down('label[title="cauxxx"]');

		me.levelLabel.setHtml('CÂU ' + AppUtil.LEVEL);
	}
});