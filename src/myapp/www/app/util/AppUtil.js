Ext.define('MyApp.util.AppUtil', {
	alternateClassName : 'AppUtil',
	requires : ['MyApp.model.SavedVar','MyApp.view.AutoHideAlert', 'MyApp.view.pop.Alert', 'MyApp.view.pop.Confirm'],
	singleton : true,
	dbConnection : null,
	popupAdded: [],

	appVersion: '1.1',
	
	/*
		1.0: starting app
	*/
	
	constructor : function() {
		var me = this;
		me.getDbConnection();
		me.initLocalStorage();
		//me.initAppData();
		
	},

	initAppData: function(callback) {
		var me = this;

		if (me.APPVERSION != me.appVersion) {
			me.saveLocalVar('app_version', me.appVersion);
			var datastore = Ext.create('MyApp.store.InitAppData');
			var localstore = Ext.create('MyApp.store.Questions');
			datastore.getProxy().setUrl('resources/data/questions.json');
			datastore.load(function(records) {
				//console.log('records', records);
				localstore.load(function(localRecords){
					//console.log('localRecords', localRecords);
					if (localRecords.length < 1) {
						localstore.setData(records);
						localstore.sync({
							callback: function() {
								if (typeof callback == 'function') callback();
							}
						});
					} else {
						//check for new item
						Ext.each(records, function(dataitem, i) {
							var check = me.checkExist(dataitem, localRecords);						
							if (check) {
								if (check.data.name != dataitem.data.name) {
									check.data.name = dataitem.data.name;
									check.save();
								}
							} else {
								dataitem.save();
							}
						});

						if (typeof callback == 'function') callback();
					}
				});			
			});
		} else {
			if (typeof callback == 'function') callback();
		}
		
	},

	checkExist: function(model, localModels) {
		for (var j = 0; j < localModels.length; j++) {
			var item = localModels[j];
			if (item.data.uid == model.data.uid) {
				return item;
			}
		}
		return null;
	},

	initLocalStorage : function() {
		//this.log('initLocalStorage');
		var me = this;
		if (!me.localStore) {
			me.localStore = Ext.create('Ext.data.Store', {
				model : 'MyApp.model.SavedVar'
			});
		}

		me.localStore.load(function(records) {
			/*me.log('Local Vars: ');
			me.log(records);

			me.log(me.getLocalVar('hello'));*/
			//me.saveLocalVar('autologin', 'true');
			//me.saveLocalVar('autosync', 'true');
			me.initSettings();
		});

	},

	resetSettings: function() {
		var me = this;
		me.saveLocalVar('score', 20);
		me.saveLocalVar('level', 1);
		me.saveLocalVar('freetime', 1);

		me.APPVERSION = me.getLocalVar('app_version');
		me.SCORE = me.getLocalVar('score');
		me.LEVEL = me.getLocalVar('level');
		me.FREETIME = me.getLocalVar('freetime');
	},

	initSettings : function() {
		var me = this;
		if (!me.getLocalVar('app_version')) {
			me.saveLocalVar('app_version', '0.0');
		}
		if (!me.getLocalVar('score')) {
			me.saveLocalVar('score', 20);
		}
		if (!me.getLocalVar('level')) {
			me.saveLocalVar('level', 1);
		}
		if (!me.getLocalVar('freetime')) {
			me.saveLocalVar('freetime', 1);
		}
		
		me.APPVERSION = me.getLocalVar('app_version');
		me.SCORE = me.getLocalVar('score');
		me.LEVEL = me.getLocalVar('level');
		me.FREETIME = me.getLocalVar('freetime');
	},

	save: function() {
		var me = this;
		me.saveLocalVar('score', me.SCORE);
		me.saveLocalVar('level', me.LEVEL);
	},

	getLocalVar : function(name) {
		var me = this;
		var m = me.localStore.findRecord('name', name);
		if (m)
			return m.data.value;
		return null;
	},

	saveLocalVar : function(name, value) {
		var me = this;
		var m = me.localStore.findRecord('name', name);
		if (m) {
			m.data.value = value;
			m.save();
		} else {
			m = new MyApp.model.SavedVar({
				name : name,
				value : value
			});
			me.localStore.add(m);

			m.save();
		}
	},

	getDbConnection : function() {
		var me = this;
		if (!me.dbConnection) {
			var dbconnval = {
				dbName : "babateam-findword",
				dbDescription : "babateam findword database"
			};
			me.dbConnection = Ext.create('MyApp.util.offline.Connection', dbconnval);
			//me.offline = Ext.create('MyApp.util.offline.Data', {});
		}
		return me.dbConnection;
	},
	
	alert: function(msg, title) {
		var me = this;
		title = title || '';

		if (!me._popAlert) me._popAlert = Ext.create('MyApp.view.pop.Alert');
        Ext.Viewport.add(me._popAlert);
        me._popAlert.showMe(msg, title);
		/*
		var alert = Ext.Msg.alert(title, msg, function() {
			//me.popupAdded.pop();
			//MyApp.app.fireEvent(AppConfig.eventData.APP_UNMASK);
		});*/
		//this.popupAdded.push(alert);
		//MyApp.app.fireEvent(AppConfig.eventData.APP_MASK);
	},

	autoAlert: function (msg) {
       var me = this;
       if (!me._autoHideAlert) me._autoHideAlert = Ext.create('MyApp.view.AutoHideAlert');
       Ext.Viewport.add(me._autoHideAlert);
       me._autoHideAlert.setMessage(msg);
       me._autoHideAlert.showMe();
    },

	confirm: function(msg, title, callback) {
		var me = this;
    	
		if (!me._confirmAlert) me._confirmAlert = Ext.create('MyApp.view.pop.Confirm');
		Ext.Viewport.add(me._confirmAlert);
        me._confirmAlert.showMe(msg, title, callback);
		/*
    	var alert = Ext.Msg.confirm(title, msg, function(code){
    		//me.popupAdded.pop();
    		//MyApp.app.fireEvent(AppConfig.eventData.APP_UNMASK);
    		if (code == 'yes') 
    			if (typeof callback === 'function') callback();
    	});
		*/
    	//this.popupAdded.push(alert);
    	//MyApp.app.fireEvent(AppConfig.eventData.APP_MASK);
    },

    showLoading: function (msg) {
    	msg = msg || 'Tải dữ liệu..';
        Ext.Viewport.mask({ xtype: 'loadmask', message: msg });
        Ext.Viewport.setMasked(true);
    },

    hideLoading: function () {
        Ext.Viewport.unmask();
    }
}); 