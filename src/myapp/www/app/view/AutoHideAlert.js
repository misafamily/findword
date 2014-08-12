Ext.define('MyApp.view.AutoHideAlert', {
    extend: 'Ext.Container',
    xtype: 'autohidealert',
    requires: [
    ],
    config: {
    	message: 'Your message here',
       	showAnimation: { type: 'fadeIn', duration: 200, easing: 'ease-out' },
	    hideAnimation: { type: 'fadeOut', duration: 100, easing: 'ease-out' },
	    cls: 'autohidealert-container',
	    hidden: true,
	    layout: {
	    	type: 'hbox',
	    	pack: 'center',
	    	align: 'center'
	    },
	    items:[{
	    	xtype: 'label',
	    	cls: 'message',
	    	html: ''
	    }],
        listeners: [
            {
                element: 'element',
                event: 'tap',
                fn: function() {
                    var me = this;
                    me.hide();
                    me._interval = null;
                }
            }
        ]
    },

    initialize: function() {
    	var me = this;
    	me.callParent(arguments);
    	me.setTop(window.innerHeight - 10 - 170 - 40);// - botton tab - alertHeight - 10 (margin)
    },

    updateMessage: function() {
    	var me = this;
    	if (!me._msgLabel) me._msgLabel = me.down('label');
    	me._msgLabel.setHtml(me.getMessage());
    },

    showMe: function() {
    	var me = this;  	
    	if (me._interval) clearTimeout(me._interval);
    	me._interval = Ext.defer(function() {
    		me.hide();
    		me._interval = null;
    	}, 2000);
        me.show();
    }
});
