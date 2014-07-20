Ext.define('MyApp.store.InitAppData', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.Question'],
    config: {	
		model:'MyApp.model.Question',
        proxy: {
	        type: "ajax",
	        url : "",
	        reader: {
	            type: "json",
	            rootProperty: "questions"
	        }
	    },
	    autoLoad: false
    }
});
