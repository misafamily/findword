Ext.define('MyApp.view.Game', {
	extend: 'Ext.Container',
	xtype: 'game',
	config: {
		cls: 'game',
		flex: 1,
		layout: {
			type: 'vbox',
			pack: 'center',
			align: 'center'
		},
		items: [{
			xtype: 'container',
			cls: 'game-topbar'
		}, {
			xtype: 'container',
			cls: 'game-pic',
			flex: 1,
		}, {
			xtype: 'container',			
			cls: 'game-word',
			layout: {
				type: 'vbox',
				pack: 'center',
				align: 'center'
			},
			items:[{
				xtype: 'container',
				name: 'qcontainer1',
				width:'100%',
				style: {
					'margin-bottom': '5px'
				},
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'center'
				},
				defaults: {
					baseCls: 'button-question'
				},
				items:[/*{
					xtype: 'button',
					text: 'J',
					cls: 'open'
				}*/]
			}, {
				xtype: 'container',
				width:'100%',
				name: 'qcontainer2',
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'center'
				},
				defaults: {
					baseCls: 'button-question'
				},
				items:[]
			}]
		}, {
			xtype: 'container',
			cls: 'game-answer',
			layout: {
				type: 'vbox',
				pack: 'center',
				align: 'center'
			},
			items:[{
				xtype: 'container',
				name: 'acontainer1',
				width:'100%',
				style: {
					'margin-bottom': '5px'
				},
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'center'
				},
				defaults: {
					baseCls: 'button-answer'
				},
				items:[/*{
					xtype: 'button',
					text: 'J'
				}*/]
			}, {
				xtype: 'container',
				name: 'acontainer2',
				width:'100%',
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'center'
				},
				defaults: {
					baseCls: 'button-answer'
				},
				items:[]
			}]
		}]
	},

	initialize: function() {
		var me = this;
		this.callParent(arguments);
		MyApp.app.on('start_game', me.onStartGame, me);

		me.ALPHABE = 'QERTYUIOPASDFGHKLXCVBNM';
	},

	onStartGame: function() {
		var me = this;
		me.a1 = me.down('container[name="acontainer1"]');
		me.a2 = me.down('container[name="acontainer2"]');
		me.q1 = me.down('container[name="qcontainer1"]');
		me.q2 = me.down('container[name="qcontainer2"]');

		me.MAXQ = 9;
		me.MAXA = 7;


		var totalButton = 8*2 + 7*2;
		me.aButtons = [];
		for (var i = 0; i < totalButton; i++) {
			me.aButtons.push(Ext.create('Ext.Button', {text: ''}));
		}

		me.generateQuestion('TRE GIA BANG');
	},

	clear: function() {
		var me = this;
		me.currentButtonIndex = 0;
		me.a1.removeAll(false);
		me.a2.removeAll(false);
		me.q1.removeAll(false);
		me.q2.removeAll(false);
	},

	getButton: function() {
		var me = this;
		var btn = me.aButtons[me.currentButtonIndex];
		btn.setCls('');
		btn.setText('');
		me.currentButtonIndex ++;
		return btn;
	},

	generateQuestion: function(question) {//format: 'QUE HUONG'
		var me = this;
		me.clear();
		var temp = question.split(' ');
		var count = temp.length;
		var con = me.q1;
		var sum = 0;
		for (var i = 0; i < count; i++) {
			sum += temp[i].length;
			if (sum <= me.MAXQ) {
				var last = false;
				if (i == (count -1)) last = true;
				else {
					if ((sum + temp[i+1].length) > me.MAXQ) last = true;
				}
				me.genQuestion(con, temp[i], last);
			} else {
				sum = temp[i].length;
				con = me.q2;
				me.genQuestion(con, temp[i], i == (count -1));
			}
		}
	},

	genQuestion: function(container, q, last) {
		var me = this;
		for (var i = 0; i < q.length; i++) {
			console.log(q[i].toUpperCase());
			var btn = me.getButton();
			if (last && i == q.length-1) {
				btn.addCls('last');
			}
			container.add(btn);
		}
	}
});