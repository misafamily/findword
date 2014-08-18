Ext.define('MyApp.model.SavedVar', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['name', 'value'],
        identifier:'uuid', // needed to avoid console warnings!
        proxy: {
            type: 'localstorage',
            id  : 'MyAppFindword'
        }
    }
});