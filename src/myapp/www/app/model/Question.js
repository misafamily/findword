Ext.define('MyApp.model.Question', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name:'uid',//unique name to phan biet cau hoi
                type:'int'
            },
        	{
            	name:'word',//VIETLIENTU
            	type:'string'
            },
            {
                name:'fullword',//VIET LIEN TU
                type:'string'
            },
            {
                name:'thumb',//filename.jpg or png
                type:'string'
            },
            {
                name:'level', //1: easy, 2 normal, 3 hard
                type:'int'
            },
            {
            	name:'status', // answer or not: yes/no
            	type:'string',
                defaultValue: 'no'
            },
            {
                name:'bonus', // bonus or not: yes/no
                type:'string',
                defaultValue: 'no'
            },
            {
            	name:'id',
            	type:'int',
            	fieldOption:' PRIMARY KEY AUTOINCREMENT'
            }
        ],
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
    }
});
