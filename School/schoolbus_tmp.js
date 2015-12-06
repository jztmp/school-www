spatial.school.ui.SchoolBus = function(Config){

    this.form = new Ext.FormPanel({
        border:false,
        defaults: {anchor : '95%' },
        defaultType: 'textfield',
        labelWidth: 120,
        items: [
            {
                fieldLabel: 'Bus Number',
                allowBlank : false,
                name: 'BUS_NUMBER'
            },
            {
                fieldLabel: 'Bus Plate Number',
                allowBlank : false,
                name: 'BUS_PLATE_NUMBER'
            },
            {
                fieldLabel: 'Imei',
                allowBlank : false,
                name: 'IMEI'
            }
        ]
    });
    this.windowForm = new Ext.Window({
        width : 600,
        title : 'Add a bus',
        autoScroll : true,
        resizable  : false,
        closeAction :'hide',
        modal : false,
        plain: true,
        items:[this.form],
        buttons: [{
            text: 'Save',
            handler: function(){
                this.addBus();
            },
            scope:this
        },{
            text: 'Cancel',
            handler: function(){
                this.closeWindow();
            },
            scope:this
        }]
    });


    this.store = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({url:Sparknet.map.information.Config.configJson.url.api2}),
        reader:new Ext.data.JsonReader({
                root:'items',
                totalProperty:'total'},
            [
                {name: 'BUS_ID'},
                {name: 'BUS_NUMBER'},
                {name: 'BUS_PLATE_NUMBER'},
                {name: 'STATE'},
                {name: 'CREATE_TIME'},
                {name: 'IMEI'},
                {name: 'USER_ID'}
            ]
        ),
		
		
		listeners : {
						load : function(store ,records){
							var recordsSelected = []; 
							for(var i=0;i<records.length;i++){
                if (records[i].data.USER_ID){
                   recordsSelected.push(records[i]);
                } 
							} 
							bus_sm.selectRecords(recordsSelected, true);
						}
					}
		});

    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysBusByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"

    this.tbar= [{
            xtype : 'label',
            text : 'Bus Number : '
        },new Ext.form.ComboBox({
            store:new Ext.data.Store({
                proxy:new Ext.data.HttpProxy({url:url}),    //
                reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['BUS_ID','BUS_NUMBER']})       //
            }),
            displayField:'BUS_NUMBER',        //
            valueField : 'BUS_ID',
            typeAhead:false,        //
            triggerAction:'all',
            loadingText:'Loading...',    //
            hiddenName : 'Q_BUS_ID_hidden',
            mode:'remote',
            listWidth:250,            //
            pageSize:15,            //
            minChars:2,            //
            queryParam:'COMBOBOX_QUERY',        //
            queryDelay:200,            //
            autoShow : true,
            selectOnFocus : false,
            autoCreate : true,
            emptyText:'',
            triggerAction:'all',
            value:'',
            valueNotFoundText:'',
            allowBlank : true,
            // forceSelection:true,
            listeners : {

            },
            id:    'Q_BUS_ID_COMBOBOX'

        }),'-',{
            text : 'Search',
            handler: function(){
                this.search();
            },
            scope:this,
            iconCls: 'search'
        }/*,{
            text : 'Display all location',
            handler: function(){
                this.showLocation2();
            },
            scope:this,
            iconCls: 'show_location'
        }*/,'-',{
        text : 'Add Bus',
        handler: function(){
            this.openWindow();
        },
        scope:this,
        iconCls: 'bus_panel'
        },'-',{
        text : 'Delete Bus',
        handler: function(){
            this.deleteBus();
        },
        scope:this,
        iconCls: 'delete'
    },'-',{
        text : 'Last Location',
        handler: function(){
            this.showLocation();
        },
        scope:this,
        iconCls: 'show_location'
    },'-',{
        text : 'Track',
        handler: function(){
            this.track();
        },
        scope:this,
        iconCls: 'show_track'
    },'-',{
        text : 'Assigned Bus',
        handler: function(){
            this.assignedBus();
        },
        scope:this,
        iconCls: 'assigned_bus'
    },'-',{
        text : 'Notice',
        handler: function(){
            this.notice();
        },
        scope:this,
        iconCls: 'notice'
    }];
    // remove the button which belong to administrator
    if (POWER_ID != 0){
      this.tbar.splice(4,4);
    }

    if (POWER_ID == 1){
      this.tbar.splice(4,0,'-',{
        text : 'Make Default',
        handler: function(){
            this.saveDefault();
        },
        scope:this,
        iconCls: 'save_default'
       });
    }

    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 100,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.SchoolBus.superclass.constructor.call(this,Config);
}

var bus_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false,checkOnly :true});

Ext.extend(spatial.school.ui.SchoolBus,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    iconCls:'bus_panel',
    sm:bus_sm,
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        bus_sm,
        {
            header: 'Bus Number',
            dataIndex: 'BUS_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Plate Number',
            dataIndex: 'BUS_PLATE_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'IMEI',
            dataIndex: 'IMEI',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){
          //bus_sm.selectRow(rowIndex);
        },
        "render" : function(component){


        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"School Bus",

    search : function(){
        var bus_id = Ext.getCmp("Q_BUS_ID_COMBOBOX").getValue();
        var data = {
            BUS_ID : bus_id,
            USER_ID: USER_ID
        }
        Sparknet.map.moulton.action.loadGrid2("school.getBus","loadPageInfo",data,this.store,this.pagingBar);
    },

    selectedBus : null,

    showLocation : function(_ids,track,mark){

        var ids = new Array();
        if(_ids ){
            if(_ids instanceof Array ){
                ids = _ids;
            }else{
                ids.push(_ids);
            }
        }else{
            var records = this.getSelectionModel().getSelections();
            for(var i=0;i<records.length;i++){
                ids.push({BUS_ID : records[i].data.BUS_ID});
            }
        }

        var myObject = this;

        if(ids.length>0){
            var data = {
                BUSES : ids
            };
            var urlParams = {};
            var url = Sparknet.map.information.Config.configJson.url.api2;

            urlParams.SERVICENAME_PARAM = "SQL_SERVICE";
            urlParams.ACTIV_PARAM = "sqlMap";
            urlParams.PARAMES_PARAM =  Ext.encode({
                sqlId : "school-getGpsMemory",
                sqlActive : "loadList",
                daoName : "MemorySqlMap",
                data : data
            });

            if(!track){
                //如果不是跟踪
                spatial.school.ui.LoadMsg.wait("Getting the bus location...");

            }else{
                if(mark){
                    //如果不显示面板Stop Tracking
                    if(Ext.example.isShow){
                        Ext.example.colseMsg();
                    }
                }else{
                    if(!Ext.example.isShow){
                        Ext.example.creatMsg('Stop Tracking','');
                        Ext.example.showMsg();
                    }
                }

            }


            var ajax = new Sparknet.tool.Ajax({
                url:url,
                params:urlParams
            });
            ajax.setSuccessFunction(function(arry){
                if(!track) {
                    spatial.school.ui.LoadMsg.stopWait();
                }
                //console.log(result);

                if(arry.length>0){

                    var mapWidget = Fusion.getMapById('Map');
                    var mapName = mapWidget.getAllMaps()[0]._sMapname;
                    var scale = mapWidget.getScale();
                    Ext.getCmp('MainTab').activate("mapPanel");
                    zoomTo2(arry);
                	var specialBus = ['SNI-Mad-062','SNI-Mad-062'];
                    Ext.each(arry, function(v){
                    	Ext.each(specialBus,function(s){
                    		if (v.IMEI == s){
                    			v.special = true;
                    		}
                    	});
                    });
                    
                    if(track){
                        Sparknet.map.moulton.action.trackBusPanel2.show();
                        Sparknet.map.moulton.action.trackBusPanel2.setData(arry);
                        if(mark){
                            Sparknet.map.information.Config.addMarker3(arry,"bus",true,false,  myObject.selectedBus, true);
                        }else{
                            Sparknet.map.information.Config.addMarker3(arry,"bus",true,true,myObject.selectedBus, true);
                        }

                    }else{
                        Sparknet.map.moulton.action.trackBusPanel2.show();
                        Sparknet.map.moulton.action.trackBusPanel2.setData(arry);
                        Sparknet.map.information.Config.addMarker3(arry,"bus",true,false,myObject.selectedBus, true);
                    }

                }else{
                    if(!track){
                        Ext.MessageBox.alert("Tips",'No vehicle GPS data');
                    }
                }

            })
            ajax.send();
        }


    },
    trackRunner : null,
    trackBusId: null,
    isTrack : false,
    saveDefault: function() {
         var records = this.getSelectionModel().getSelections();
         if(records.length < 0) {
             return;
         }
         var ids = [];
         Ext.each(records, function(record, key) {
              ids.push(record.data.BUS_ID);
         });
         var data = {
          cars: ids,
          USER_ID: USER_ID
         };
         Sparknet.map.moulton.action.submitInforService("Data processing..."
          ,"SCHOOL_SERVICE","saveDefaultCar",data,function(){
                //
            });
    },
    track : function(id){
        var records = this.getSelectionModel().getSelections();
        if(records.length>0) {
            var ids = new Array();
            for (var i = 0; i < records.length; i++) {
                ids.push({BUS_ID: records[i].data.BUS_ID});
            }
            this.trackBusId = ids;
            this.isTrack = true;
            if (this.trackRunner) {
                this.trackRunner.stopAll();
            } else {
                this.trackRunner = new Ext.util.TaskRunner();
            }
            var myObject = this;
            var mySelectedBus = this.selectedBus;
            var task = {
                run: function () {
                    myObject.showLocation(null, true,false,mySelectedBus)
                },
                interval: 3000 //3 second
            }

            this.trackRunner.start(task);
        }
    },

    assignedBus : function(){
    	var bus_sm_a = new Ext.grid.CheckboxSelectionModel({singleSelect : false,checkOnly :true});
    	var gridConfig = {
        		sm:bus_sm_a,
        		store:new Ext.data.Store({
                    proxy:new Ext.data.HttpProxy({url:url}),    //
                    reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['BUS_ID','BUS_NUMBER']})       //
                }),
        	    loadMask:{msg:'Loading.....',removeMask:true},
        	    columns:[
        	        bus_sm_a,
        	        {
        	            header: 'Bus Number',
        	            dataIndex: 'BUS_NUMBER',
        	            width: 100,
        	            renderer:function(val){return ''+nulltoEmpty(val)+''},
        	            sortable: true
        	        },{
        	            header: 'Plate Number',
        	            dataIndex: 'BUS_PLATE_NUMBER',
        	            width: 100,
        	            renderer:function(val){return ''+nulltoEmpty(val)+''},
        	            sortable: true
        	        }],
        	};
    	var grid1 = new Ext.grid.GridPanel(gridConfig);
    	var grid2 = new Ext.grid.GridPanel(gridConfig);
    	new Ext.Window({
    	    title: 'Assign Bus',
    	    height: 500,
    	    width: 600,
    	    layout: {
    	    	type : 'hbox',
    	    	align: 'stretch'
    	    },
    	    items: [{grid1, flex :1},{grid2, flex :1}]
    	}).show(); 
    },

    stopTrack2 : function(img){
        if(this.isTrack){
            this.isTrack = false;
            this.trackRunner.stopAll();

            this.showLocation(null,true,true);
            if(img)
                img.src ="images/icons/start.png"
        }else{
            this.track();
            img.src ="images/icons/stop.png"
        }

    },

    stopTrack : function(){
        if(this.isTrack){
            this.isTrack = false;
            this.trackRunner.stopAll();
            this.showLocation(null,true,true);
        }

    },
    openWindow : function(){
        this.windowForm.show();
    },

    closeWindow : function(){
        this.windowForm.hide();
        this.form.getForm().reset();
    },
    addBus : function(){
        var myObject = this;
        var form =  this.form.getForm();
        if(form.isValid()){
            var data = form.getValues(false);
            Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","saveBus",data,function(){
                myObject.closeWindow();
                myObject.search();
            });
        }
    },
    deleteBus : function(){
        var myObject = this;
        Ext.MessageBox.confirm('Tip', 'To delete data?', function(btn, text){
            if (btn == 'yes'){
                var records =  myObject.getSelectionModel().getSelections();
                var arry = []
                for(var j=0;j<records.length;j++) {
                    arry.push(records[j].data )
                }
                var data = {"BUSES":arry};
                Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","deleteBus",data,function(){
                    myObject.search();
                });
            }
        });
    },
    reset : function(){
        this.form.getForm().reset();
    }
});