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
       	showAnimation: null,//{ type: 'popIn', duration: 200, easing: 'ease-out' },
	    hideAnimation: null,//{ type: 'popOut', duration: 100, easing: 'ease-out' },
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
	    	html: 'Bạn đoán chính xác'
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
                    'margin-bottom': '10px'
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
            xtype: 'label',
            cls: 'doandung',
            title: 'tongxu',
            html: '',
            style: {
                'margin-bottom': '10px'
            }
        }, {
            xtype: 'label',
            cls: 'doandung',
            
            html: 'Thưởng Bạn 3 xu',
            style: {
                'margin-bottom': '15px'
            }
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
                    //console.log('hide me');
                    if (!me.showing) return;
                    me.showing = false;

                    if (!me.nextbutton) me.nextbutton = me.down('button[title="closepopbtn"]');
                    me.nextbutton.disable();

                    if (typeof me.callback === 'function') {
                        me.callback();

                    }

                    Ext.defer(function() {
                        me.hideMe();
                    }, 300);
                    
                   
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

        me.BRAVOS = ['Bạn giỏi quá !', 
                    'Bạn thật thông minh !',
                    'Bạn rất xuất sắc !',
                    'Bạn thật là siêu !',
                    'Bạn quá siêu phàm !',
                    'Khó thế mà Bạn cũng giải được !',
                    'Bạn quá hay !',
                    'Bạn siêu quá !',
                    'Bạn thật là đỉnh của đỉnh !',
                    'Bạn thật cao siêu !',
                    'Bạn cao thủ quá !'];
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
                console.log(temp[i]);
                if (total + temp[i].length < me.MAXQ) {
                    if (s1 == '') s1 += temp[i];
                    else s1 += ' ' + temp[i];
                    total = s1.length;
                } else {
                    if (s2 == '') s2 += temp[i];
                    else s2 += ' ' + temp[i];
                }
                //console.log('s1: ', s1);
                //console.log('s2: ', s2);
            }
           
            me.genQuestion(me.q1, s1);
            me.genQuestion(me.q2, s2);
        } else {
            me.genQuestion(me.q1, question);
        }
    },

    genQuestion: function(container, q) {
        var me = this;
        //console.log('genQuestion: ', q);
        for (var i = 0; i < q.length; i++) {
            //console.log(q[i].toUpperCase());
            var btn = me.getButton();
            btn.setItemId('q_' + i);
            btn.setText(q[i]);
            btn.addCls('open');
            
            if (q[i] == ' ') {
                //console.log('hide');
                btn.addCls('hide');
            }
                

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
        me.currentButtonIndex = 0;
    },

    showMe: function(question, callback) {
    	var me = this;  
        me.callback = callback;	
        me.showing = true;
        if (!me.nextbutton) me.nextbutton = me.down('button[title="closepopbtn"]');
        me.nextbutton.enable();

        me.generateQuestion(question);
        if (!me.cauxxxLabel) me.cauxxxLabel = me.down('label[cls="cauxxx"]');
        me.cauxxxLabel.setHtml('CÂU ' + (AppUtil.LEVEL - 1 ));
        if (!me._tongxuLabel) me._tongxuLabel = me.down('label[title="tongxu"]');
        if (me._tongxuLabel) me._tongxuLabel.setHtml(me.BRAVOS[Math.round(Math.random()*(me.BRAVOS.length-1))]);
        /*if (me._titleLabel) me._titleLabel.setHtml(title);*/

        me.show();
    },

    hideMe: function() {
        Ext.Viewport.remove(this, false);
    }
});
