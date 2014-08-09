Ext.define('MyApp.view.pop.Alert', {
    extend: 'Ext.Container',
    xtype: 'pop_alert',
    requires: [
    ],
    config: {
        modal: true,
        centered: true,
    	//message: 'Your message here',
        //title: 'Your title here',
       	showAnimation: null,//{ type: 'popIn', duration: 200, easing: 'ease-out' },
	    hideAnimation: null,//{ type: 'popOut', duration: 100, easing: 'ease-out' },
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
	    	html: '',
            scrollable: true
	    }, {
            xtype: 'container',
            layout: {
                type: 'hbox',
                pack: 'center',
                align: 'center'
            },
            items:[{
                xtype: 'button',
                text: 'ĐÓNG',
                cls: 'button-icon button-pop',
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
