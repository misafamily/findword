Ext.define('MyApp.view.pop.Confirm', {
    extend: 'Ext.Container',
    xtype: 'pop_confirm',
    requires: [
    ],
    config: {
        modal: true,
        centered: true,
    	//message: 'Your message here',
        //title: 'Your title here',
       	showAnimation: { type: 'popIn', duration: 200, easing: 'ease-out' },
	    hideAnimation: { type: 'popOut', duration: 100, easing: 'ease-out' },
	    cls: 'pop-alert-container',
	    hidden: true,
	    layout: {
	    	type: 'vbox',
	    	//pack: 'center',
	    	align: 'center'
	    },
	    items:[{
            xtype: 'label',
            cls: 'title',
            title: 'titlelabel',
            html: ''
        }, {
	    	xtype: 'label',
	    	cls: 'message',
            title: 'msglabel',
	    	html: ''
	    }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'center'
            },
            items:[{
                xtype: 'button',
                text: 'ĐỒNG Ý',
                cls: 'button-icon button-pop',
                title: 'okpopbtn'
            }, {
                xtype: 'spacer',
                width: 10
            }, {
                xtype: 'button',
                text: 'BỎ QUA',
                cls: 'button-icon button-pop',
                title: 'closepopbtn'
            }]
        }],

        control: {
            'button[title="okpopbtn"]' : {
                tap: function() {
                    var me = this;
                    if (typeof me.callback === 'function') {
                        me.callback();

                    }
                    me.hide();
                }
            },

            'button[title="closepopbtn"]' : {
                tap: function() {
                    var me = this;
                    me.hide();
                }
            }
        }
    },

    initialize: function() {
    	var me = this;
    	me.callParent(arguments);
    },

    updateMessage: function() {
    	var me = this;
    	if (!me._msgLabel) me._msgLabel = me.down('label');
    	me._msgLabel.setHtml(me.getMessage());
    },

    showMe: function(msg, title, callback) {
    	var me = this;  
        me.callback = callback;	

        if (!me._msgLabel) me._msgLabel = me.down('label[title="msglabel"]');
        if (!me._titleLabel) me._titleLabel = me.down('label[title="titlelabel"]');
        if (me._msgLabel) me._msgLabel.setHtml(msg);
        if (me._titleLabel) me._titleLabel.setHtml(title);
        me.show();
    }
});
