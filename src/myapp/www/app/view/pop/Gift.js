Ext.define('MyApp.view.pop.Gift', {
    extend: 'Ext.Container',
    xtype: 'pop_gift',
    requires: [
    ],
    config: {
        modal: true,
        centered: true,
    	//message: 'Your message here',
        //title: 'Your title here',
        showAnimation: null,//{ type: 'popIn', duration: 200, easing: 'ease-out' },
        hideAnimation: null,//{ type: 'popOut', duration: 100, easing: 'ease-out' },
	    cls: 'pop-congrate-container gift',
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
                html: 'HỘP QUÀ MAY MẮN'
            }]
        }, {
            xtype: 'label',
            cls: 'doandung gift',
            html: 'Xin chúc mừng ! Bạn có cơ hội nhận xu thưởng từ chương trình. Hãy chọn 1 hộp quà bất kỳ'
        }, {
            xtype: 'container',         
            cls: 'dapan gift',
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
                    baseCls: 'button-gift'
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
                    baseCls: 'button-gift'
                },
                items:[]
            }]
        }, {
            xtype: 'label',
            cls: 'doandung gift',
            title: 'trungxu',
            height: 25,
            style: {
                'margin-bottom': '10px'               
            },
            html: ''
        }, {
            xtype: 'container',
            height: 50,
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
                    console.log('closepopbtn tap');
                    if (!me.showing) return;
                    me.showing = false;

                    if (!me.nextbutton) me.nextbutton = me.down('button[title="closepopbtn"]');
                    me.nextbutton.disable();

                    Ext.defer(function() {
                        me.hideMe();
                    }, 300);
                }
            },
            'button': {
                tap: function(btn) {
                    var me = this;
                    var itemId = btn.getItemId();
                    if (!me.chosen && itemId.indexOf('buttongift') > -1) {
                        console.log('chosennnn');
                        me.chosen = true;


                        var bonus = me.shuffle(me.BONUS);
                        var rate = bonus[Math.round(Math.random()*(bonus.length-1))];

                        AppUtil.SCORE += rate;
                        AppUtil.save();    
                        //console.log('rate: ', rate);
                        btn.setText(rate.toString());
                        btn.addCls('open');
                        me.trungxulabel.setHtml(Ext.util.Format.format('Hoan hô ! Bạn nhận được {0} xu', rate));
                        me.nextbutton.show();
                        me.trungxulabel.show();
                    }
                    
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
        //me.currentButtonIndex = 0;
        me.q1 = me.down('container[name="qcontainer1"]');
        me.q2 = me.down('container[name="qcontainer2"]');

        me.MAXQ = 3;

        me.BONUS = [2, 3, 4, 5, 10, 6, 8, 10, 3, 4, 5, 6, 2, 2, 2, 2, 3, 3, 3, 4, 4, 5, 6, 10, 8, 8];
       
        //me.image.setWidth(me.image.parent.getWidth());
        //me.image.setHeight(me.image.parent.getHeight());

        var totalButton = me.MAXQ*2;
        me.giftButtons = [];
        for (var i = 0; i < totalButton; i++) {
            me.giftButtons.push(Ext.create('Ext.Button', {text: ''}));
        }
    },

    shuffle: function(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    },

    clear: function() {
        var me = this;
        me.q1.removeAll(false);
        me.q2.removeAll(false);
        for (var i = 0; i < me.giftButtons.length; i++) {
            me.giftButtons[i].setItemId('');
        };
        me.chosen = false;
        //me.giftButtons = [];
        //me.currentButtonIndex = 0;
    },

    generateGift: function() {//format: 'ANCULACNGHIEP'
        var me = this;
        me.clear();
        for (var i = 0; i < me.giftButtons.length; i++) {
            var b = me.giftButtons[i];
            b.setItemId('buttongift_' + i);
            b.setCls('');
            b.setText('');
            if (i == 2 || i == 5) {
                b.addCls('last');
            }
            if (i < 3) {
                me.q1.add(b);
            } else {
                me.q2.add(b);
            }
        };
    },

    showMe: function(callback) {
    	var me = this;  
        me.callback = callback;	
        me.showing = true;
        if (!me.nextbutton) me.nextbutton = me.down('button[title="closepopbtn"]');
        if (!me.trungxulabel) me.trungxulabel = me.down('label[title="trungxu"]');
        me.nextbutton.enable();
    
        me.nextbutton.hide();
        me.trungxulabel.setHtml('');
        me.generateGift();
        me.show();
    },

    hideMe: function() {
        var me = this;
        //MyApp.app.fireEvent('go_home');
        if (typeof me.callback === 'function') {
            me.callback();

        }
        Ext.Viewport.remove(this, false);
    }
});
