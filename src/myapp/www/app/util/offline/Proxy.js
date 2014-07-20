Ext.define('MyApp.util.offline.Proxy', {
    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.sqlitestorage',
    alternateClassName: 'Ext.data.SqliteStorageProxy',

    onCallbackError: null,

    constructor: function (config) {
        this.callParent([config]);

        //ensures that the reader has been instantiated properly
        this.setReader(this.reader);
        var me = this;
        me.callParent([this]);
        me.createTable();

    },
    //inherit docs
    create: function (operation, callback, scope) {
        //console.log("PROXY create");
        var me = this;
        var records = me.getTableFields(operation.getRecords()),
            length = records.length,
            id, record, i,
            model = this.getModel(),
            idProperty = model.getIdProperty();
        //console.log(idProperty,"model")
        operation.setStarted();

        var recordDone = 0;
        var recordJobDone = function() {
            recordDone ++;
            if (recordDone >= length) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            }
        }

        for (var i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record, me.config.dbConfig.tablename, idProperty, recordJobDone);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function' && length == 0) {
            callback.call(scope || this, operation);
        }
    },
    //inherit docs
    update: function (operation, callback, scope) {
        //console.log("PROXY update");
        var me = this;
        var records = this.getTableFields(operation.getRecords()),
            length = records.length,
            record, id, i, tbl_Id = me.getModel().getIdProperty();
        //console.log(me.getModel().getClientIdProperty(),"primaryKey");
        operation.setStarted();

        var recordDone = 0;
        var recordJobDone = function() {
            recordDone ++;
            if (recordDone >= length) {
                if (typeof callback == 'function') {
                    callback.call(scope || me, operation);
                }
            }
        }

        for (var i = 0; i < length; i++) {
            record = records[i];
            this.updateRecord(record, me.config.dbConfig.tablename, tbl_Id, recordJobDone);
        }
        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function' && length == 0) {
            callback.call(scope || this, operation);
        }
    },
    //inherit docs
    read: function (operation, callback, scope) {
        var me = this,
        fields = [],
        values = [];

        Ext.iterate(operation.getParams(), function (k, v) {
            fields.push(k + ' = ?');
            values.push(v);
        });

        var sql = operation.config.query || me.config.dbConfig.dbQuery || 'SELECT * FROM ' + me.config.dbConfig.tablename + '';
        //sql  = "Select category_translation.category_id, category.title, category_translation.name, category.type, category_translation.locale  from category_translation, category where category_translation.category_id = category.cat_id";
        if (fields.length) {
            sql = sql + ' WHERE ' + fields.join(' AND ');
        }
        var onSucess, onError;
        onSucess = function (tx, results) {
            me.applyDataToModel(tx, results, operation, callback, scope);
        };

        onError = function (tx, err) {
            console.log('read onError: ');
            console.log(err);
            me.throwDbError(tx, err);
        };
        me.queryDB(me.getDb(), sql, onSucess, onError, values);
    },
    //inherit docs
    destroy: function (operation, callback, scope) {
        console.log("PROXY destroy");
        var me = this;
        var records = (operation.records != undefined ? operation.records : operation.getRecords()),
            length = records.length,
            i, tbl_Id = me.getModel().getIdProperty();

        for (var i = 0; i < length; i++) {
            this.removeRecord(records[i].data[tbl_Id], me.config.dbConfig.tablename, tbl_Id, false);
        }

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },
    /**
    *@private
    * Get Database instance
    */
    getDb: function () {
        //return Ext.DbConnection.dbConn || this.config.dbConfig.dbConn;
        //return this.config.dbConfig.dbConn.dbConn;
        return AppUtil.getDbConnection().dbConn;
    },
    /**
    *@private
    *Creates table if not exists
    */
    createTable: function () {
        var me = this;
        me.getDb().transaction(function (tx) {

            var onError = function (tx, err) {
                console.log('createTable onError: ');
                console.log(err);
                me.throwDbError(tx, err);
            };

            var onSucess = function (tx, results) {
                //console.log("success");
            };

            var getFieldConfig = function(key, fields) {
                var result = null;
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].getName() == key) 
                        return fields[i].config;
                }
            };

            //auto check to insert new columns
            var checkTableSchema = function(tx, results) {
                var records = me.parseData(tx, results);
                if (records.length > 0) {
                    var rec = records[0];
                    var keys = [];
                    var Model = me.getModel();
                    var newKeys = Model.getFields().keys;                    
                    for (var key in rec) {
                        keys.push(key);
                    }

                    var newfields = Ext.Array.difference(newKeys, keys);
                    if (newfields.length > 0) {
                        var fields = Model.getFields().items;
                        Ext.each(newfields, function(field, i){
                            var fconfig = getFieldConfig(field, fields);
                            if (fconfig) {
                                me.addColumn(fconfig.name, fconfig.type, fconfig.fieldOption);
                            }
                        });
                    }
                    /*var oldfields = Ext.Array.difference(keys, newKeys);
                    if (oldfields.length > 0) {
                        Ext.each(oldfields, function(field, i){
                            me.dropColumn(field);
                        });
                    }*/
                }
            };

            var createTableSchema = function () {
                //console.log(me.constructFields());
                var createsql = 'CREATE TABLE IF NOT EXISTS ' + me.config.dbConfig.tablename + '(' + me.constructFields() + ')';
                //console.log(createsql);
                tx.executeSql(createsql, [], onSucess, onError);
            };
            //console.log('me.constructFields: ', me.constructFields());
            var tablesql = 'SELECT * FROM ' + me.config.dbConfig.tablename + ' LIMIT 1';
            //console.log(tablesql);
            tx.executeSql(tablesql, [], checkTableSchema, createTableSchema);

        });

    },
    /**
    * @private
    * Get reader data and set up fields accordingly
    * Used for table creation only
    * @return {String} fields separated by a comma
    */
    constructFields: function () {
        var me = this,
            m = me.getModel(),
            fields = m.prototype.fields.items,
            flatFields = [];
        Ext.each(fields, function (f) {
            if ((f.config.isTableField || !Ext.isDefined(f.config.isTableField))) {
                var name = f.getName();
                var type = f.config.type;
                var fieldoption = (f.config.fieldOption) ? f.config.fieldOption : '';
                type = type.replace(/int/i, 'INTEGER')
                        .replace(/string/i, 'TEXT')
                        .replace(/date/i, 'DATETIME');

                //console.log(name);
                flatFields.push(name + ' ' + type + ' ' + fieldoption);

                /*if((f.getName() != m.getIdProperty()))
                {
                flatFields.push(name + ' ' + type+' '+fieldoption);
                }
                else
                {
                //flatFields.push(name + ' ' + type+' PRIMARY KEY ');    
                flatFields.push(name + ' ' +' INTEGER PRIMARY KEY AUTOINCREMENT ');                 
                }*/
            }
        });
        return flatFields.join(',');
    },
    /**
    * function to return records w.r.t to table fields. If model has fields
    * which is not table field name, it will break create and update functionalitites.This looks for field property "isTableField"
    */
    getTableFields: function (records) {
        var newrecords = [], removedField = [], length = records.length,
            m = this.getModel(), modelFields = m.prototype.fields.items;
        Ext.each(modelFields, function (item, index) {
            if (item.config.isTableField == false || (item.getName() == m.getIdProperty())) {
                //console.log(item);
                removedField.push(item.getName());
            }
        });


        for (var i = 0; i < length; i++) {
            record = records[i];
            //console.log(removedField,"remove");
            Ext.each(removedField, function (item, index) {
                //console.log(record.getData(),"record");
                //console.log(item,"item");
                delete record.getData()[item];
            });
            //console.log(record);
            newrecords.push(record);
        }
        //console.log('getTableFields: ', newrecords);
        return newrecords;
    },
    /**
    * execute sql statements
    * @param {Object} dbConn Database connection Value
    * @param {String} sql Sql Statement
    * @param {Function} successcallback  success callback for sql execution
    * @param {Function} errorcallback  error callback for sql execution
    * @param {Array}  params  sql statement parameters
    * @param {Function} callback  additional callback
    */
    queryDB: function (dbConn, sql, successcallback, errorcallback, params, callback) {
        var me = this;
        dbConn.transaction(function (tx) {
            if (typeof callback == 'function') {
                callback.call(scope || me, results, me);
            }
            if (!params) params = [];
            tx.executeSql(
            sql, (params ? params : []), successcallback, errorcallback);
        });
    },
    /**
    * @private
    * Created array of objects, each representing field=>value pair.
    * @param {Object} tx Transaction
    * @param {Object} rs Response
    * @return {Array} Returns parsed data
    */
    parseData: function (tx, rs) {

        var rows = rs.rows,
            data = [],
            i = 0;
        for (; i < rows.length; i++) {
            data.push(rows.item(i));
        }
        return data;
    },
    applyData: function (data, operation, callback, scope) {
        var me = this;
        /*operation.resultSet = new Ext.data.ResultSet({
        records: data,
        total: data.length,
        loaded: true
        });*/
        operation.setSuccessful();
        operation.setCompleted();
        operation.setResultSet(Ext.create('Ext.data.ResultSet', {
            records: data,
            total: data.length,
            loaded: true
        }));
        //console.log(operation);
        //finish with callback
        operation.setRecords(data);
        if (typeof callback == "function") {
            callback.call(scope || me, operation);
        }
    },
    applyDataToModel: function (tx, results, operation, callback, scope) {
        var me = this,
        Model = me.getModel(),
        fields = Model.getFields().items,
        primarykey = Model.getIdProperty();
        var records = me.parseData(tx, results);
        var storedatas = [];
        if (results.rows && records.length) {
            for (var i = 0; i < results.rows.length; i++) {
                var data = new Model(records[i], records[i][primarykey]);
                storedatas.push(data);
            }
            operation.setSuccessful();
        }
        me.applyData(storedatas, operation, callback, scope);
    },

    /**
    * Output Query Error
    * @param {Object} tx Transaction
    * @param {Object} rs Response
    */
    throwDbError: function (tx, err) {
        //console.log(this.type + "----" + err.message);
        var me = this;
        if (me.onCallbackError) me.onCallbackError(tx, err);
    },
    /**
    * Saves the given record in the Proxy.
    * @param {Ext.data.Model} record The model instance
    */
    setRecord: function (record, tablename, primarykey, recordJobDone) {
        //console.log(primarykey);
        //console.log(record.internalId,"recprd1");
        //console.log(record.getData().id,"recprd2");
        var me = this,
            rawData = record.getData(),
            Model = me.getModel(),
            keys = Model.getFields().keys,
            fields = [],
            values = [],
            placeholders = [],

            onSuccess = function (tx, rs) {
                //console.log('setRecord onSuccess');
                //console.log(rs,"balh");
                var returnrecord = record,
                insertId = rs.insertId;
                returnrecord.data[primarykey] = insertId;
                returnrecord.internalId = insertId;
                returnrecord.commit(true);

                if (typeof recordJobDone == 'function') recordJobDone();
            },

            onError = function (tx, err) {
                console.log('setRecord onError: ');
                console.log(err);
                me.throwDbError(tx, err);
            };

        //extract data to be inserted
        for (var i in rawData) {
            //console.log(rawData[i],i);
            if (rawData[i]  && keys.indexOf(i) > -1) {
                //console.log(rawData[i],i);
                //if(i != primarykey){
                fields.push(i);
                values.push(rawData[i]);
                placeholders.push('?');
                //}
            }
        }
        Ext.iterate(rawData, function (a, b) {
            //console.log(a,b)    
        });
        //console.log(fields,"fields");
        //console.log(values,"values");
        var sql = 'INSERT INTO ' + tablename + '(' + fields.join(',') + ') VALUES (' + placeholders.join(',') + ')';
        //console.log(sql,"sql");
        me.queryDB(me.getDb(), sql, onSuccess, onError, values);

        return true;
    },

    /**
    * Updates the given record.
    * @param {Ext.data.Model} record The model instance
    */
    updateRecord: function (record, tablename, primarykey, recordJobDone) {
        var me = this,
            Model = me.getModel(),
            keys = Model.getFields().keys,
            id = record.get(primarykey),
            key = primarykey,
            modifiedData = record.modified,
            newData = record.data,
            pairs = [],
            values = [],
            onSuccess = function (tx, rs) {
                //add new record if id doesn't exist
                //console.log('updateRecord onSuccess: ' + rs.rowsAffected);
                if (rs.rowsAffected == 0) {
                    me.setRecord(record, tablename, primarykey);
                }
                else {
                    record.commit(true);
                }

                if (typeof recordJobDone == 'function') recordJobDone();
            },
            onError = function (tx, err) {
                console.log('updateRecord onError: ');
                console.log(err);
                me.throwDbError(tx, err);
            };

        // sick hack got work around something clobbering the primary key
        if (!id) {
            id = record.getId();
            if (!id) {
                record.setId(record.internalId);
                id = record.internalId;
            }
        }

        //console.log(Model.getFields());

        for (var i in newData) {
            if (i != primarykey && keys.indexOf(i) > -1) {
                pairs.push(i + ' = ?');
                values.push(newData[i]);
            }
        }

        values.push(id);
        var sql = 'UPDATE ' + tablename + ' SET ' + pairs.join(',') + ' WHERE ' + key + ' = ?';
        me.queryDB(me.getDb(), sql, onSuccess, onError, values);
        return true;
    },
    /**
    * @private
    * Physically removes a given record from the object store. 
    * @param {Mixed} id The id of the record to remove
    */
    removeRecord: function (key, value, callback, opts) { //opts: [ ['key', 'value]]
        var me = this,
            values = [],
            onSuccess = function (tx, rs) {
                if (callback) if (typeof callback === 'function') callback();
            },
            onError = function (tx, err) {
                console.log('removeRecord onError: ');
                console.log(err);
                me.throwDbError(tx, err);
            };
        var sql = 'DELETE FROM ' + me.config.dbConfig.tablename + ' WHERE ' + key + ' = ?';
        values.push(value);

        if (opts) {
            Ext.Array.each(opts, function (value, index) {
                sql += ' AND ' + value[0] + ' = ?';
                values.push(value[1]);
            });
        }
        me.queryDB(me.getDb(), sql, onSuccess, onError, values);
        return true;
    },

    findRecord: function (field, value, callback, opts) { //opts: [ ['key', 'value]]
        var me = this,
            values = [],
            Model = me.getModel(),
            primarykey = Model.getIdProperty();
        onSuccess = function (tx, rs) {
            //console.log(rs);
            var storedatas = [];
            var records = me.parseData(tx, rs);
            if (rs.rows && records.length) {
                for (var i = 0; i < rs.rows.length; i++) {
                    var data = new Model(records[i], records[i][primarykey]);
                    storedatas.push(data);
                }
            }
            if (callback) callback(storedatas);
        },
            onError = function (tx, err) {
                console.log('findRecord onError: ');
                console.log(err);
                me.throwDbError(tx, err);
            };
        var sql = 'SELECT * FROM ' + me.config.dbConfig.tablename + ' WHERE ' + field + ' = ?';
        values.push(value);

        if (opts) {
            Ext.Array.each(opts, function (value, index) {
                sql += ' AND ' + value[0] + ' = ?';
                values.push(value[1]);
            });
        }
        //console.log(sql);
        me.queryDB(me.getDb(), sql, onSuccess, onError, values);
        return true;
    },

    /**
    * Destroys all records stored in the proxy with field NOT IN values
    */
    resetTable: function (callback, field, values) {
        var me = this;
        var sql = 'DELETE FROM ' + me.config.dbConfig.tablename;
        if (field) {
            sql += ' WHERE ' + field + ' NOT IN (' + values.join(',') + ')';
        }
        me.queryDB(me.getDb(), sql, callback, function () { });
        return true;
    },
    addColumn: function (fieldname, type, fieldoption) {
        var me = this;
        console.log('[PROXY] addColumn: ' + fieldname);
        //fieldoption = fieldoption || '';
        type = type || 'string';
        type = type.replace(/int/i, 'INTEGER')
                        .replace(/string/i, 'TEXT')
                        .replace(/date/i, 'DATETIME');
        var sql = 'ALTER TABLE ' + me.config.dbConfig.tablename + " ADD COLUMN " + fieldname + " " + type;
        
        if (fieldoption) sql += ' ' + fieldoption;

        me.queryDB(me.getDb(), sql, function () { }, function () { });
        return true;
    },

    dropColumn: function (fieldname) {
        console.log('[PROXY] dropColumn: ' + fieldname + ' DOES NOT WORK WITH SQLLite');
        /*var me = this;      
        console.log('[PROXY] dropColumn: ' + fieldname);
        var sql = 'ALTER TABLE ' + me.config.dbConfig.tablename + " DROP COLUMN " + fieldname; 
        console.log(sql);       
        me.queryDB(me.getDb(), sql, function () { }, function () { });
        return true;*/
    },

    getMaxId: function (callback) {
        var me = this;
        var sql = 'SELECT * FROM ' + me.config.dbConfig.tablename + " ORDER BY id DESC LIMIT 1";
        var Model = me.getModel(),
            primarykey = Model.getIdProperty();
        var onSuccess = function (tx, rs) {
            //console.log(rs);
            var storedatas = [];
            var records = me.parseData(tx, rs);
            if (rs.rows && records.length) {
                for (var i = 0; i < rs.rows.length; i++) {
                    var data = new Model(records[i], records[i][primarykey]);
                    storedatas.push(data.data.id);
                }
            }
            if (callback) callback(storedatas[0]);
        };
        me.queryDB(me.getDb(), sql, onSuccess, function () { });
        return true;
    }
});
