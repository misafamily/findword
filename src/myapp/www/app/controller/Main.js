Ext.define('MyApp.controller.Main', {
	extend: 'Ext.app.Controller',

	config: {
		refs: {
			main: 'main',
			home: 'home',
			game: 'game'
		},

		control: {
			'main': {
				initialize: function() {
					var me = this;
					//me.callParent(arguments);
					//MyApp.app.on('start_game', me.onStartGame, me);
					me.onExiting = false;
					MyApp.app.on('go_home', me.onGoHome, me);
					MyApp.app.on('backbutton', me.onBackButtonTap, me);
				},
			},

			'home button[title="start"]': {
				tap: function() {
					var me = this;
					//var questionStore = Ext.getStore('Questions');
					if (AppUtil.allQuestions.length > 0)
						me.onStartGame();
					else
						AppUtil.gameover();
				}
			},

			'home button[title="info"]': {
				tap: function() {
					var me = this;
					AppUtil.alert(Ext.util.Format.format('CÙNG CHƠI ĐOÁN CHỮ<br/>Phiên bản {0}<br/>Email: jokerteamorg@gmail.com<br/>(C)Joker Team.', AppUtil.appVersion), 'THÔNG TIN');
				}
			},

			'game button[title="back"]': {
				tap: function() {
					var me = this;
					//me.getMain().setActiveItem(me.getHome());
					MyApp.app.fireEvent('go_home');
				}
			}
		}

	},

	onBackButtonTap: function() {
		var me = this;
		if (me.onExiting) {
			try {
				navigator.app.exitApp();
			} catch(e) {
				AppUtil.alert('no function navigator.app.exitApp()');
			}
			
		} else {
			AppUtil.autoAlert('Nhấn lần nữa để thoát<br/>Xin chào và hẹn gặp lại');
			me.onExiting = true;

			Ext.defer(function() {
				me.onExiting = false;
			},2000);
		}			
			
		
	},

	onStartGame: function() {
		var me = this;
		//console.log('onStartGame');
		me.getMain().setActiveItem(me.getGame());
		MyApp.app.fireEvent('start_game');
	},

	onGoHome: function() {
		var me = this;
		//console.log('onGoHome');
		me.getMain().setActiveItem(me.getHome());
	}
});
