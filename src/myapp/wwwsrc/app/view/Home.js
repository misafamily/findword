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
			width: '100%',
			layout: {
				type: 'vbox',
				align: 'center',
				pack: 'center'
			},
			items:[{
				xtype: 'container',
				//cls: 'home-logo',
				style: {
					'background-image': 'url(resources/images/Home_item1.png)',
					'width': '100%',
					'min-height': '100px',
					'height': '30%',
					'background-size': '100% 100%'
				}
			}, {
				xtype: 'spacer',
				flex: 1
			},{
				xtype: 'container',
				cls: 'home-level',
				layout: {
					type: 'vbox',
					align: 'center',
					pack: 'center'
				},
				style: {
					//'margin-top': '30px'
				},
				items:[{
					xtype: 'label',
					html: '',
					title: 'cauxxx'
				}]
			} , {
				xtype: 'spacer',
				flex: 1
			}, /* {
				xtype: 'label',
				cls: 'home-game-title',
				html: 'CÙNG CHƠI ĐOÁN CHỮ'
			},*/ {
				xtype: 'image',
				//cls: 'home-logo',
				src: 'resources/images/Home_item_txt.png',
				width: 191,
				height: 87,
				mode: '',
				style: {
					//'margin-bottom': '40px',
					//'margin-top': '40px'
				}
			}, {
				xtype: 'spacer',
				flex: 1
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
			flex: 1.5,
			items: [{
				xtype: 'spacer',
				flex: 1
			}, {
				xtype: 'button',
				cls: 'button-icon button-start',
				text: 'CHƠI',
				title: 'start'
			}, {
				xtype: 'spacer',
				flex: 1
			}, {
				xtype: 'button',
				cls: 'button-icon button-start',
				text: 'THÔNG TIN',
				title: 'info'
			}, {
				xtype: 'spacer',
				flex: 1
			}, {
				xtype: 'label',
				cls: 'home-game-title option',
				html: '(C) 2014 Joker Team v1.1',
				style: {
					'margin-bottom': '8px'
				}
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