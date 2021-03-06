/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    //phoneStartupScreen: 'resources/images/Loading.jpg',
    name: 'MyApp',

    requires : ['Ext.MessageBox', 'MyApp.util.AppUtil', 'MyApp.util.offline.Connection', 'MyApp.util.offline.Proxy'],
    

    controllers: ['Main'],

    views: [
        'Main'
    ],

    models:['Question', 'SavedVar'],
    
    stores:['InitAppData', 'Questions'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
       
        
        this.onDeviceReady();
        document.addEventListener("deviceready", this.onDeviceReady, false);
        // Initialize the main view
       
    },
    
    onDeviceReady: function() {
        //if (navigator.splashscreen) navigator.splashscreen.show();
        //loadLeadbolt();

        Ext.Msg.defaultAllowedConfig.showAnimation = false;
        Ext.Msg.defaultAllowedConfig.hideAnimation = false;

        console.log('init..');

        AppUtil.showLoading();
        AppUtil.initLocalStorage(function() {
            console.log('initLocalStorage done');
            AppUtil.initAppData(function(){
                console.log('initAppData done');
                var store = Ext.getStore('Questions');
                store.changeQueryByType('default');
                store.load(function(records){
                    console.log('load done');
                    AppUtil.allQuestions = Ext.clone(store.data.items);
                    //Ext.fly('appLoadingIndicator').destroy();   
                    Ext.Viewport.add(Ext.create('MyApp.view.Main'));   
                    AppUtil.hideLoading(); 

                    Ext.defer(function(){
                        // Remove the splash screen
                         if (navigator.splashscreen) navigator.splashscreen.hide();      
                    },2000);
                });       
            });
        });
        
        /*

        <script type="text/javascript" src="http://ad.leadboltads.net/show_app_ad.js?section_id=291948098"></script>

        var loadLeadbolt = function()
        {
            // Initialize ad serving + AppFireworks
            AdController.loadAd("787294296");
            AppTracker.startSession("ZcRFVraioqqdk0Q3exlUDpDb5Oq3zbPr"); // analytics only
            loadDisplayAd();
        }

        var loadDisplayAd = function() {
            // Use this function elsewhere in your App to display a Leadbolt interstitial Ad
            AdController.loadAd("968718801");
        }*/



        var onBackKeyDown = function() {
            //alert('onBackKeyDown');
            MyApp.app.fireEvent('backbutton');
        }

        var onResume = function() {
           setTimeout(function() {
              // TODO: do your thing!
              //alert('onResume');
              MyApp.app.fireEvent('resume');
            }, 100);
        }

        var onPause = function() {
            //MyApp.app.fireEvent('pause');
        }

        document.addEventListener("backbutton", onBackKeyDown, false);
        //document.addEventListener("resume", onResume, false);
        //document.addEventListener("pause", onPause, false);
         
         
         //return;banner height: 48px
         /*
         if( window.plugins && window.plugins.AdMob ) {
            var admob_ios_key = 'ca-app-pub-2676331971568981/2132554150';
            var admob_android_key = 'ca-app-pub-2676331971568981/2132554150';
            var adId = (navigator.userAgent.indexOf('Android') >=0) ? admob_android_key : admob_ios_key;
            var am = window.plugins.AdMob;
        
            am.createBannerView( 
                {
                'publisherId': adId,
                'adSize': am.AD_SIZE.SMART_BANNER,//SMART_BANNER,//BANNER
                'bannerAtTop': false
                }, 
                function() {
                    Ext.defer(function(){
                        am.requestAd(
                            { 'isTesting':false }, 
                            function(){
                                am.showAd( true );
                            }, 
                            function(){ alert('failed to request ad'); }
                        );
                    },2000);
                    
                }, 
                function(){ alert('failed to create banner view'); }
            );
        } else {
          //alert('AdMob plugin not available/ready.');
        }*/
    }
});
