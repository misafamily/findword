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
		items: [/*{
				xtype: 'container',
				style: {
					'background-color': '#dcd4bf',
					'height': '20px'
				}
			}, */{
			xtype: 'container',
			cls: 'game-topbar',
			layout: {
				type: 'hbox',
				pack: 'center',
				align: 'center'
			},
			width: '100%',
			items:[{
				xtype: 'container',
				width: 120,
				layout: {
					type: 'hbox',
					pack: 'start',
					align: 'center'
				},
				style: {
					'background-color' : '#3ba6ac',
					'height': '44px'
				},
				items:[{
					xtype: 'button',
					cls: 'button-icon button-back',
					title: 'back',
					style: {
						'margin-left': '5px'
					}
				}, {
					xtype: 'button',
					cls: 'button-icon button-help',
					badgeText: '3',
					title: 'helpbtn',
					itemId: 'helpbtnid'
				}]
			}, {
				xtype: 'spacer',
				flex: 1,
				style: {
					'background-color' : '#3ba6ac',
					'height': '44px'
				}
			}, {
				xtype: 'label',
				html: 'CAU XXXX',
				cls: 'game-level',
				title: 'levellabel',
				//flex: 1,
				width: 80,
				style: {
					'text-align': 'center'
				}
			}, {
				xtype: 'spacer',
				flex: 1,
				style: {
					'background-color' : '#3ba6ac',
					'height': '44px'
				}
			}, {
				xtype: 'container',
				width: 120,
				style: {
					'background-color' : '#3ba6ac',
					'height': '44px'
				},
				layout: {
					type: 'hbox',
					pack: 'center',
					align: 'center'
				},
				items:[{
					xtype: 'button',
					cls: 'button-icon button-sharefb',
					title: 'sharefbbtn',
					itemId: 'sharefbbtnid'
				}, {
					xtype: 'container',
					layout: {
						type: 'hbox',
						pack: 'center',
						align: 'center'
					},
					cls: 'game-score',
					style: {
						'margin-right': '5px'
					},
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
				xtype: 'container',
				title: 'gamethumb',
				//src: 'resources/data/sample.jpg',
				cls: 'game-pic-image',
				mode: '',
				style: {
					'width': '100%',
					'background-size': '90%',
					'background-repeat': 'no-repeat',
					'background-position': 'center',
				}
			}]
		}, /*{
			xtype: 'container',
			cls: 'game-buttons',
			height: 40,
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
		},*/ {
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
		me.callParent(arguments);
		MyApp.app.on('start_game', me.onStartGame, me);

		me.ALPHABE = 'QERTYUIOPASDFGHKLXCVBNMABC';
		//get Questions store
		//me.questionStore = Ext.getStore('Questions');

		me.allQuestions = AppUtil.allQuestions;//Ext.clone(me.questionStore.data.items);

		//console.log('me.questionStore', me.questionStore);
		me.IGNOREPOINT = 10;

		//reset game to test
		//AppUtil.resetSettings();
	},

	onStartGame: function() {
		var me = this;
		if (!me.initGame) {
			me.initGame = true;

			me.a1 = me.down('container[name="acontainer1"]');
			me.a2 = me.down('container[name="acontainer2"]');
			me.q1 = me.down('container[name="qcontainer1"]');
			me.q2 = me.down('container[name="qcontainer2"]');

			me.MAXQ = 9;
			me.MAXA = 7;

			
			//me.image.setWidth(me.image.parent.getWidth());
			//me.image.setHeight(me.image.parent.getHeight());

			var totalButton = me.MAXQ*2 + me.MAXA*2;
			me.aButtons = [];
			for (var i = 0; i < totalButton; i++) {
				me.aButtons.push(Ext.create('Ext.Button', {text: ''}));
			}

			me.QButtons = [];
			me.AButtons = [];

			me.currentButtonIndex = 0;
			me.playGame();

			var showhelp = AppUtil.getLocalVar('showhelp') == 'true';

			if (!showhelp) {
				//AppUtil.saveLocalVar('showhelp', true);
				AppUtil.gameintro(function(){
					me.checkShowGiftByDay();
				});
			} else {
				me.checkShowGiftByDay();
			}
		}
		//check show intro
		//console.log('showhelp: ', AppUtil.getLocalVar('showhelp'));
		if (!me.getNextQuestion()) {
			AppUtil.gameover();
		}
		

		//AppUtil.gift();
	},

	checkShowGiftByDay: function() {
		var me = this;

		if (!me.getNextQuestion()) return;
		var today = new Date();
		var todaystr = today.getFullYear().toString() + (today.getMonth()+1).toString() + today.getDate().toString();
		console.log('checkShowGiftByDay: ', todaystr);
		if (AppUtil.getLocalVar('giftbyday_' + todaystr) == null) {
			AppUtil.giftByDay(function() {
				//console.log('qua tamg close: ', todaystr);
				AppUtil.SCORE += 10;
				AppUtil.save();
				me.scoreLabel.setHtml(AppUtil.SCORE);
				AppUtil.saveLocalVar('giftbyday_' + todaystr, 'done');
			});
		}
		
	},

	getNextQuestion: function() {
		var me = this;
		if (AppUtil.LEVEL  <= me.allQuestions.length) return me.allQuestions[AppUtil.LEVEL-1];
		else return null;
		//if (me.allQuestions.length > 0) return me.allQuestions.shift();
		//else return null;
	},

	playGame: function() {
		var me = this;
		me.updateGameInfo();

		var q = me.getNextQuestion();
		if (q) {
			if (!AppUtil.isFirstLoad) {
				AppUtil.GAMESTATE = 'new';
				//console.log('USER ANSWER: ', AppUtil.OPENINGANSWER);
				AppUtil.saveGameState();
			}
			
			me.renderQuestion(q);

		} else {
			//AppUtil.alert('Bạn đã hoàn thành trò chơi. Chúng tôi sẽ cập nhật thêm trong phiên bản tiếp theo.<br/>Xin chào và hẹn gặp lại.', 'CHÚC MỪNG');
			AppUtil.gameover();
		}
	},

	updateGameInfo: function() {
		var me = this;
		var lv = AppUtil.LEVEL;
		if (!me.levelLabel) me.levelLabel = me.down('label[title="levellabel"]');
		if (!me.scoreLabel) me.scoreLabel = me.down('label[title="scorelabel"]');
		//if (!me.freetimeButton) me.freetimeButton = me.down('button[title="freetimebtn"]');
		if (!me.helpButton) me.helpButton = me.down('button[title="helpbtn"]');

		//me.levelLabel.setHtml('CÂU ' + lv);
		me.levelLabel.setHtml(lv);
		me.scoreLabel.setHtml(AppUtil.SCORE);
		//me.freetimeButton.setBadgeText(AppUtil.FREETIME);
		me.helpButton.setBadgeText(AppUtil.OPENTIME);
	},

	renderQuestion: function(question) { //is Question model
		var me = this;
		me.currentQuestion = question;
		if (!me.image) me.image = me.down('container[title="gamethumb"]');
		var parentContainer = me.image.parent;
		//console.log('parentContainer: ', parentContainer);
		var xh = '199px';
		if (parentContainer) {
			xh = parentContainer.element.dom.clientHeight + 'px';
		}
		//AppUtil.alert('resources/data/' + question.data.thumb, 'src');
		me.image.setStyle( {
			'background-image' : 'url("resources/data/' +  question.data.thumb + '")',
			'height': xh
			
		});
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
		//console.log(question, ' length: ', count);
		if (count > me.MAXQ) {
			var s1 = temp.substring(0, me.MAXQ);
			var s2 = temp.substring(me.MAXQ, count);
			me.genQuestion(me.q1, s1);
			me.genQuestion(me.q2, s2);
		} else {
			me.genQuestion(me.q1, temp);
		}

		//check to restore previous game

		var a = '';
		if (AppUtil.GAMESTATE == 'playing' && AppUtil.isFirstLoad) {
			//AppUtil.isFirstLoad = false;
			a = Ext.clone(AppUtil.CLOSESELECTION);
		} else {
			a = question.split('');
			while (a.length < me.MAXA*2) {
				var tt = me.ALPHABE[Math.round(Math.random()*me.ALPHABE.length-2)] || ''; 
				if (tt != '') a.push(tt);
			}
			a = me.shuffle(a);
		}
		
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

		//load game data
		if (AppUtil.GAMESTATE == 'playing' && AppUtil.isFirstLoad) {
			AppUtil.isFirstLoad = false;
			var openChars = AppUtil.OPENINGANSWER;
			for (var i = 0; i < openChars.length; i++) {
				//console.log('openChars[i]: ', openChars[i]);
				var oc = openChars[i].split('-');
				if (oc.length > 1) {
					var qBtnId = Ext.util.Format.format('button[itemId="{0}"]', oc[0]) ;
					var qBtn = me.down(qBtnId);
					//console.log('qBtnId: ', qBtnId, ' qBtn:', qBtn);
					if (qBtn) {
						qBtn.addCls('open');
						if (oc.length > 2) qBtn.addCls('fix');
						qBtn.setItemId(qBtn.getItemId() + '-' + oc[1]);

						var aBtnId = Ext.util.Format.format('button[itemId="a_{0}"]', oc[1]) ;
						var aBtn = me.down(aBtnId);
						if (aBtn) {
							aBtn.addCls('hide');
						}

						qBtn.setText(aBtn.getText());
					}
				} 
			};
		}
		AppUtil.CLOSESELECTION = q;
		AppUtil.saveGameState();
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
		if (title.indexOf('a_') > -1) { //is A button
			me.removeWrong();
			if (me.timeout) return;
			var found = false;
			AppUtil.OPENINGANSWER = [];
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
				if (b.getCls().indexOf('fix') > -1) AppUtil.OPENINGANSWER.push(b.getItemId() + '-fix');
				else AppUtil.OPENINGANSWER.push(b.getItemId());
			};

			if (found) {
				AppUtil.GAMESTATE = 'playing';
				//console.log('USER ANSWER: ', AppUtil.OPENINGANSWER);
				AppUtil.saveGameState();
			}
			
			if (answer.length == me.ANSWER.length) {
				//fill all, check it correct or not
				console.log('YOUR ANSWER: ', answer);
				console.log('RIGHT ANSWER: ', me.ANSWER);
				me.timeout = true;
				if (answer == me.ANSWER) {
					//AppUtil.autoAlert('Đáp án chính xác rồi');
					me.answerRight();
				} else {
					AppUtil.autoAlert('Đoán sai rồi');
					me.answerWrong();
				}

			}
		} else if (title.indexOf('q_') > -1) { // is Q button
			var itemId = btn.getItemId().split('-');
			var oldItemId = btn.getItemId();
			me.removeWrong();
			if (btn.getCls().indexOf('fix') > -1) return;
			if (itemId.length > 1) {
				btn.removeCls('open');
				btn.setText('');
				me.timeout = false;
				btn.setItemId(itemId[0]);

				for (var i = 0; i < me.AButtons.length; i++) {
					var b = me.AButtons[i];
					if (b.getItemId() == 'a_' + itemId[1]) {
						b.removeCls('hide');

						break;
					}
				}

				for (var i = 0; i < AppUtil.OPENINGANSWER.length; i++) {
					var b = AppUtil.OPENINGANSWER[i];
					if (b == oldItemId) {
						AppUtil.OPENINGANSWER[i] = btn.getItemId();
						break;
					}
				}
				
				
				AppUtil.GAMESTATE = 'playing';
				//console.log('USER ANSWER: ', AppUtil.OPENINGANSWER);
				AppUtil.saveGameState();
			
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
			if (AppUtil.SCORE >= me.IGNOREPOINT) {
				if (AppUtil.OPENTIME > 0) {
					var msg = 'Dùng 10 xu để mở ô kế tiếp.<br/>Bạn đồng ý chứ?<br/>(Được sử dụng 3 lần mỗi câu)';
					AppUtil.confirm(msg, 
						'Mở Ô Đáp Án',
						function() {
							if (me.checkAnswerFull()) {
								AppUtil.alert('Bạn đã mở hết ô đáp án.<br/>Hãy xóa 1 ô cần mở.', 'Mở Ô Đáp Án');
							} else {
								me.removeWrong();
								AppUtil.OPENTIME--;
								me.open1Char();
							}
							
						});
				} else {
					AppUtil.alert('Bạn đã sử dụng hết 3 lần cho câu đố này rồi.', 'Mở Ô Đáp Án');
				}
				
			} else {
				AppUtil.alert('Dùng 10 xu để mở ô kế tiếp.<br/>Số xu Bạn có không đủ. Hãy cố gắng suy nghĩ nào.', 'Mở Ô Đáp Án');
			}
		} else if (title == 'sharefbbtnid') {
			//console.log('AppUtil.CLOSESELECTION: ', AppUtil.CLOSESELECTION);
			var msg = 'Trò chơi <Cùng Chơi Đoán Chữ>. Mọi người giúp mình nào, câu này mình suy nghĩ không ra. Đáp án gồm ' + 
						me.currentQuestion.data.word.length + ' chữ. Các từ gợi ý như sau: ' +
						AppUtil.CLOSESELECTION.join(' ') + '. Xin cảm ơn ^^'

			AppUtil.shareFBToAsk(msg, 'www/resources/data/' + me.currentQuestion.data.thumb);
		}
	},

	open1Char: function() {
		var me = this;
		AppUtil.SCORE -= me.IGNOREPOINT;
	
		AppUtil.save();
		
		var answer = '';
		var found = false;
		AppUtil.OPENINGANSWER = [];
		for (var i = 0; i < me.QButtons.length; i++) {
			var b = me.QButtons[i];
			
			if (b.getText() == '' && !found) {
				found = true;
				//
				b.setText(me.ANSWER[i]);
				b.addCls('fix');
				answer += b.getText();

				var id = '';
				for (var j = 0; j < me.AButtons.length; j++) {
					var bb = me.AButtons[j];
					if (bb.getText() == me.ANSWER[i]) {
						bb.addCls('hide');
						id = bb.getItemId();
						break;
					}
				};
				if (id != '') b.setItemId(b.getItemId() + '-' + id.split('_')[1]);
				//btn.addCls('hide');
				//break;
			} else {
				answer += b.getText();
			}
			if (b.getCls().indexOf('fix') > -1)
				AppUtil.OPENINGANSWER.push(b.getItemId() + '-fix');
			else AppUtil.OPENINGANSWER.push(b.getItemId());
		};

		if (found) {
			AppUtil.GAMESTATE = 'playing';
			//console.log('USER ANSWER: ', AppUtil.OPENINGANSWER);
			AppUtil.saveGameState();
		};
		
		if (answer.length == me.ANSWER.length) {
			//fill all, check it correct or not
			console.log('YOUR ANSWER: ', answer);
			console.log('RIGHT ANSWER: ', me.ANSWER);
			me.timeout = true;
			if (answer == me.ANSWER) {
				//AppUtil.autoAlert('Đáp án chính xác');
				me.answerRight();
			} else {
				AppUtil.autoAlert('Đoán sai rồi');
				me.answerWrong();
			}

		}

		Ext.defer(function(){
			me.updateGameInfo();
		}, 24);
		
	},

	checkAnswerFull: function() {
		var me = this;
		var fulled = true;
		for (var i = 0; i < me.QButtons.length; i++) {
			var b = me.QButtons[i];
			
			if (b.getText() == '') {
				fulled = false;
				break;
			}
		}

		return fulled;
	},

	answerRight: function() {
		var me = this;
		AppUtil.SCORE += 3;
		AppUtil.LEVEL += 1;
		AppUtil.OPENTIME = 3;

		AppUtil.save();

		AppUtil.GAMESTATE = 'end';
		//console.log('USER ANSWER: ', AppUtil.OPENINGANSWER);
		AppUtil.saveGameState();

		me.currentQuestion.data.status = 'cleared';
		me.currentQuestion.save(function() {
			AppUtil.congrate(me.currentQuestion.data.fullword.toUpperCase(), function() {
				Ext.defer(function(){
					if (((AppUtil.LEVEL - 1) % 5 ) == 0) {
						AppUtil.gift(function() {
							//Ext.defer(function(){
								me.playGame();
							//}, 24);
						});
					}
					else me.playGame();
				}, 24);
			});
		});

		
	},

	ignoreQuestion: function() {
		var me = this;
		//AppUtil.SCORE += 3;
		AppUtil.LEVEL += 1;

		AppUtil.save();

		Ext.defer(function(){
			me.playGame();
		}, 24);
		
	},

	answerWrong: function() {
		var me = this;
		for (var j = 0; j < me.QButtons.length; j++) {
			var bb = me.QButtons[j];
			//if (bb.getText() == me.ANSWER[i]) {
				bb.addCls('wrong');
			//	id = bb.getItemId();
			//	break;
			//}
		}
	},

	removeWrong: function() {
		var me = this;
		for (var j = 0; j < me.QButtons.length; j++) {
			var bb = me.QButtons[j];
			//if (bb.getText() == me.ANSWER[i]) {
				bb.removeCls('wrong');
			//	id = bb.getItemId();
			//	break;
			//}
		}
	}
});