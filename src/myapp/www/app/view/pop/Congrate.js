Ext.define('MyApp.view.pop.Congrate', {
    extend: 'Ext.Container',
    xtype: 'pop_congrate',
    requires: [
    ],
    config: {
        modal: true,
        centered: true,
    	//message: 'Your message here',
        //title: 'Your title here',
       	showAnimation: { type: 'popIn', duration: 200, easing: 'ease-out' },
	    hideAnimation: { type: 'popOut', duration: 100, easing: 'ease-out' },
	    cls: 'pop-congrate-container',
	    hidden: true,
	    layout: {
	    	type: 'vbox',
	    	pack: 'center',
	    	align: 'center'
	    },
	    items:[{
            xtype: 'container',
            cls: 'chucmung-container',
            layout: {
                type: 'vbox',
                pack: 'center',
                align: 'center'
            },
            items:[{
                xtype: 'label',
                html: 'CHÚC MỪNG BẠN !'
            }]
        }, {
	    	xtype: 'label',
	    	cls: 'doandung',
	    	html: 'Bạn đã đoán đúng'
	    }, {
            xtype: 'label',
            cls: 'cauxxx',
            html: 'CÂU XX'
        }, {
            xtype: 'container',         
            cls: 'dapan',
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
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'center'
            },
            items:[{
                xtype: 'button',
                text: 'TIẾP TỤC',
                cls: 'button-icon button-pop continue',
                title: 'closepopbtn'
            }]
        }],

        control: {
            'button[title="closepopbtn"]' : {
                tap: function() {
                    var me = this;
                    if (typeof me.callback === 'function') {
                        me.callback();

                    }
                    me.hide();
                }
            }
        }
    },

    initialize: function() {
    	var me = this;
    	me.callParent(arguments);

        me.onInit();
    },

    onInit: function() {
        var me = this;
        me.currentButtonIndex = 0;
        me.q1 = me.down('container[name="qcontainer1"]');
        me.q2 = me.down('container[name="qcontainer2"]');

        me.MAXQ = 8;
        me.MAXA = 7;
        
        //me.image.setWidth(me.image.parent.getWidth());
        //me.image.setHeight(me.image.parent.getHeight());

        var totalButton = me.MAXQ*2;
        me.aButtons = [];
        for (var i = 0; i < totalButton; i++) {
            me.aButtons.push(Ext.create('Ext.Button', {text: ''}));
        }

        me.QButtons = [];
    },

    generateQuestion: function(question) {//format: 'ANCULACNGHIEP'
        var me = this;
        me.clear();
        //me.ANSWER = question;
        var temp = question.split(' ');
        var count = question.length;
        if (count > me.MAXQ*2) {
            AppUtil.alert('Câu hỏi quá dài','Lỗi');
            return;
        }
        //var con = me.q1;
        //console.log(question, ' length: ', count);
        if (count > me.MAXQ) {
            var total = 0;
            var s1 = '';
            var s2 = '';
            for(var i = 0; i < temp.length; i++) {
                if (total + temp[i].length < me.MAXQ) {
                    if (s1 == '') s1 += temp[i];
                    else s1 = ' ' + temp[i];
                    total = s1.length;
                } else {
                    if (s2 == '') s2 += temp[i];
                    else s2 = ' ' + temp[i];
                }
            }
           
            me.genQuestion(me.q1, s1);
            me.genQuestion(me.q2, s2);
        } else {
            me.genQuestion(me.q1, question);
        }
    },

    genQuestion: function(container, q) {
        var me = this;
        for (var i = 0; i < q.length; i++) {
            //console.log(q[i].toUpperCase());
            var btn = me.getButton();
            btn.setItemId('q_' + i);
            btn.setText(q[i]);
            btn.addCls('open');
            if (i == q.length-1) {
                btn.addCls('last');
            }
            //btn.addCls('open');
            container.add(btn);

            me.QButtons.push(btn);
        }
    },

    getButton: function() {
        var me = this;
        var btn = me.aButtons[me.currentButtonIndex];
        btn.setCls('');
        btn.setText('');
        me.currentButtonIndex ++;
        return btn;
    },

    clear: function() {
        var me = this;
        me.q1.removeAll(false);
        me.q2.removeAll(false);
        for (var i = 0; i < me.QButtons.length; i++) {
            me.QButtons[i].setItemId('');
        };
        me.QButtons = [];
    },

    showMe: function(question, callback) {
    	var me = this;  
        me.callback = callback;	

        me.generateQuestion(question);
        if (!me.cauxxxLabel) me.cauxxxLabel = me.down('label[cls="cauxxx"]');
        me.cauxxxLabel.setHtml('CÂU ' + (AppUtil.LEVEL - 1 ));
        /*if (!me._titleLabel) me._titleLabel = me.down('label[title="titlelabel"]');
        if (me._msgLabel) me._msgLabel.setHtml(msg);
        if (me._titleLabel) me._titleLabel.setHtml(title);*/
        me.show();
    }
});
