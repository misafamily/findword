Ext.define('MyApp.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'MyApp.view.Home',
        'MyApp.view.Game'
    ],
    config: {
        layout: {
            type: 'card'
        },
        items: [
            {
                xtype: 'home'
            },
            {
                xtype: 'game'
            }
        ]
    }
});
