Ext.define('MyApp.view.pop.Gameover', {
    extend: 'Ext.Container',
    xtype: 'pop_gameover',
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
            style: {
                'text-align': 'center',
                'margin-bottom': '50px'
            },
	    	html: 'Bạn đã hoàn thành trò chơi. Chúng tôi sẽ sớm cập nhật phiên bản tiếp theo.<br/><br/>Xin chào và hẹn gặp lại.<br/>(C) Joker Team.'
	    }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'center'
            },
            items:[{
                xtype: 'button',
                text: 'TRỞ RA',
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
    },

    showMe: function(question, callback) {
    	var me = this;  
        me.callback = callback;	
        me.showing = true;
        if (!me.nextbutton) me.nextbutton = me.down('button[title="closepopbtn"]');
        me.nextbutton.enable();
        me.show();
    },

    hideMe: function() {
        MyApp.app.fireEvent('go_home');
        Ext.Viewport.remove(this, false);
    }
});
