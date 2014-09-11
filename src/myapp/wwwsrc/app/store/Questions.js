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
    			dbQuery:'SELECT * from question ORDER BY uid ASC'
    		},
    		reader: {
               type: 'array'
            }
       }
    },

    changeQueryByType: function(type) {
        var me = this;
        var query = 'SELECT * from question ORDER BY uid ASC';
        switch (type) {
            case 'all':
                query = 'SELECT * from question';
                break;
        }
        me.getProxy().config.dbConfig.dbQuery = query;//Ext.util.Format.format('SELECT * FROM question WHERE level = "{0}" AND status="no" ORDER BY id ASC', level);
    }
});
