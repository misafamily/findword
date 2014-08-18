Ext.define('MyApp.util.AppUtil', {
	alternateClassName : 'AppUtil',
	requires : ['MyApp.model.SavedVar','MyApp.view.AutoHideAlert', 
				'MyApp.view.pop.Alert', 'MyApp.view.pop.Confirm',
				'MyApp.view.pop.Congrate', 'MyApp.view.pop.Gameover','MyApp.view.pop.GameIntro',
				'MyApp.view.pop.Gift'],
	singleton : true,
	dbConnection : null,
	popupAdded: [],
	isFirstLoad: true,

	appVersion: '1.0 (17/08/2014)',
	/*
		1.0 (17/08/2014): v1


	*/
	allQuestions: [],
	
	/*
		1.0: starting app
	*/
	
	constructor : function() {
		var me = this;
		me.getDbConnection();
		me.initLocalStorage();
		//me.initAppData();
		me.fbLogin = null;
	},

	initAppData: function(callback) {
		var me = this;

		if (me.APPVERSION != me.appVersion) {
			me.saveLocalVar('app_version', me.appVersion);
			var datastore = Ext.create('MyApp.store.InitAppData');
			var localstore = Ext.create('MyApp.store.Questions');
			localstore.changeQueryByType('all');
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
							//console.log('check: ', check);					
							if (check) {
								//if (check.data.word != dataitem.data.word || ) {
									check.data = dataitem.data;
									check.save();
								//}
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
			//console.log('item.data.uid.toString(): ', item.data.uid.toString());
			//console.log('model.data.uid.toString(): ', model.data.uid.toString());
			if (item.data.uid.toString() == model.data.uid.toString()) {
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
		me.saveLocalVar('opentime', 3);
		me.saveLocalVar('showhelp', false);
		me.saveLocalVar('openinganswer', []);
		me.saveLocalVar('closeselection', []);
		me.saveLocalVar('gamestate', 'new');//new, end, playing

		me.APPVERSION = me.getLocalVar('app_version');
		me.SCORE = me.getLocalVar('score');
		me.LEVEL = me.getLocalVar('level');
		me.FREETIME = me.getLocalVar('freetime');
		me.OPENTIME = me.getLocalVar('opentime');
		me.OPENINGANSWER = me.getLocalVar('openinganswer');
		me.CLOSESELECTION = me.getLocalVar('closeselection');
		me.GAMESTATE = me.getLocalVar('gamestate');

		me.save();
	},

	initSettings : function() {
		var me = this;
		if (!me.getLocalVar('app_version')) {
			me.saveLocalVar('app_version', '0.0');
		}
		if (!me.getLocalVar('showhelp')) {
			me.saveLocalVar('showhelp', false);
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
		if (!me.getLocalVar('opentime')) {
			me.saveLocalVar('opentime', 3);
		}

		//game data to store and load
		if (!me.getLocalVar('openinganswer')) {
			me.saveLocalVar('openinganswer', []);
		}
		if (!me.getLocalVar('closeselection')) {
			me.saveLocalVar('closeselection', []);
		}
		if (!me.getLocalVar('gamestate')) {
			me.saveLocalVar('gamestate', 'new');//new, end, playing
		}
		//me.saveLocalVar('gamestate', 'new');//new, end, playing
		//me.saveLocalVar('score', 30);
		
		me.APPVERSION = me.getLocalVar('app_version');
		me.SCORE = me.getLocalVar('score');
		me.LEVEL = me.getLocalVar('level');
		me.FREETIME = me.getLocalVar('freetime');
		me.OPENTIME = me.getLocalVar('opentime');
		me.OPENINGANSWER = me.getLocalVar('openinganswer');
		me.CLOSESELECTION = me.getLocalVar('closeselection');
		me.GAMESTATE = me.getLocalVar('gamestate');
	},

	save: function() {
		var me = this;
		me.saveLocalVar('score', me.SCORE);
		me.saveLocalVar('level', me.LEVEL);
		me.saveLocalVar('freetime', me.FREETIME);
		me.saveLocalVar('opentime', me.OPENTIME);

		MyApp.app.fireEvent('gamedata_changed');
	},

	saveGameState: function() {
		var me = this;
		me.saveLocalVar('openinganswer', me.OPENINGANSWER);
		me.saveLocalVar('closeselection', me.CLOSESELECTION);
		me.saveLocalVar('gamestate', me.GAMESTATE);
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

	congrate: function(question, callback) {
		var me = this;
		//title = title || '';

		if (!me._popCongrate) me._popCongrate = Ext.create('MyApp.view.pop.Congrate');
        Ext.Viewport.add(me._popCongrate);
        me._popCongrate.showMe(question, callback);
	},

	gameover: function() {
		var me = this;
		//title = title || '';

		if (!me._popGameover) me._popGameover = Ext.create('MyApp.view.pop.Gameover');
        Ext.Viewport.add(me._popGameover);
        me._popGameover.showMe();
	},

	gameintro: function() {
		var me = this;
		//title = title || '';

		if (!me._popGameintro) me._popGameintro = Ext.create('MyApp.view.pop.GameIntro');
        Ext.Viewport.add(me._popGameintro);
        me._popGameintro.showMe();
	},

	gift: function(callback) {
		var me = this;
		//title = title || '';

		if (!me._popGift) me._popGift = Ext.create('MyApp.view.pop.Gift');
        Ext.Viewport.add(me._popGift);
        me._popGift.showMe(callback);
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
    	msg = msg || 'Tải dữ liệu ..';
        Ext.Viewport.mask({ xtype: 'loadmask', message: msg });
        Ext.Viewport.setMasked(true);
    },

    hideLoading: function () {
        Ext.Viewport.unmask();
    },

    shareFBToAsk: function(msg, imageurl) {

    	//console.log('shareFBToAsk ', msg, imageurl);
    	//AppUtil.alert('Chia sẻ Facebook thành công.', 'Cùng Chơi Đoán Chữ');
    	var me = this;
    	//me.showLoading('Chia sẻ Facebook ..');
    	 /*window.plugins.socialsharing.shareViaFacebook(msg, 
		    								imageurl ,
		    								null ,
		    								function(rs) {
		    									alert(rs);
		    									AppUtil.alert('Chia sẻ Facebook thành công.', 'Cùng Chơi Đoán Chữ');
		    								}, 
		    								function(errormsg){
		    									//alert(errormsg)
		    									AppUtil.alert('Không tìm thấy app Facebook trên thiết bị. Hãy cài đặt để chia sẻ với bạn bè và người thân.', 'Cùng Chơi Đoán Chữ');
		    								}
		    );*/
    	if (navigator.screenshot) {
    		navigator.screenshot.save(function(error,res){
    			//me.hideLoading();
			  if(error){
			    AppUtil.alert('Không thể capture screenshot', 'Lỗi');
			  }else{
			    //AppUtil.alert('share ok: ' + res.filePath); //should be path/to/myScreenshot.jpg
			    me.currentImagePath = 'file:///' + res.filePath;
			    //login to fb
			    //if (!me.fbLogin)
			    window.plugins.socialsharing.shareViaFacebook(msg, 
			    								'file:///' + res.filePath , 
			    								null , 
			    								function(rs) {
		    										//alert(rs);
			    									//AppUtil.alert('Chia sẻ Facebook thành công.', 'Cùng Chơi Đoán Chữ');
			    								}, 
			    								function(errormsg){
			    									//alert(errormsg)
			    									AppUtil.alert('Không tìm thấy app Facebook trên thiết bị. Hãy cài đặt để chia sẻ với bạn bè và người thân.', 'Cùng Chơi Đoán Chữ');
			    								}
			    );
			    //else
			  }
			},'jpg',90,'cungchoidoanchu');
    	}
    	
    },

    loginFB: function() {
    	var me = this;
    	/*if (!window.cordova) {
            var appId = prompt("Enter FB Application ID", "");
            facebookConnectPlugin.browserInit(appId);
        }*/
        facebookConnectPlugin.login( ["email"], 
            function (response) { 
            	//alert(JSON.stringify(response)) 
            	me.fbToken = response.authResponse.accessToken;
            	//me.fbLogin = response;//Ext.decode(JSON.stringify(response)); //{authResponse: {userID, accessToker, sess}}
            	me.showDialog();
            },
            function (response) { 
            	//alert(JSON.stringify(response)) 
            	AppUtil.alert('Kết nối mạng thất bại.', 'Facebook');
            });
    },

    getStatus: function () { 
    	var me = this;
        facebookConnectPlugin.getLoginStatus(
	        function (status) {
	            //alert("current status: " + JSON.stringify(status));
	            if (status.authResponse) {
	            	if (status.authResponse.accessToken) me.fbToken = status.authResponse.accessToken;
	            }
	            
	            if (status.status == 'connected' && me.fbToken) {
	            	me.showDialog();
	            } else {
	            	me.loginFB();
	            }

	            
	        }
	    );
    },

    showDialog: function () { 
    	var me = this;
    	//AppUtil.alert('showDialog', 'Facebook');
        facebookConnectPlugin.showDialog( { method: "feed"/*, picture: me.currentImagePath*/ }, 
            function (response) { 
            	//alert(JSON.stringify(response)) 
            	AppUtil.alert('Đăng thành công.', 'Facebook');
            },
            function (response) { 
            	//alert(JSON.stringify(response)) 
            	//AppUtil.alert('Kết nối mạng thất bại.', 'Facebook');
            	//AppUtil.alert('Đăng nhập thất bại.', 'Facebook');
            });
		/*var params = {
		        message: 'Cùng Chơi Đoán Chữ - Mình bị bí câu này, mọi người giúp mình nào ^^',
		        access_token: me.fbToken, // response.authResponse.accessToken
		        url: me.currentImagePath
	    	};
	    alert(JSON.stringify(params));
		facebookConnectPlugin.api( '/photos', 'post', params, function (response) {
		        if (!response || response.error) {
		            alert('Error!' + response.error.message);
		        } else {
		            alert('Photo Posted');
	        	}

	    	});*/
    }   
}); 