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
			cls: 'game-topbar',
			layout: {
				type: 'hbox',
				pack: 'center',
				align: 'center'
			},
			items:[{
				xtype: 'container',
				width: 110,
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'center'
				},
				items:[{
					xtype: 'button',
					cls: 'button-icon button-back',
					title: 'back'
				}, {
					xtype: 'spacer',
					flex: 1
				}]
			}, {
				xtype: 'label',
				html: 'CAU XXXX',
				cls: 'game-level',
				title: 'levellabel',
				flex: 1,
				style: {
					'text-align': 'center'
				}
			}, {
				xtype: 'container',
				width: 110,
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'center'
				},
				items:[{
					xtype: 'spacer',
					flex: 1
				}, {
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'center',
						align: 'center'
					},
					cls: 'game-score',
					items: [{
						xtype: 'label',
						html: '1110',
						title: 'scorelabel',
						style: {
							'margin-left': '0px',
							'margin-right': '5px'
						}
					}, {
						xtype: 'image',
						src: 'resources/images/scorebg.png',
						width: 20,
						height: 20
					}]
				}]
			}]
		}, {
			xtype: 'container',
			cls: 'game-pic',
			layout: {
				type: 'vbox',
				pack: 'center',
				align: 'center'
			},
			flex: 1,
			items:[{
				xtype: 'image',
				title: 'gamethumb',
				//src: 'resources/data/sample.jpg',
				cls: 'game-pic-image',
				mode: ''
			}]
		}, {
			xtype: 'container',
			cls: 'game-buttons',
			layout: {
				type: 'hbox',
				pack: 'center',
				align: 'center'
			},
			items: [{
				xtype: 'button',
				cls: 'button-icon button-ignore',
				badgeText: '0',
				title: 'freetimebtn',
				itemId: 'freetimebtnid'
			}, {
				xtype: 'button',
				cls: 'button-icon button-help',
				badgeText: '3',
				title: 'helpbtn',
				itemId: 'helpbtnid'
			}]
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
					'margin-bottom': '6px'
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
		}],

		control: {
			'button': {
				tap: function(btn) {
					var me = this;
					me.chooseAnswer(btn);
					//console.log(btn);
				}
			}
		}
	},

	initialize: function() {
		var me = this;
		this.callParent(arguments);
		MyApp.app.on('start_game', me.onStartGame, me);

		me.ALPHABE = 'QERTYUIOPASDFGHKLXCVBNMABC';
		//get Questions store
		me.questionStore = Ext.getStore('Questions');

		me.allQuestions = Ext.clone(me.questionStore.data.items);

		console.log('me.questionStore', me.questionStore);

		//reset game to test
		AppUtil.resetSettings();
	},

	onStartGame: function() {
		var me = this;
		me.a1 = me.down('container[name="acontainer1"]');
		me.a2 = me.down('container[name="acontainer2"]');
		me.q1 = me.down('container[name="qcontainer1"]');
		me.q2 = me.down('container[name="qcontainer2"]');

		me.MAXQ = 9;
		me.MAXA = 7;

		
		//me.image.setWidth(me.image.parent.getWidth());
		//me.image.setHeight(me.image.parent.getHeight());

		var totalButton = 8*2 + 7*2;
		me.aButtons = [];
		for (var i = 0; i < totalButton; i++) {
			me.aButtons.push(Ext.create('Ext.Button', {text: ''}));
		}

		me.QButtons = [];
		me.AButtons = [];

		me.playGame();
	},

	getNextQuestion: function() {
		var me = this;
		if (me.allQuestions.length > 0) return me.allQuestions.shift();
		else return null;
	},

	playGame: function() {
		var me = this;
		me.updateGameInfo();

		var q = me.getNextQuestion();
		if (q) {
			me.renderQuestion(q);
		} else {
			AppUtil.alert('Bạn đã hoàn thành trò chơi. Chúng tôi sẽ cập nhật thêm trong phiên bản tiếp theo.<br/>Xin chào và hẹn gặp lại.', 'CHÚC MỪNG');
		}
	},

	updateGameInfo: function() {
		var me = this;
		var lv = AppUtil.LEVEL;
		if (!me.levelLabel) me.levelLabel = me.down('label[title="levellabel"]');
		if (!me.scoreLabel) me.scoreLabel = me.down('label[title="scorelabel"]');
		if (!me.freetimeButton) me.freetimeButton = me.down('button[title="freetimebtn"]');
		if (!me.helpButton) me.helpButton = me.down('button[title="helpbtn"]');

		me.levelLabel.setHtml('CÂU ' + lv);
		me.scoreLabel.setHtml(AppUtil.SCORE);
		me.freetimeButton.setBadgeText(AppUtil.FREETIME);
		me.helpButton.setBadgeText(AppUtil.OPENTIME);
	},

	renderQuestion: function(question) { //is Question model
		var me = this;
		if (!me.image) me.image = me.down('image[title="gamethumb"]');
		//AppUtil.alert('resources/data/' + question.data.thumb, 'src');
		me.image.setSrc('resources/data/' +  question.data.thumb);
		me.generateQuestion(question.data.word.toUpperCase());
	},

	clear: function() {
		var me = this;
		me.currentButtonIndex = 0;
		me.a1.removeAll(false);
		me.a2.removeAll(false);
		me.q1.removeAll(false);
		me.q2.removeAll(false);

		me.timeout = false;
		for (var i = 0; i < me.QButtons.length; i++) {
			me.QButtons[i].setItemId('');
		};
		for (var i = 0; i < me.AButtons.length; i++) {
			me.AButtons[i].setItemId('');
		};
		me.QButtons = [];
		me.AButtons = [];
	},

	getButton: function() {
		var me = this;
		var btn = me.aButtons[me.currentButtonIndex];
		btn.setCls('');
		btn.setText('');
		me.currentButtonIndex ++;
		return btn;
	},

	generateQuestion: function(question) {//format: 'ANCULACNGHIEP'
		var me = this;
		me.clear();
		me.ANSWER = question;
		var temp = question;
		var count = temp.length;
		if (count > me.MAXA*2) {
			AppUtil.alert('Câu hỏi quá dài','Lỗi');
			return;
		}
		//var con = me.q1;
		console.log(question, ' length: ', count);
		if (count > me.MAXQ) {
			var s1 = temp.substring(0, me.MAXQ);
			var s2 = temp.substring(me.MAXQ, count);
			me.genQuestion(me.q1, s1);
			me.genQuestion(me.q2, s2);
		} else {
			me.genQuestion(me.q1, temp);
		}

		var a = question.split('');
		while (a.length < me.MAXA*2) {
			var tt = me.ALPHABE[Math.round(Math.random()*me.ALPHABE.length-2)] || ''; 
			if (tt != '') a.push(tt);
		}
		a = me.shuffle(a);
		//console.log(a);
		me.genSelection(a);
	},

	genQuestion: function(container, q) {
		var me = this;
		for (var i = 0; i < q.length; i++) {
			//console.log(q[i].toUpperCase());
			var btn = me.getButton();
			btn.setItemId('q_' + i);
			//btn.setText(q[i]);
			//btn.addCls('open');
			if (i == q.length-1) {
				btn.addCls('last');
			}
			container.add(btn);

			me.QButtons.push(btn);
		}
	},

	genSelection: function(q) {
		var me = this;
		for (var i = 0; i < q.length; i++) {
			//console.log(q[i].toUpperCase());
			var btn = me.getButton();
			btn.setText(q[i]);
			btn.setItemId('a_' + i);
			//btn.addCls('open');
			if (i ==6 || i == 13) {
				btn.addCls('last');
			}
			if (i < me.MAXA) me.a1.add(btn);
			else me.a2.add(btn);

			me.AButtons.push(btn);
		}
	},

	shuffle: function(o){ //v1.0
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	},

	chooseAnswer: function(btn) {
		var me = this;
		var title = btn.getItemId();
		//console.log('itemId: ', title);
		var answer = '';
		if (title.indexOf('a') > -1) { //is A button
			if (me.timeout) return;
			var found = false;
			for (var i = 0; i < me.QButtons.length; i++) {
				var b = me.QButtons[i];
				
				if (b.getText() == '' && !found) {
					found = true;
					answer += btn.getText();
					b.setText(btn.getText());
					b.addCls('open');
					b.setItemId(b.getItemId() + '-' + title.split('_')[1]);
					btn.addCls('hide');
					//break;
				} else {
					answer += b.getText();
				}
			};
			
			if (answer.length == me.ANSWER.length) {
				//fill all, check it correct or not
				console.log('YOUR ANSWER: ', answer);
				console.log('RIGHT ANSWER: ', me.ANSWER);
				me.timeout = true;
				if (answer == me.ANSWER) {
					AppUtil.autoAlert('Đáp án chính xác rồi');
					me.answerRight();
				} else {
					AppUtil.autoAlert('Đoán sai rồi');
					me.answerWrong();
				}

			}
		} else if (title.indexOf('q') > -1) { // is Q button
			var itemId = btn.getItemId().split('-');
			if (itemId.length > 1) {
				btn.removeCls('open');
				btn.setText('');
				me.timeout = false;
				btn.setItemId(itemId[0]);
				for (var i = 0; i < me.AButtons.length; i++) {
					var b = me.AButtons[i];
					if (b.getItemId() == 'a_' + itemId[1]) {
						b.removeCls('hide');
					}
				}
			}
		} else if (title == 'freetimebtnid') {
			if (AppUtil.FREETIME > 0) {
				var msg = 'Quyền Bỏ Qua Câu Đố còn {0} lần. Bạn đồng ý bỏ qua câu đố này?';
				AppUtil.confirm(Ext.util.Format.format(msg, AppUtil.FREETIME), 'Bỏ Qua Câu Đố', function() {
					AppUtil.FREETIME -= 1;
					AppUtil.saveLocalVar('freetime', AppUtil.FREETIME);
					me.ignoreQuestion();
				});
			} else {
				AppUtil.alert('Bạn đã sử dụng hết số lần Bỏ Qua Câu Đố.', 'Bỏ Qua Câu Đố');
			}
		} else if (title == 'helpbtnid') {
			if (AppUtil.SCORE >= 3) {
				if (AppUtil.OPENTIME > 0) {
					var msg = 'Mở 1 chữ trong ô đáp án sẽ bị trừ 5 xu. Bạn đồng ý chứ?<br/>(Được sử dụng 3 lần mỗi câu)';
					AppUtil.confirm(msg, 
						'Mở Ô Đáp Án',
						function() {
							AppUtil.OPENTIME--;
							me.open1Char();
						});
				} else {
					AppUtil.alert('Bạn đã sử dụng hết 3 lần cho câu đố này rồi.', 'Mở Ô Đáp Án');
				}
				
			} else {
				AppUtil.alert('Số xu đã hết. Hãy cố gắng suy nghĩ nào.', 'Mở Ô Đáp Án');
			}
		}
	},

	open1Char: function() {
		var me = this;
		AppUtil.SCORE -= 5;
	
		AppUtil.save();

		var answer = '';
		var found = false;
		for (var i = 0; i < me.QButtons.length; i++) {
			var b = me.QButtons[i];
			
			if (b.getText() == '' && !found) {
				found = true;
				//
				b.setText(me.ANSWER[i]);
				b.addCls('fix');
				answer += b.getText();

				for (var j = 0; j < me.AButtons.length; j++) {
					var bb = me.AButtons[j];
					if (bb.getText() == me.ANSWER[i]) {
						bb.addCls('hide');
						break;
					}
				};
				//b.setItemId(b.getItemId() + '-' + title.split('_')[1]);
				//btn.addCls('hide');
				//break;
			} else {
				answer += b.getText();
			}
		};
		
		if (answer.length == me.ANSWER.length) {
			//fill all, check it correct or not
			console.log('YOUR ANSWER: ', answer);
			console.log('RIGHT ANSWER: ', me.ANSWER);
			me.timeout = true;
			if (answer == me.ANSWER) {
				AppUtil.autoAlert('Đáp án chính xác');
				me.answerRight();
			} else {
				AppUtil.autoAlert('Đoán sai rồi');
				me.answerWrong();
			}

		}

		Ext.defer(function(){
			me.updateGameInfo();
		}, 300);
		
	},

	answerRight: function() {
		var me = this;
		AppUtil.SCORE += 3;
		AppUtil.LEVEL += 1;

		AppUtil.save();

		Ext.defer(function(){
			me.playGame();
		}, 300);
		
	},

	ignoreQuestion: function() {
		var me = this;
		//AppUtil.SCORE += 3;
		AppUtil.LEVEL += 1;

		AppUtil.save();

		Ext.defer(function(){
			me.playGame();
		}, 300);
		
	},

	answerWrong: function() {
		var me = this;
	}
});