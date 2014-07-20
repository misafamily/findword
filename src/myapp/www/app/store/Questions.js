Ext.define('MyApp.store.Questions', {
    extend: 'Ext.data.Store',
    requires: ['MyApp.model.Question'],
    config: {	
		model:'MyApp.model.Question',
	    autoLoad: false,
	    proxy:{
    		type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'question',    			
    			dbQuery:'SELECT * from question WHERE status="no" ORDER BY id ASC'
    		},
    		reader: {
               type: 'array'
            }
       }
    },

    changeQueryByType: function(level) {
        var me = this;
        me.getProxy().config.dbConfig.dbQuery = Ext.util.Format.format('SELECT * FROM question WHERE level = "{0}" AND status="no" ORDER BY id ASC', level);
    }
});
