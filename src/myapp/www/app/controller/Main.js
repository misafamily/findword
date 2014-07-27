Ext.define('MyApp.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			main: 'main',
			home: 'home',
			game: 'game'
		},

		control: {
			'home button[title="start"]': {
				tap: function() {
					var me = this;
					me.getMain().setActiveItem(me.getGame());
					MyApp.app.fireEvent('start_game');
				}
			},

			'home button[title="info"]': {
				tap: function() {
					var me = this;
					AppUtil.alert(Ext.util.Format.format('CÙNG CHƠI ĐOÁN CHỮ<br/>Phiên bản {0}<br/>Liên hệ: admin@gmail.com<br/>@Ninja Team, 2014', AppUtil.appVersion), 'THÔNG TIN');
				}
			},

			'game button[title="back"]': {
				tap: function() {
					var me = this;
					me.getMain().setActiveItem(me.getHome());
					MyApp.app.fireEvent('go_home');
				}
			}
		}

	},

	initialize: function() {
		var me = this;
	}
});
