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
			}
		}

	}
});
