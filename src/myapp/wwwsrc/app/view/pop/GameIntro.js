Ext.define('MyApp.view.pop.GameIntro', {
    extend: 'Ext.Container',
    xtype: 'pop_gameintro',
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
                html: 'HƯỚNG DẪN CHƠI'
            }]
        }, {
	    	xtype: 'label',
	    	cls: 'doandung',
            style: {
                //'text-align': 'center',
                'margin-bottom': '10px',
                'font-size': '14px',
                'margin-left': '15px',
                'margin-right': '15px',
                'line-height': '25px'
            },
	    	html: 'Chương trình sẽ đưa ra câu đố bằng hình ảnh và Bạn dùng chữ để giải câu đố đó.<br/>Bạn sẽ được tặng 20 xu làm vốn. Qua mỗi câu, Bạn sẽ được thưởng thêm 3 xu. Nếu Bạn gặp câu khó, có thể dùng quyền Mở Ô Đáp Án (?), mỗi lần mất 10 xu, được sử dụng tối đa 3 lần cho mỗi câu đố hoặc Bạn có thể nhờ người quen trên Facebook giúp đỡ (f). Qua mỗi 5 câu, Bạn sẽ nhận được Hộp Quà May Mắn chứa rất nhiều xu.<br/>Chúc Bạn chơi vui vẻ !'
	    }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'center'
            },
            items:[{
                xtype: 'button',
                text: 'BẮT ĐẦU',
                cls: 'button-icon button-pop intro',
                title: 'closepopbtn'
            }, {
                xtype: 'spacer',
                width: 10
            },{
                xtype: 'button',
                text: 'KHÔNG HIỆN NỮA',
                cls: 'button-icon button-pop intro',
                title: 'kohienlaibtn'
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
                    if (!me.nextbutton) me.nextbutton = me.down('button[title="kohienlaibtn"]');
                    me.nextbutton.disable();

                    Ext.defer(function() {
                        me.hideMe(false);
                    }, 300);
                    
                   
                }
            }, 

            'button[title="kohienlaibtn"]' : {
                tap: function() {
                    var me = this;
                    //console.log('hide me');
                    if (!me.showing) return;
                    me.showing = false;

                   if (!me.nextbutton) me.nextbutton = me.down('button[title="closepopbtn"]');
                    me.nextbutton.disable();
                    if (!me.nextbutton) me.nextbutton = me.down('button[title="kohienlaibtn"]');
                    me.nextbutton.disable();

                    Ext.defer(function() {
                        me.hideMe(true);
                    }, 300);
                    
                   
                }
            }
        }
    },

    initialize: function() {
    	var me = this;
    	me.callParent(arguments);
    },

    showMe: function(callback) {
    	var me = this;  
        me.callback = callback;	
        me.showing = true;
        if (!me.nextbutton) me.nextbutton = me.down('button[title="closepopbtn"]');
        me.nextbutton.enable();
        me.show();
    },

    hideMe: function(dontshowagain) {
        //MyApp.app.fireEvent('go_home');
        var me = this;
        if (dontshowagain) {
            AppUtil.saveLocalVar('showhelp', true);
        }
        if (typeof me.callback === 'function') {
            me.callback();

        }
        Ext.Viewport.remove(this, false);
    }
});
