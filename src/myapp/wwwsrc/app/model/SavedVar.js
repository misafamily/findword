Ext.define('MyApp.model.SavedVar', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
                name:'name', // bonus or not: yes/no
                type:'string'
            },{
                name:'value', // bonus or not: yes/no
                type:'string'
            },
            {
            	name:'id',
            	type:'int',
            	fieldOption:' PRIMARY KEY AUTOINCREMENT'
            }],
        //identifier:'uuid', // needed to avoid console warnings!
        proxy: {
            //type: 'localstorage',
            //id  : 'MyAppFindword'
            type:'sqlitestorage',
    		dbConfig: {
	    		tablename:'vars',    			
    			dbQuery:'SELECT * from vars'
    		},
    		reader: {
               type: 'array'
            }
        }
    }
});