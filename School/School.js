

Ext.QuickTips.init();
// turn on validation errors beside the field globally
Ext.form.Field.prototype.msgTarget = 'side';

function transform(x,y){
    var sourceProj = new Proj4js.Proj("EPSG:4326");
    //var destProj = new Proj4js.Proj("EPSG:3857");
    var destProj = new Proj4js.Proj("EPSG:900913");
    var p = new Proj4js.Point( x,y);
    Proj4js.transform(sourceProj,destProj,p);
    return p;
}


function zoomTo2(arry){
    if(arry.length==1){
        var x = arry[0].LONGITUDE;
        var y = arry[0].LATITUDE;


        var p = transform(x,y);
        x = p.x;
        y = p.y;

        var mapWidget = Fusion.getMapById('Map');
        var mapName = mapWidget.getAllMaps()[0]._sMapname;
        var scale = mapWidget.getScale();
        var extent = mapWidget.getCurrentExtents();
        //console.log(extent);
        var left = extent.left;
        var top = extent.top;
        var right = extent.right;
        var bottom =  extent.bottom;
        if(x>left && x<right && y<top && y>bottom){

        }else{
            ZoomToView(x,y, scale, true);
        }
    }
}

function nulltoEmpty(val) {
    if (Ext.isEmpty(val)) {
        val = "";
    } else if (val == "null") {
        val = "";
    }
    return val;
}

function getInfo(datetime) {

	var nowdate = new Date(datetime);
	var startdate = new Date(datetime);
	var enddate = new Date(datetime);
	
	// MAR SECEND SUN
	startdate.setMonth(2,1);	
	startdate.setHours(2,0,0,0);
	//NOV FRIST SUN
	enddate.setMonth(10,1);	
	enddate.setHours(2,0,0,0);

	var w1 = startdate.getDay();
	var w2 = enddate.getDay();

	if (w1 == 0) {
		startdate.setMonth(2, 8);
	}else{
		var d1 = 7 - w1 + 8;
		startdate.setMonth(2, d1);
	}

	if (w2 != 0) {
		var d2 = 7 - w2 + 1;
		enddate.setMonth(10, d2);
	}

	if (nowdate>=startdate && nowdate<=enddate){
		subtime = 5;
	}else{
		subtime = 6;
	}
	
	return subtime;
}

function time(val) {

    var timeObject = Sparknet.map.information.Config.configJson.GPS_TIME_ZONE;
	/*
    var summerTime =  new Date(timeObject.Summer.end);
    var summerBase = timeObject.Summer.base;
    var winterTime =  new Date(timeObject.Winter.end);
    var winterBase = timeObject.Winter.base;
	*/
    if (Ext.isEmpty(val)) {
        val = "";
    } else if (val == "null") {
        val = "";
    }
	
    if(val!=""){
        val = val.replace(/-/g, "/");
        var dt = new Date(val);
		var subtime = getInfo(dt);
		dt.setHours(dt.getHours()-subtime);
        val = dt.format('m-d-y  H:i:s');
    }
	/*
	if(val!=""){
        val = val.replace(/-/g, "/");
        var dt = new Date(val);
        if(dt<=summerTime){
            dt.setHours(dt.getHours()-summerBase);
        }
        else if(dt<=winterTime){
            dt.setHours(dt.getHours()-winterBase);
        }
        val = dt.format('m-d-y  H:i:s');
    }*/

    return val;
}

function time22(val) {
    var dt;
    var timeObject = Sparknet.map.information.Config.configJson.GPS_TIME_ZONE;
	/*
    var summerTime =  new Date(timeObject.Summer.end);
    var summerBase = timeObject.Summer.base;
    var winterTime =  new Date(timeObject.Winter.end);
    var winterBase = timeObject.Winter.base;
	*/
        if(Ext.isDate(val)){
            dt = val;			
			var subtime = getInfo(dt);
			dt.setHours(dt.getHours()+subtime);			
        }
		/*
		if(dt<=summerTime){
            dt.setHours(dt.getHours()+summerBase);
        }

        else if(dt<=winterTime){
            dt.setHours(dt.getHours()+winterBase);
        }*/
		
    return dt;
}

function time2(val) {
    var dt;
	/*
    var timeObject = Sparknet.map.information.Config.configJson.GPS_TIME_ZONE;
    var summerTime =  new Date(timeObject.Summer.end);
    var summerBase = timeObject.Summer.base;
    var winterTime =  new Date(timeObject.Winter.end);
    var winterBase = timeObject.Winter.base;
	*/
    if (Ext.isEmpty(val)) {
        val = "";
    } else if (val == "null") {
        val = "";
    }
    if(val!=""){
        if(!Ext.isDate(val)){
            val = val.replace(/-/g, "/");
            dt = new Date(val);
        }else{
            dt = val;
        }
		
		var subtime = getInfo(dt);
		dt.setHours(dt.getHours()+subtime);
		
		/*
        if(dt<=summerTime){
            dt.setHours(dt.getHours()+summerBase);
        }
        else if(dt<=winterTime){
            dt.setHours(dt.getHours()+winterBase);
        }
		*/
        val = dt.format('m-d-y  H:i:s');
    }

    return val;
}


function speed(val) {
    if (Ext.isEmpty(val)) {
        val = "";
    } else if (val == "null") {
        val = "";
    } else if(isNaN( parseFloat(val))) {
        val = "";
    } else {
        //val =   (parseFloat(val)/1.60934).toFixed(2);
		val =   (parseFloat(val)).toFixed(2);
    }
    return val;
}


function speed2(val) {
    if (Ext.isEmpty(val)) {
        val = "";
    } else if (val == "null") {
        val = "";
    } else if(isNaN( parseFloat(val))) {
        val = "";
    } else {
        //val =   (parseFloat(val)*1.60934).toFixed(2);
		val =   (parseFloat(val)).toFixed(2);
    }
    return val;
}

function colorImage(val) {
    var a = nulltoEmpty(val);
    if (a != "") {
        a = '<image src="../mark/' + a + '.gif">';
    }
    return a
}
function nulltoEmpty2(val) {
    if (Ext.isEmpty(val)) {
        val = "0.0";
    } else if (val == "null") {
        val = "0.0";
    } else {
        val = isNaN(parseFloat(val)) ? 0 : parseFloat(val);
        val = val.toFixed(2);
    }

    return val;
}

function nulltoEmpty3(val,type) {
    if (Ext.isEmpty(val)) {
        val = "";
    } else if (val == "null") {
        val = "";
    } else {
        if(type==1){

            val= val.substr(0,10);


        }
        else{

            val= val.substr(val.indexOf(" ")+1,8);

        }
    }

    return val;
}


Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.MapSelectedField
 * @extends Ext.form.TextField
 * Creates a file upload field.
 * @xtype mapselectedfield
 */
Ext.ux.form.MapSelectedField = Ext.extend(Ext.form.TextField,  {
    /**
     * @cfg {String} buttonText The button text to display on the upload button (defaults to
     * 'Browse...').  Note that if you supply a value for {@link #buttonCfg}, the buttonCfg.text
     * value will be used instead if available.
     */
    buttonText: 'Click on the map...',
    /**
     * @cfg {Boolean} buttonOnly True to display the file upload field as a button with no visible
     * text field (defaults to false).  If true, all inherited TextField members will still be available.
     */
    buttonOnly: false,
    /**
     * @cfg {Number} buttonOffset The number of pixels of space reserved between the button and the text field
     * (defaults to 3).  Note that this only applies if {@link #buttonOnly} = false.
     */
    buttonOffset: 3,
    /**
     * @cfg {Object} buttonCfg A standard {@link Ext.Button} config object.
     */

    // private
    readOnly: true,

    /**
     * @hide
     * @method autoSize
     */
    autoSize: Ext.emptyFn,

    // private
    initComponent: function(){
        Ext.ux.form.MapSelectedField.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event mapselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {Ext.ux.form.MapSelectedField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'mapselected'
        );
    },

    // private
    onRender : function(ct, position){
        Ext.ux.form.MapSelectedField.superclass.onRender.call(this, ct, position);

        this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-map-wrap'});
        this.el.addClass('x-form-map-text');
        this.el.dom.removeAttribute('name');
        this.createFileInput();

        var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
            text: this.buttonText
        });
        this.button = new Ext.Button(Ext.apply(btnCfg, {
            renderTo: this.wrap,
            cls: 'x-form-map-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '')
        }));

        if(this.buttonOnly){
            this.el.hide();
            this.wrap.setWidth(this.button.getEl().getWidth());
        }

        this.bindListeners();
        this.resizeEl = this.positionEl = this.wrap;
    },

    bindListeners: function(){
        this.fileInput.on({
            scope: this,
            mouseenter: function() {
                this.button.addClass(['x-btn-over','x-btn-focus'])
            },
            mouseleave: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            mousedown: function(){
                this.button.addClass('x-btn-click')
            },
            mouseup: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            change: function(){
                var v = this.fileInput.dom.value;
                this.setValue(v);
                this.fireEvent('mapselected', this, v);
            }
        });
    },

    createFileInput : function() {
        this.fileInput = this.wrap.createChild({
            id: this.getFileInputId(),
            name: this.name||this.getId(),
            cls: 'x-form-map',
            tag: 'input',
            type: 'text',
            size: 1
        });
    },

    reset : function(){
        if (this.rendered) {
            this.fileInput.remove();
            this.createFileInput();
            this.bindListeners();
        }
        Ext.ux.form.MapSelectedField.superclass.reset.call(this);
    },

    // private
    getFileInputId: function(){
        return this.id + '-map';
    },

    // private
    onResize : function(w, h){
        Ext.ux.form.MapSelectedField.superclass.onResize.call(this, w, h);

        this.wrap.setWidth(w);

        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },

    // private
    onDestroy: function(){
        Ext.ux.form.MapSelectedField.superclass.onDestroy.call(this);
        Ext.destroy(this.fileInput, this.button, this.wrap);
    },

    onDisable: function(){
        Ext.ux.form.MapSelectedField.superclass.onDisable.call(this);
        this.doDisable(true);
    },

    onEnable: function(){
        Ext.ux.form.MapSelectedField.superclass.onEnable.call(this);
        this.doDisable(false);

    },

    // private
    doDisable: function(disabled){
        this.fileInput.dom.disabled = disabled;
        this.button.setDisabled(disabled);
    },


    // private
    preFocus : Ext.emptyFn,

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    }

});

Ext.reg('mapselectedfield', Ext.ux.form.MapSelectedField);

// backwards compat
Ext.form.MapSelectedField = Ext.ux.form.MapSelectedField;



Ext.namespace('Sparknet.map.moulton');
Sparknet.map.moulton.data ={
    sex : [['male',"male"],['female',"female"]],

    role:[['0',"Administrator"],['1',"Teacher"],['2',"Parent"]]
}
Sparknet.map.moulton.action = {

       log : false,

      before : function(){

      },
      after : function(){
          var mapWidget = Fusion.getMapById('Map');
          mapWidget.registerForEvent(Fusion.Event.MAP_SELECTION_ON, Sparknet.map.moulton.action.selectionHandler);
		  var map = mapWidget.oMapOL;
		  map.events.register("zoomend", undefined,Sparknet.map.moulton.action.zoomend);
          var grid = Sparknet.map.information.Config.SelectGrid;
          grid.getStore().addListener("load",this.loadAfter,this);

          var arr = Ext.query("img[class=jxButtonIcon TaskPane_tasks]");
          if(arr.length>0){
              var rer = arr[0].parentNode.parentNode.parentNode.parentNode.parentNode;
              var childNodes = rer.childNodes;
              //console.log(rer)
              for(var j=0;j<3;j++){
                  rer.removeChild(childNodes[0])
              }

          }
          this.userPanel =  new spatial.school.ui.User();
          this.schoolBusPanel =  new spatial.school.ui.SchoolBus();
          this.studentPanel = new spatial.school.ui.Student();
          this.schoolPanel = new spatial.school.ui.School();
          this.studentHistoryPanel = new spatial.school.ui.StudentHistory();
          this.busHistoryPanel = new spatial.school.ui.BusHistory();
          this.driverPanel = new spatial.school.ui.Driver();
          this.driverHistoryPanel = new spatial.school.ui.DriverHistory();
          var tab2 = Ext.getCmp('MainTab');
		  if (POWER_ID == 0){
				tab2.add(this.userPanel);
		  }          
          tab2.add(this.schoolBusPanel);
          tab2.add(this.busHistoryPanel);
          tab2.add(this.studentPanel);
          tab2.add(this.studentHistoryPanel);
          tab2.add(this.driverPanel);
          tab2.add(this.driverHistoryPanel);
          tab2.add(this.schoolPanel);

          var tab3 = Ext.getCmp('TaskTabPanel');
          this.trackBusPanel = new spatial.school.ui.TrackBus();
          this.trackStudentPanel = new spatial.school.ui.TrackStudent();
          this.trackBusPanel2 = new spatial.school.ui.TrackBus2
          tab3.add(this.trackBusPanel);
          tab3.add( this.trackBusPanel2);

          tab3.add(this.trackStudentPanel);
          //Ext.getCmp("west-panel").collapse();



      },
	  zoomend : function(){
		 var mapWidget = Fusion.getMapById('Map');
		 var map = mapWidget.oMapOL;
		 var p = mapWidget.getCurrentCenter();
         var scale = map.getScale();		
		if(map.getLayer("OpenLayers.Layer.VirtualEarth_13")){
			if(scale<20000){		 
				map.getLayer("OpenLayers.Layer.VirtualEarth_13").setVisibility(false);
			}else{
				map.getLayer("OpenLayers.Layer.VirtualEarth_13").setVisibility(true);
			}	
		}
        	
		//console.log("===================")  
      },
      query_layer : null,
      query : function(){
          var typeCombox =  Ext.getCmp("typeCombox");
          var key = Ext.getCmp("anyWords").getValue();
          var type = typeCombox.getValue();
          this.query_layer = "boaz-add";

          var filter = type +" LIKE '%"+key+"%' ";
          if(type == 'OWNER' || type == 'PROPIN' || type == 'SUBDIVNAME'){
              this.query_layer = 'boaz-parcel'
              if(type == 'PROPIN'){
                  var filter = type +" = "+key;
              }
          }

          var mapWidget = Fusion.getMapById('Map');
          var map = mapWidget.getAllMaps()[0];
          var project = Fusion.getQueryParam("project");
          var key = Fusion.getQueryParam("key")
          var params = {};
          params.layer = this.query_layer;
          params.filter = filter;
          params.mapsessionIdMD5 = key;
          params.sMapname = map._sMapname;

          var url = Sparknet.map.information.Config.basicUrl+project+"/query.jsp";
          var ajax = new Sparknet.tool.Ajax({
              url: url,
              params:params
          });
          ajax.setSuccessFunction(function(responseArray){
              var searchPanel = Sparknet.map.information.Config.SearchGrid;
              var store = searchPanel.getStore();
              store.loadData(responseArray);
              var typeCombox =  Ext.getCmp("typeCombox").getValue(0);
              if(type == 'OWNER' || type == 'PROPIN' || type == 'SUBDIVNAME'){
                  var clum1 = Sparknet.map.information.Config.columns_pacel;
                  searchPanel.reconfigure(store,clum1);
              }else{
                  var clum2 = Sparknet.map.information.Config.columns_address;
                  searchPanel.reconfigure(store,clum2);
              }


          })
          ajax.request();
      },
    selectionHandler : function(){
        var mapWidget = Fusion.getMapById('Map');
        var myObject = this;
        mapWidget.getSelection(
            OpenLayers.Function.bind(Sparknet.map.moulton.action.renderSelection,myObject)
        );
       },
    selectLayerName : null,
    renderSelection : function(multiSelection){
        var mapWidget = Fusion.getMapById('Map');
        var map = mapWidget.getAllMaps()[0];
        var oSelection = multiSelection[map._sMapname];
        var number = oSelection.getNumLayers();
        if(number==1){
            var layer = oSelection.getLayer(0);
            var layerName = layer.getName();
            var seletcNumber = layer.getNumElements();
            if(layerName=="boaz-parcel2" || layerName=="boaz-add2"){
                Sparknet.map.moulton.action.selectLayerName = layerName;

                var propertiesNumber = layer.getNumProperties();
                var propertiesNames = layer.getPropertyNames();
                var propertiesTypes = layer.getPropertyTypes();
                var grid = Sparknet.map.information.Config.SelectGrid;
                var store = grid.getStore();
                var data = [];
                for(var i=0;i<seletcNumber;i++){
                    var obj = {};
                    var obj2 = {};
                    for(var j=0;j<propertiesNumber;j++){
                        var propertiesName = propertiesNames[j];
                        var propertiesType = propertiesTypes[j];
                        var propertiesValue = layer.getElementValue(i,j);
                        obj[propertiesName] = propertiesValue;
                        obj2[propertiesName] = propertiesType;
                    }
                    data.push(obj);
                    if(Sparknet.map.moulton.action.log){
                        console.log(Ext.encode(obj2).replace(/\"/g,""));
                        console.log(Ext.encode(propertiesNames).replace(/\"/g,""));
                    }

                    Ext.getCmp('TaskTabPanel').activate(grid);
                }
                var jsonData = {
                    'topics' : data,
                    'totalCount':seletcNumber
                }
                store.loadData(jsonData);

                if(seletcNumber==1){
                    if(layerName.indexOf("boaz-add")>-1){
                        Sparknet.map.information.Config.zoomToSelection2(multiSelection,true);
                    } else if(layerName.indexOf("boaz-parcel")>-1){
                        var id = data[0]["FeatId"];
                        Sparknet.map.information.Config.clearMarker();
                    }
                }else{
                    Sparknet.map.information.Config.clearMarker();
                }

            }else if(layerName=="boaz-add"){
                Sparknet.map.information.Config.zoomToSelection2(multiSelection,true);
            }else{
                Sparknet.map.information.Config.clearMarker();
                //Sparknet.map.information.Config.zoomToSelection2(multiSelection,false);
            }
        }
    },
    nulltoEmpty : function(value){
       if(!Ext.isEmpty(value)){
           return value;
       }else{
           return "";
       }
    },
    data_nae:null,

    rowclick : function(grid,rowIndex,e){
        var parcel_form = Ext.getCmp("parcel_form");
        var address_form = Ext.getCmp("address_form");
        this.clearValue();
        var recorde = grid.getStore().getAt(rowIndex);
        var type =  Ext.getCmp("typeCombox").getValue();
        Sparknet.map.information.Config.data_org = recorde.data;
        Ext.getCmp('DetailsPanel').expand();
           if(type == 'OWNER' || type == 'PROPIN' || type == 'SUBDIVNAME' ){
               for(var ere in Sparknet.map.information.Config.data_org){
                   var obj = Ext.getCmp(ere+"_T2");
                   if(!Ext.isEmpty(obj)) {
                       var vl = recorde.get(ere);
                       if(!Ext.isEmpty(vl) && vl!="''")
                            obj.setValue(vl);
                       else
                           obj.setValue();
                   }
               }
               Ext.getCmp('DetailsTabPanel').activate(parcel_form);
           }else{
               this.changeButton(true);
               for(var ere in Sparknet.map.information.Config.data_org){
                   var obj = Ext.getCmp(ere+"_T");
                   if(!Ext.isEmpty(obj)) {
                       var vl = recorde.get(ere);
                       if(!Ext.isEmpty(vl) && vl!="''")
                           obj.setValue(vl);
                       else
                           obj.setValue();
                   }
               }
               Ext.getCmp('DetailsTabPanel').activate(address_form);
           }
    },
    rowdblclick : function(grid,rowIndex,e){

    },
    showModifyIcon : function(id,type){
        var icon = "";
        if(type=="user"){
            icon = 'user_edit.png';
        } if(type=="bus"){
            icon = 'lorry_go.png';
        } if(type=="student"){
            icon = 'user_edit.png';
        }

        return "<img src='../../../../SpatialNet/School/icon/"+icon+"' onclick='Sparknet.map.moulton.action.showModify(\""+id+"\",\""+type+"\");' style='cursor:pointer'>";
    },
    showMapIcon : function(id){
        return "<img src='../../../../SpatialNet/School/icon/map_magnify.png' onclick='Sparknet.map.moulton.action.showMap("+id+");' style='cursor:pointer'>";
    },
    showMapIcon2 : function(id,type){
        return "<img src='../../../../SpatialNet/School/icon/map_magnify.png' onclick='Sparknet.map.moulton.action.showMapType(\""+id+"\",\""+type+"\");' style='cursor:pointer'>";
    },
    showMapIconTrack: function(id,type){
        return "<img src='../../../../SpatialNet/School/icon/chart_line.png' onclick='Sparknet.map.moulton.action.showMapTrack(\""+id+"\",\""+type+"\");' style='cursor:pointer'>";
    },
    showModify : function(id,type){
        if(type=="bus"){
            this.schoolBusPanel.showModifyForm(id);
        }else if(type=="student"){
            this.studentPanel.showModifyForm(id);
        }else if(type=="school"){
            this.schoolPanel.showModifyForm(id);
        }else if(type=="user"){
            this.userPanel.showModifyForm(id);
        }
    },
    showMap :function(id){
        Sparknet.map.information.Config.clearSelection();
        var mapWidget = Fusion.getMapById('Map');
        var mapName = mapWidget.getAllMaps()[0]._sMapname;
        var scale = mapWidget.getScale();
        Ext.getCmp('MainTab').activate("mapPanel");
        var idObejct = {};
        idObejct.FeatId = id;
        //ZoomToView(p.x, p.y, scale, true);
        var p = mapWidget.getCurrentCenter();
        ZoomToView(p.x, p.y, 1400, true);
        Sparknet.map.information.Config.selectFeature(mapName,idObejct,this.query_layer)
    },

    showMapType :function(id,type){
       if(type=="bus"){
           this.schoolBusPanel.showLocation(id);
       }else if(type=="student"){
           this.studentPanel.showLocation(id);
       }else if(type=="school"){
           this.schoolPanel.showLocation(id);
       }else if(type=="studentHistory"){
           this.studentHistoryPanel.showLocation(id);
       }else if(type=="busHistory"){
           this.busHistoryPanel.showLocation(id);
       }
    },
    showMapTrack :function(id,type){
        if(type=="bus"){
            this.schoolBusPanel.track(id);
        }else if("student"){
            this.studentPanel.track(id);
        }else if("school"){
            this.schoolPanel.track(id);
        }
    },
    loadAfter : function(store,records){
        if(store.getCount()==1){
            var parcel_form = Ext.getCmp("parcel_form");
            var address_form = Ext.getCmp("address_form");
            this.clearValue();
            var recorde = store.getAt(0);
            var type =  Ext.getCmp("typeCombox").getValue();
            Sparknet.map.information.Config.data_org = recorde.data;
            Ext.getCmp('DetailsPanel').expand();
            if(Sparknet.map.moulton.action.selectLayerName=='boaz-parcel2'){
                for(var ere in Sparknet.map.information.Config.data_org){
                    var obj = Ext.getCmp(ere+"_T2");
                    if(!Ext.isEmpty(obj)) {
                        var vl = recorde.get(ere);
                        if(!Ext.isEmpty(vl) && vl!="''")
                            obj.setValue(vl);
                        else
                            obj.setValue();
                    }
                }
                Ext.getCmp('DetailsTabPanel').activate(parcel_form);
            }else if(Sparknet.map.moulton.action.selectLayerName=='boaz-add2'){
                this.changeButton(true);
                for(var ere in Sparknet.map.information.Config.data_org){
                    var obj = Ext.getCmp(ere+"_T");
                    if(!Ext.isEmpty(obj)) {
                        var vl = recorde.get(ere);
                        if(!Ext.isEmpty(vl) && vl!="''")
                            obj.setValue(vl);
                        else
                            obj.setValue();
                    }
                }
                Ext.getCmp('DetailsTabPanel').activate(address_form);
            }
        }

    },
    infor : function(grid,rowIndex,e){

        var parcel_form = Ext.getCmp("parcel_form");
        var address_form = Ext.getCmp("address_form");
        this.clearValue();
        //address_form.getForm().reset();
        //parcel_form.getForm().reset();
        var recorde = grid.getStore().getAt(rowIndex);
        var type =  Ext.getCmp("typeCombox").getValue();
        Sparknet.map.information.Config.data_org = recorde.data;
        Ext.getCmp('DetailsPanel').expand();
            if(Sparknet.map.moulton.action.selectLayerName=='boaz-parcel2'){
                for(var ere in Sparknet.map.information.Config.data_org){
                    var obj = Ext.getCmp(ere+"_T2");
                    if(!Ext.isEmpty(obj)) {
                        var vl = recorde.get(ere);
                        if(!Ext.isEmpty(vl) && vl!="''")
                            obj.setValue(vl);
                        else
                            obj.setValue();
                    }
                }
                Ext.getCmp('DetailsTabPanel').activate(parcel_form);
            }else if(Sparknet.map.moulton.action.selectLayerName=='boaz-add2'){
                this.changeButton(true);
                for(var ere in Sparknet.map.information.Config.data_org){
                    var obj = Ext.getCmp(ere+"_T");
                    if(!Ext.isEmpty(obj)) {
                        var vl = recorde.get(ere);
                        if(!Ext.isEmpty(vl) && vl!="''")
                            obj.setValue(vl);
                        else
                            obj.setValue();
                    }
                }
                Ext.getCmp('DetailsTabPanel').activate(address_form);
            }
        var id = recorde.get("FeatId");
        this.showMap2(id);
    },
    showMap2 :function(id){
        Sparknet.map.information.Config.clearSelection();
        var mapWidget = Fusion.getMapById('Map');
        var mapName = mapWidget.getAllMaps()[0]._sMapname;
        var scale = mapWidget.getScale();
         var searchPanel = Sparknet.map.information.Config.SelectGrid;
         var store = searchPanel.getStore();
         var rec = store.getById(id);
        Ext.getCmp('MainTab').activate("mapPanel");
        var idObejct = {};
        idObejct.FeatId = id;
        if(Sparknet.map.moulton.action.selectLayerName=="boaz-add2"){
            var p = mapWidget.getCurrentCenter();
            ZoomToView(p.x, p.y, 800, true);
            Sparknet.map.information.Config.selectFeature(mapName,idObejct,"boaz-add");
        }else if(Sparknet.map.moulton.action.selectLayerName=="boaz-parcel2"){
            Sparknet.map.information.Config.selectFeature(mapName,idObejct,"boaz-parcel");
        }
    },
    clearValue : function(){
        var parcel_form = Ext.getCmp("parcel_form");
        var address_form = Ext.getCmp("address_form");
        address_form.getForm().setValues({
            FeatId:"", ADDRESS:"",PARCELNUMB:"",IN_LIMIT:"",COUNTY:"",STREET_NUM:"",STREET_NAM:""
        });
        parcel_form.getForm().setValues({
			FeatId:"", ZONE:"",PARCELNUMB:"",OWNER:"",MAILADD1:"",MAILADD2:"",MAILADD3:"",PROPIN:"",CITY:"",STATE:"",ZIP:"",MAILZIP2:"",PROPTAX:"",PROPADDR:"",DEEDEDACRE:"",CALCACRES:"",AREA:"",PERIMETER:"",ACREAGE:"",SCHOOLZONE:"",HECTARES:"",MAILADDR:"",COUNTY:"",TAX_DISTRI:"",SUBDIV:"",SUBDIV_LOT:"",SUBDIV_BLO:"",SUBDIVNAME:"",SOURCETHM:"",ACRES:"",CITYLIMIT:"",comm1:"",comm2:""
        });
    },
    addAddress : function(){

        this.clearValue();
        this.changeButton(false);
        Sparknet.map.information.Config.addAddress();
    },
    changeButton : function(a){

    },


    createUserPanel : function(responseArray){
        var search = responseArray.useer_panel;
        if(search){

            var store = new Ext.data.JsonStore(search.store);
            var store2 = new Ext.data.JsonStore(search.store);

            var pagingBar = new Ext.PagingToolbar({
                pageSize: search.page_numner,
                store:store,
                displayInfo: false,
                displayMsg: 'Displaying topics {0} - {1} of {2}',
                emptyMsg: "No topics to display"
            });

            this.columns_pacel = new Ext.grid.ColumnModel(search.colModels[0]);
            this.columns_address = new Ext.grid.ColumnModel(search.colModels[1]);
            this.columns_select = new Ext.grid.ColumnModel(search.selectModels);

            this.SearchGrid =  new Ext.grid.GridPanel({
                store:store,
                iconCls : search.iconCls,
                trackMouseOver:false,
                id:search.id!=null?search.id:'SearchGrid',
                //enableRowHeightSync :true,
                title : "Search",
                //monitorResize :true,
                stripeRows:true,
                loadMask:{msg:'Loading.....',removeMask:true},
                //columns :search.colModels[0],
                colModel : this.columns_address,
                listeners : {
                    'rowdblclick' :search.rowdblclick,
                    'rowclick' :search.rowclick
                },
                tbar :search.tbar!=null?search.tbar:null,
                //bbar:  pagingBar,
                viewConfig: {
                    forceFit:true,
                    enableRowBody:true,
                    showPreview:true
                }
            });
            var tab = Ext.getCmp('MainTab');
            tab.add(this.SearchGrid);

            this.SelectGrid =  new Ext.grid.GridPanel({
                store:store2,
                trackMouseOver:false,
                //enableRowHeightSync :true,
                title : "Selection",
                //monitorResize :true,
                stripeRows:true,
                loadMask:{msg:'Loading.....',removeMask:true},
                colModel : this.columns_select,
                listeners : {
                    'rowclick' :search.infor
                },
                viewConfig: {
                    forceFit:true,
                    enableRowBody:true,
                    showPreview:true
                }
            });
            var tab2 = Ext.getCmp('TaskTabPanel');
            tab2.add(this.SelectGrid);
        }
    },
    submitInfor : function(waitTitle,sqlId,sqlActive,daoName,data){
        var urlParams = {};
        urlParams.parames = {
            sqlId : sqlId,
            sqlActive : sqlActive,
            daoName : daoName,
            data : data
        };
        spatial.school.ui.LoadMsg.wait(waitTitle);

        var ajax = new Sparknet.tool.Ajax({
            url: Sparknet.map.information.Config.configJson.url.api,
            params:urlParams
        });
        ajax.setSuccessFunction(function(result){
            spatial.school.ui.LoadMsg.stopWait();
        });
        ajax.send();
    } ,
    validatorInforService :  function(sqlId,sqlActive,daoName,data,func){
        var urlParams = {};
        var url = Sparknet.map.information.Config.configJson.url.api2;
        urlParams.SERVICENAME_PARAM = "SQL_SERVICE";
        urlParams.ACTIV_PARAM = "sqlMap";
        urlParams.PARAMES_PARAM = Ext.encode({
            sqlId : sqlId,
            sqlActive : sqlActive,
            daoName : daoName,
            data : data
        });


        var ajax = new Sparknet.tool.Ajax({
            url:url,
            params:urlParams
        });
        ajax.setSuccessFunction(function(result){
           return func(result);
        })
        return ajax.syncSend();
    } ,
    submitInforService : function(waitTitle,service,active,data,func){
        var urlParams = {};
        var url = Sparknet.map.information.Config.configJson.url.api2
        urlParams.SERVICENAME_PARAM = service;
        urlParams.ACTIV_PARAM = active;
        urlParams.PARAMES_PARAM =  Ext.encode(data);
        spatial.school.ui.LoadMsg.wait(waitTitle);

        var ajax = new Sparknet.tool.Ajax({
            url:url,
            params:urlParams
        });
        ajax.setSuccessFunction(function(result){
            spatial.school.ui.LoadMsg.stopWait();
            func(result);
        });
        ajax.send();
    },
    
    loadGrid : function(service,active,sqlId,sqlActive,daoName,data,store,pagingBar){
        var urlParams = {};
        var urlParams2 = {};

        urlParams.SERVICENAME_PARAM = service;
        urlParams.ACTIV_PARAM = active;
        urlParams.PARAMES_PARAM =  {
            sqlId : sqlId,
            sqlActive : sqlActive,
            daoName : daoName,
            data : data
        };
        urlParams2.SERVICENAME_PARAM = service;
        urlParams2.ACTIV_PARAM = active;
		if(sqlId=='school.getBus'){
			 urlParams2.PARAMES_PARAM = Ext.encode({
				sqlId : sqlId,
				sqlActive : sqlActive,
				daoName : daoName,
				data : data,
				start:0,
				limit:100
			});			
		}else{
			 urlParams2.PARAMES_PARAM = Ext.encode({
				sqlId : sqlId,
				sqlActive : sqlActive,
				daoName : daoName,
				data : data,
				start:0,
				limit:22
			});			
		}
      
		if (pagingBar){
	        pagingBar.setOtherarams(urlParams);
		}
		if (store){
			store.load({
				params : urlParams2,
				timeout : 3000,
				callback : function() {
					if (store.getCount() == 0) {
						// Ext.MessageBox.alert("Tips",'No records')
					}
				}
			});
		}
    },
    loadGrid2 : function(sqlId,sqlActive,data,store,pagingBar,daoName){
        if(daoName){
            this.loadGrid("SQL_SERVICE","sqlMap",sqlId,sqlActive,daoName,data,store,pagingBar);
        }else{
            this.loadGrid("SQL_SERVICE","sqlMap",sqlId,sqlActive,"MySqlMap",data,store,pagingBar);
        }

    }
}



/**扩展分页工具条，使其能在点下一页和上一页时能提交其他信息到后台
 * @class Ext.ux.PagingToolbar
 * @extends Ext.PagingToolbar
 */
Ext.namespace('Ext.ux');
Ext.ux.PagingToolbar=Ext.extend(
    Ext.PagingToolbar,
    {

        otherparams : {},
        getOtherarams : function(){
            return this.otherparams;
        },
        setOtherarams : function(a){
            this.otherparams = a;
        },
        doLoad: function(start){

              if(this.otherparams!=null){
                  var obj1 = {};
                  var obj2 = {
                      start : start,
                      limit :  this.pageSize
                  };
                  if(this.otherparams.PARAMES_PARAM){
                      Ext.applyIf(obj2,this.otherparams.PARAMES_PARAM);
                      Ext.applyIf(obj1,this.otherparams);
                      obj1.PARAMES_PARAM = Ext.encode(obj2)
                      obj2 = obj1;
                  }else{
                      Ext.applyIf(obj2,this.otherparams);
                  }

                  var o = {}, pn = this.getParams();
                  o[pn.start] = start;
                  o[pn.limit] = this.pageSize;
                  Ext.applyIf(o,obj2);
                  if(this.fireEvent('beforechange', this, o) !== false){
                      this.store.load({params:o});
                  }

              }else{
                  var o = {}, pn = this.getParams();
                  o[pn.start] = start;
                  o[pn.limit] = this.pageSize;
                  if(this.fireEvent('beforechange', this, o) !== false){
                      this.store.load({params:o});
                  }
              }

        }
    });


/**
 *
 *
 *  -----------------------------------------LoadMsg -------------------------------------------------------------
 *
 * */

Ext.namespace('spatial.school.ui')



spatial.school.ui.LoadMsg = {

    run : false,

    wait:function(title){
        if(!title){
            title =  'Data are processing...'
        }

        if(!this.run)
        {
            Ext.MessageBox.show({
                progressText: title,
                width:300,
                wait:true,
                waitConfig: {interval:200}
            });
            this.run = true;
        }

    },
    stopWait : function(){
        if(this.run)
        {
            Ext.MessageBox.hide();
            this.run = false;
        }
    }
}


/**
 *
 *
 *  -----------------------------------------User -------------------------------------------------------------
 *
 * */
spatial.school.ui.User = function(Config){

    this.recordUser = Ext.data.Record.create([
        {name: 'USER_ID'},
        {name: 'USER_NAME'},
        {name: 'PASSWORD'},
        {name: 'EMAIL'},
        {name: 'TEL'},
        {name: 'MOBILE'},
        {name: 'STATE'},
        {name: 'CREATE_TIME'},
        {name: 'POWER_ID'},
        {name: 'FIRST_NAME'},
        {name: 'LAST_NAME'},
        {name: 'WORK_TEL'},
        {name: 'SEX'},
        {name: 'SCHOOL_ID'},
        {name: 'ADDRESS'},
        {name: 'WORK_ADDRESS'}
    ]);

    this.menus = new Ext.menu.Menu();
    this.menus.add({
        text: 'User Permission',
        handler : function(){
            user2.window4.show();
        }
    });


    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysSchoolByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"

    this.tabsForm = new Ext.TabPanel({
            activeTab: 0,
            id : 'Cmp_User_Tabpanel',
            items:[
                {
                    title:'Administrator',
                    id : 'Cmp_User_Administrator_FromPanel',
                    xtype:'form',
                    defaults:{autoHeight:true,bodyStyle:'margin:8px',anchor : '95%',allowBlank : false},
                    border:false,
                    labelWidth: 120,
                    defaultType: 'textfield',

                    items: [{
                        fieldLabel: 'User Name',
                        name: 'USER_NAME',
                        validationEvent: 'blur',
                        validationDelay: 500,
                        invalidText: 'The user name repetition',
                        validator: function(val){
                            if(!Ext.isEmpty(val)){
                                var data = {USER_NAME:val};
                                var a = Sparknet.map.moulton.action.validatorInforService ("school.getUser","loadList","MySqlMap",data,function(result){
                                    //console.log(result)
                                    if(result.length>0){
                                        return false;
                                    }
                                    return true;
                                });
                                return a;
                            }
                            return true;
                        }

                    },{
                        fieldLabel: 'Password',
                        name: 'PASSWORD'
                    },{
                        fieldLabel: 'First Name',
                        name: 'FIRST_NAME'
                    },{
                        fieldLabel: 'Last Name',
                        name: 'LAST_NAME'
                    },{
                        fieldLabel: 'Home Tel',
                        name: 'TEL'
                    },{
                        fieldLabel: 'Mobile',
                        name: 'MOBILE'
                    }, {
                        fieldLabel: 'Email',
                        name: 'EMAIL',
                        vtype:'email',
                        vtypeText:'Must be the appropriate email address'
                    }, {
                        name: 'POWER_ID',
                        xtype:'hidden',
                        value:'0'
                    }]
                },{
                    title:'Teacher',
                    xtype:'form',
                    defaultType: 'textfield',
                    labelWidth: 120,
                    border:false,
                    defaults:{autoHeight:true,bodyStyle:'margin:8px',anchor : '95%',allowBlank : false},
                    id : 'Cmp_User_Teacher_FromPanel',
                    items: [{
                        fieldLabel: 'User Name',
                        name: 'USER_NAME',
                        validationEvent: 'blur',
                        validationDelay: 500,
                        invalidText: 'The user name repetition',
                        validator: function(val){
                            if(!Ext.isEmpty(val)){
                                var data = {USER_NAME:val};
                                var a = Sparknet.map.moulton.action.validatorInforService ("school.getUser","loadList","MySqlMap",data,function(result){
                                    //console.log(result)
                                    if(result.length>0){
                                        return false;
                                    }
                                    return true;
                                });
                                return a;
                            }
                            return true;
                        }

                    },{
                        fieldLabel: 'Password',
                        name: 'PASSWORD'
                    },{
                        fieldLabel: 'First Name',
                        name: 'FIRST_NAME'
                    },{
                        fieldLabel: 'Last Name',
                        name: 'LAST_NAME'
                    }, new Ext.form.ComboBox({
                        store:new Ext.data.Store({
                            proxy:new Ext.data.HttpProxy({url:url}),    //
                            reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['SCHOOL_ID','SCHOOL_NAME']})       //
                        }),
                        displayField:'SCHOOL_NAME',        //
                        valueField : 'SCHOOL_ID',
                        typeAhead:false,        //
                        triggerAction:'all',
                        fieldLabel: 'School',
                        loadingText:'Loading...',    //
                        hiddenName : 'SCHOOL_ID',
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
                        name:    'SCHOOL_ID_COMBOBOX'

                    }),{
                        fieldLabel: 'Home Tel',
                        name: 'TEL'
                    },{
                        fieldLabel: 'Mobile',
                        name: 'MOBILE'
                    },{
                        fieldLabel: 'Work Tel',
                        name: 'WORK_TEL'
                    }, {
                        fieldLabel: 'Email',
                        name: 'EMAIL',
                        vtype:'email',
                        vtypeText:'Must be the appropriate email address'
                    }, new Ext.form.ComboBox({
                        store: new Ext.data.ArrayStore({
                            fields: ['id','name'],
                            data : Sparknet.map.moulton.data.sex
                        }),
                        displayField:'name',
                        valueField:'id',
                        listWidth:300,
                        fieldLabel: 'Teacher Sex',
                        typeAhead: true,
                        mode: 'local',
                        name : 'SEX',
                        forceSelection: true,
                        editable : false,
                        triggerAction: 'all',
                        emptyText:'Select an school...',
                        selectOnFocus:true
                    }), {
                        name: 'POWER_ID',
                        xtype:'hidden',
                        value:'1'
                    }]
                },{
                    title:'Parents',
                    id : 'Cmp_User_Parents_FromPanel',
                    xtype:'form',
                    labelWidth: 120,
                    border:false,
                    defaultType: 'textfield',
                    defaults:{autoHeight:true,bodyStyle:'margin:8px',anchor : '95%',allowBlank : false},
                    items: [{
                        fieldLabel: 'User Name',
                        name: 'USER_NAME',
                        validationEvent: 'blur',
                        validationDelay: 500,
                        invalidText: 'The user name repetition',
                        validator: function(val){
                            if(!Ext.isEmpty(val)){
                                var data = {USER_NAME:val};
                                var a = Sparknet.map.moulton.action.validatorInforService ("school.getUser","loadList","MySqlMap",data,function(result){
                                    //console.log(result)
                                    if(result.length>0){
                                        return false;
                                    }
                                    return true;
                                });
                                return a;
                            }
                            return true;
                        }

                    },{
                        fieldLabel: 'Password',
                        name: 'PASSWORD'
                    },{
                        fieldLabel: 'First Name',
                        name: 'FIRST_NAME'
                    },{
                        fieldLabel: 'Last Name',
                        name: 'LAST_NAME'
                    }, new Ext.form.ComboBox({
                        store: new Ext.data.ArrayStore({
                            fields: ['id','name'],
                            data : Sparknet.map.moulton.data.sex
                        }),
                        displayField:'name',
                        valueField:'id',
                        listWidth:300,
                        fieldLabel: 'User Sex',
                        typeAhead: true,
                        mode: 'local',
                        name : 'SEX',
                        forceSelection: true,
                        editable : false,
                        triggerAction: 'all',
                        emptyText:'Select an sex...',
                        selectOnFocus:true
                    }),{
                        fieldLabel: 'Home Address',
                        name: 'ADDRESS'
                    },{
                        fieldLabel: 'Home Tel',
                        name: 'TEL'
                    }, {
                        fieldLabel: 'Email',
                        name: 'EMAIL',
                        vtype:'email',
                        vtypeText:'Must be the appropriate email address'
                    },{
                        fieldLabel: 'Mobile',
                        name: 'MOBILE'
                    },{
                        fieldLabel: 'Work Address',
                        name: 'WORK_ADDRESS'
                    },{
                        fieldLabel: 'Work Tel',
                        name: 'WORK_TEL'
                    }, {
                        name: 'POWER_ID',
                        xtype:'hidden',
                        value:'2'
                    }]
                }
            ]
    });

    this.windowForm = new Ext.Window({
        width : 600,
        title : 'Add an user',
        autoScroll : true,
        resizable  : false,
        closeAction :'hide',
        modal : false,
        plain: true,
        items:[this.tabsForm],
        buttons: [{
            text: 'Save',
            handler: function(){
                this.addUser();
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

  /*  this.formPanel4 = new Ext.form.FormPanel({
        autoScroll:true,
        buttonAlign:'center',
        autoWidth:true,
        autoHeight:true,
        style : {
            'margin-top' : '10px'
        },
        labelWidth : 120,
        frame:true,//圆角和浅蓝色背景
        defaults: {
            anchor: '98%'
        },
        items:[
            new Ext.form.ComboBox({
                store: new Ext.data.ArrayStore({
                    fields: ['id','name'],
                    data : [['0',"administrator"],['1',"Teacher"],['2',"Students' parents"],['3',"Student"],['4',"Other"]]
                }),
                id : "USER_ROLE2",
                displayField:'name',
                valueField:'id',
                listWidth:300,
                fieldLabel: 'User Permission',
                typeAhead: true,
                mode: 'local',
                name : 'USER_ROLE',
                forceSelection: true,
                editable : false,
                triggerAction: 'all',
                emptyText:'Select an role...',
                selectOnFocus:true
            })
        ]
    });




    this.window4 = new Ext.Window({
        layout  : 'fit',
        width : 500,
        buttonAlign:'center',
        height : 160,
        title : 'Work Record',
        autoScroll : true,
        resizable  : true,
        closeAction :'hide',
        modal : true,
        plain: true,
        items:this.formPanel4,
        buttons:[{text:"submit",handler:function(){
            user2.updateRole();
        }},
            {text:"cancel",handler:function(){
                user2.window4.hide();
                user2.formPanel4.getForm().reset();
            }}
        ]
    });*/


    var ip = Fusion.getQueryParam("ip");
    this.window2 = new Ext.Window({
        layout  : 'fit',
        width : 420,
        buttonAlign:'center',
        height : 280,
        title : 'Work Record',
        autoScroll : true,
        resizable  : true,
        closeAction :'hide',
        modal : true,
        plain: true,
        html : "<iframe id='id1' src='http://76.73.192.247:7168/jwchat/' width='100%' height='100%' scrolling='no' frameborder='0'></iframe>"
    });

    this.store = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({url:Sparknet.map.information.Config.configJson.url.api2}),
        reader:new Ext.data.JsonReader({
                root:'items',
                totalProperty:'total'},
            this.recordUser
        )});
    this.tbar= [
        {
            xtype : 'label',
            text : 'User Name'
        },{
            xtype : 'textfield',
            width : "200",
            id : "USER_NAME_MG",
            name : 'USER_NAME'
        },'-',{
            xtype : 'label',
            text : 'User Role'
        },new Ext.form.ComboBox({
            store: new Ext.data.ArrayStore({
                fields: ['id','name'],
                data : [['0',"System administrator"],['1',"Teacher"],['2',"Parent"]] // from states.js
            }),
            id : "USER_ROLE_MG",
            displayField:'name',
            valueField:'id',
            listWidth:300,
            typeAhead: true,
            mode: 'local',
            name : 'USER_ROLE',
            forceSelection: true,
            editable : false,
            triggerAction: 'all',
            emptyText:'Select an role...',
            selectOnFocus:true
        }),'-',{
            text : 'Search',
            handler: function(){
                this.search();
            },
            scope:this,
            iconCls: 'search'
        },'-',{
            text : 'Help Desk',
            handler: function(){
                this.chat();
            },
            scope:this,
            iconCls: 'chat'
        },'-',{
            text : 'Add User',
            handler: function(){
                this.openWindow();
            },
            scope:this,
            iconCls: 'add_user'
        },'-',{
            text : 'Delete User',
            handler: function(){
                this.deleteUser();
            },
            scope:this,
            iconCls: 'delete'
        },'-',{
            text : 'Notice',
            handler: function(){
                this.notice();
            },
            scope:this
        }];

    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 22,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.User.superclass.constructor.call(this,Config);
}
var user_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
Ext.extend(spatial.school.ui.User,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    iconCls:'user_panel',
    sm:user_sm,
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        user_sm,
        {
            header: 'User Name',
            dataIndex: 'USER_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'User Role',
            dataIndex: 'POWER_ID',
            width: 300,
            renderer:function(val){
                var value = "";
                var a = nulltoEmpty(val);
                    if( a=="0" || a==0){
                        value =  "System administrator";
                    }
                    if( a=="1"  || a==1){
                        value =  "Teacher";
                    }
                    if( a=="2"  || a==2){
                        value =  "Parent";
                    }
                return  value
            },
            sortable: true
        },{
            header: '',
            dataIndex: 'USER_ID',
            width: 50,
            renderer:function(val){return Sparknet.map.moulton.action.showModifyIcon(val,"user")},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){

        },
        "render" : function(component){

        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"User",

    openWindow : function(){
        this.windowForm.show();
    },

    closeWindow : function(){
        this.windowForm.hide();
        this.reset();
    },
    search : function(){
        var USER_NAME = Ext.getCmp('USER_NAME_MG').getValue();
        var POWER_ID = Ext.getCmp('USER_ROLE_MG').getValue();
        var data = {
            USER_NAME : USER_NAME,
            POWER_ID : POWER_ID
        }
        Sparknet.map.moulton.action.loadGrid2("school.getUsers","loadPageInfo",data,this.store,this.pagingBar);
    },
    addUser : function(){
        //console.log(this.tabsForm.getForm().getValues(false));

        var myObject = this;
        var Cmp_User_Tabpanel = Ext.getCmp("Cmp_User_Tabpanel");
        var form = Cmp_User_Tabpanel.getActiveTab().getForm();
        if(form.isValid()){
            var data = form.getValues(false);
            var POWER_ID = data.POWER_ID
            var active = "saveUser";
            if(POWER_ID=="0")
                active = "saveUser";
            if(POWER_ID=="1")
                active = "saveTeacher";
            if(POWER_ID=="2")
                active = "saveParents";

            Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE",active,data,function(){
                myObject.closeWindow();
                myObject.search();
            });
        }
    },
    deleteUser : function(){
        var myObject = this;
        Ext.MessageBox.confirm('Tip', 'To delete data?', function(btn, text){
            if (btn == 'yes'){
                var records =  myObject.getSelectionModel().getSelections();
                var arry = []
                for(var j=0;j<records.length;j++) {
                    records[j].data["USER_ID"] =  records[j].data["USER_ID"].toString()
                    records[j].data["POWER_ID"] =  records[j].data["POWER_ID"].toString()
                    arry.push(records[j].data )
                }
                var data = {"USERS":arry};
                Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","deleteUser",data,function(){
                    myObject.search();
                });
            }
        });


    },
    sendMessage : function(){
                var myObject = this;
                if(this.formNotice.getForm().isValid()){
                    var data = this.formNotice.getForm().getValues(false);
                    Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","sendMessageAllUser",data,function(){
                        Ext.MessageBox.alert("Tips",'Information transmission is successful!');
                    });
                }





    },
    reset : function(){
        var Cmp_User_Tabpanel = Ext.getCmp("Cmp_User_Tabpanel");
        var arry = Cmp_User_Tabpanel.findByType("form");
        for(var j=0;j<arry.length;j++) {
            arry[j].getForm().reset();
        }
    },

    chat : function(){
        //this.window2.show();
        var ip = Fusion.getQueryParam("ip");
        window.open("http://76.73.192.247:7168/jwchat/",'',"height=400, width=400, top=0, left=400,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no")
    },

    showModifyForm : function(id){
     console.log(id)

    },
    notice : function(id){
      if(!this.windowNotice){

          this.formNotice = new Ext.FormPanel({
              border:false,
              defaults: {anchor: '100% 100%'  },
              defaultType: 'textarea',
              labelWidth: 120,
              items: [
                  {
                      fieldLabel: 'Notice Message',
                      allowBlank : false,
                      name: 'MESSAGE'
                  }
              ]
          });

          this.windowNotice = new Ext.Window({
              width : 600,
              title : 'Notice',
              autoScroll : true,
              resizable  : false,
              closeAction :'hide',
              modal : false,
              plain: true,
              items:[this.formNotice],
              buttons: [{
                  text: 'Send',
                  handler: function(){
                      this.sendMessage();
                  },
                  scope:this
              },{
                  text: 'Cancel',
                  handler: function(){
                      this.windowNotice.hide();
                      this.formNotice.getForm().reset();
                  },
                  scope:this
              }]
          });
      }
        this.windowNotice.show();
    }

});



/**
 *
 *  -----------------------------------------track bus -------------------------------------------------------------
 *
 * */


spatial.school.ui.TrackBus2 = function(Config){



    this.form = new Ext.FormPanel({
        border:false,
        defaults: {anchor : '95%' },
        defaultType: 'textfield',
        labelWidth: 120,
        items: [
            {
                fieldLabel: 'Bus Number',
                name: 'BUS_NUMBER'
            },
            {
                fieldLabel: 'Driver Name',
                name: 'DRIVER_NAME'
            },
            {
                fieldLabel: 'Time',
                name: 'UTIME'
            },
            {
                fieldLabel: 'Speed/mph',
                name: 'SPEED'
            }
        ]
    });



    this.store =  new  Ext.data.JsonStore({
        fields: [
            {name: 'UTIME'},
            {name: 'SPEED'},
            {name: 'BUS_ID'},
            {name: 'DRIVER_NUMBER'},
            {name: 'DRIVER_NAME'},
            {name: 'DRIVER_FIRST_NAME'},
            {name: 'DRIVER_LAST_NAME'},
            {name: 'DRIVER_SEX'},
            {name: 'DRIVER_MOBILE'},
            {name: 'BUS_NUMBER'},
            {name: 'BUS_PLATE_NUMBER'},
            {name: 'LATITUDE'},
            {name: 'LONGITUDE'},
            {name: 'UTIME'},
            {name: 'SPEED'},
            {name: 'DIRECT'},
            {name: 'ALTITUDE'}
        ]
        ,
        listeners : {
            load : function(store ,records){
                for(var i=0;i<records.length;i++){
                    records[i].set("UTIME",time(records[i].data.UTIME));
                    records[i].set("SPEED",speed(records[i].data.SPEED));
                }
            }
        }
    });
    this.items = [this.form]
    this.tbar = [{
        text : 'Clear',
        handler: function(){
            this.clear();
        },
        scope:this,
        iconCls: 'delete'
    }]
    spatial.school.ui.TrackBus2.superclass.constructor.call(this,Config);
}
Ext.extend(spatial.school.ui.TrackBus2,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    columns:[
        {
            header: 'Bus Number',
            dataIndex: 'BUS_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver Name',
            dataIndex: 'DRIVER_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Time',
            dataIndex: 'UTIME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Speed/mph',
            dataIndex: 'SPEED',
            width: 300,
            renderer:function(val){return nulltoEmpty(val)},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){
            var record = Grid1.getStore().getAt(rowIndex);
/*            var mydata = {};
            Ext.applyIf(mydata,record.data);
            mydata.UTIME = time(record.data.UTIME);
            mydata.SPEED = speed(record.data.SPEED);*/
            Grid1.form.getForm().setValues(record.data);
            Sparknet.map.moulton.action.schoolBusPanel.selectedBus = record.data.BUS_ID;
            //Grid1.showLocation(record.data);
            //console.log(Sparknet.map.moulton.action.schoolBusPanel.selectedBus)
        },
        "render" : function(component){


        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Track",

    laodData:function(myData){
        this.store.loadData(myData);
        var record = this.store.getAt(0);
/*        record.data.UTIME = time(record.data.UTIME);
        record.data.SPEED = speed(record.data.SPEED);*/
        this.form.getForm().setValues(record.data);
        //this.getSelectionModel().selectFirstRow();
    },
    showLocation : function(record){
        var x = record.LONGITUDE;
        var y = record.LATITUDE;

        var p = transform(x,y);
        x = p.x;
        y = p.y;


        var mapWidget = Fusion.getMapById('Map');
        var mapName = mapWidget.getAllMaps()[0]._sMapname;
        var scale = mapWidget.getScale();
        Ext.getCmp('MainTab').activate("mapPanel");
        ZoomToView(x, y, scale, true);
    },
    setData : function(arry){
        this.store.removeAll();
        this.laodData(arry);
        for(var i=0;i<arry.length;i++){
            if(arry[i].BUS_ID== Sparknet.map.moulton.action.schoolBusPanel.selectedBus){
                this.getSelectionModel().selectRow(i);
                var record = this.store.getAt(i);
/*                record.data.UTIME = time(record.data.UTIME);
                record.data.SPEED = speed(record.data.SPEED);*/
                this.form.getForm().setValues(record.data);
                break;
            }
        }

    },
    clear : function(){
        this.store.removeAll();
        this.form.getForm().reset();
        Sparknet.map.information.Config.clearAllMarker("bus");
    }
});



/**
 *
 *  -----------------------------------------track bus -------------------------------------------------------------
 *
 * */


spatial.school.ui.TrackBus = function(Config){



    this.form = new Ext.FormPanel({
        border:false,
        defaults: {anchor : '95%' },
        defaultType: 'textfield',
        labelWidth: 120,
        items: [
            {
                fieldLabel: 'Bus Number',
                name: 'BUS_NUMBER'
            },
            {
                fieldLabel: 'Driver Name',
                name: 'DRIVER_NAME'
            },
            {
                fieldLabel: 'Time',
                name: 'UTIME'
            },
            {
                fieldLabel: 'Speed/mph',
                name: 'SPEED'
            }
        ]
    });



    this.store =  new  Ext.data.JsonStore({
        fields: [
            {name: 'DRIVER_ID'},
            {name: 'UTIME'},
            {name: 'SPEED'},
            {name: 'DRIVER_NUMBER'},
            {name: 'DRIVER_NAME'},
            {name: 'DRIVER_FIRST_NAME'},
            {name: 'DRIVER_LAST_NAME'},
            {name: 'DRIVER_SEX'},
            {name: 'DRIVER_MOBILE'},
            {name: 'BUS_ID'},
            {name: 'BUS_NUMBER'},
            {name: 'BUS_PLATE_NUMBER'},
            {name: 'LATITUDE'},
            {name: 'LONGITUDE'},
            {name: 'UTIME'},
            {name: 'SPEED'},
            {name: 'DIRECT'},
            {name: 'ALTITUDE'}
        ]
    });
  this.items = [this.form]
    this.tbar = [{
        text : 'Clear',
        handler: function(){
            this.clear();
        },
        scope:this,
        iconCls: 'delete'
    }]
    spatial.school.ui.TrackBus.superclass.constructor.call(this,Config);
}
Ext.extend(spatial.school.ui.TrackBus,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    columns:[
        {
            header: 'Bus Number',
            dataIndex: 'BUS_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver Name',
            dataIndex: 'DRIVER_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Time',
            dataIndex: 'UTIME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Speed/mph',
            dataIndex: 'SPEED',
            width: 300,
            renderer:function(val){return nulltoEmpty(val)},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){
            var record = Grid1.getStore().getAt(rowIndex);
/*            var mydata = {};
            Ext.applyIf(mydata,record.data);
            mydata.UTIME = time(record.data.UTIME);
            mydata.SPEED = speed(record.data.SPEED);*/

            Grid1.form.getForm().setValues(record.data);
            Grid1.showLocation(record.data,rowIndex);
            Grid1.selectedRecord = record.data;
        },
        "render" : function(component){


        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Bus",

    laodData:function(myData){
        this.store.loadData(myData);
        var record = this.store.getAt(0);
/*        record.data.UTIME = time(record.data.UTIME);
        record.data.SPEED = speed(record.data.SPEED);*/
        this.form.getForm().setValues(record.data);
        this.getSelectionModel().selectFirstRow();
    },

    selectedRecord : null,

    showLocation : function(record,rowIndex){

        var x1 = record.LONGITUDE;
        var y1 = record.LATITUDE;
        var p1 = transform(x1,y1);
        x1 = p1.x;
        y1 = p1.y;

        var mapWidget = Fusion.getMapById('Map');
        var mapName = mapWidget.getAllMaps()[0]._sMapname;
        var scale = mapWidget.getScale();
        Ext.getCmp('MainTab').activate("mapPanel");




        Sparknet.map.information.Config.clearAllMarker("bus");
        var count = this.store.getCount()  ;


        for(var i=0;i<count;i++) {
            var result = this.store.getAt(i).data;
            if(i!=rowIndex){
                if (result.LATITUDE) {
                    var x = result.LONGITUDE;
                    var y = result.LATITUDE;
                    var p = transform(x, y);
                    x = p.x;
                    y = p.y;
                    Sparknet.map.information.Config.addMarker2(x, y, "bus", false, {BUS_NUMBER: result.BUS_NUMBER}, false);
                }
            }
        }
        Sparknet.map.information.Config.addMarker2(x1,y1,"bus",false,{BUS_NUMBER:record.BUS_NUMBER},true);
        ZoomToView(x1, y1, scale, true);


    },
    setData : function(arry){
        this.store.removeAll();
        this.laodData(arry);
    },
    clear : function(){
        this.store.removeAll();
        this.form.getForm().reset();
        Sparknet.map.information.Config.clearAllMarker("bus");
    }
});


/**
 *
 *  -----------------------------------------track studdent -------------------------------------------------------------
 *
 * */


spatial.school.ui.TrackStudent = function(Config){




    this.form = new Ext.FormPanel({
        border:false,
        defaults: {anchor : '95%' },
        defaultType: 'textfield',
        labelWidth: 120,
        items: [
            {
                fieldLabel: 'Student Number',
                name: 'STUDENT_NUMBER'
            },
            {
                fieldLabel: 'Student Name',
                name: 'STUDENT_NAME'
            },
            {
                fieldLabel: 'Bus Number',
                name: 'BUS_NUMBER'
            },
            {
                fieldLabel: 'Time',
                name: 'BOARDING_TIME'
            }
        ]
    });



    this.store =  new  Ext.data.JsonStore({
        fields: [
            {name: 'STUDENT_ID'},
            {name: 'STUDENT_NAME'},
            {name: 'STUDENT_FIRST_NAME'},
            {name: 'STUDENT_NUMBER'},
            {name: 'STUDENT_SEX'},
            {name: 'STUDENT_MOBILE'},
            {name: 'STUDENT_ADDRESS'},
            {name: 'STATE'},
            {name:'CREATE_TIME'},
            {name:'STUDENT_LAST_NAME'},
            {name:'SCHOOL_ID'},
            {name:'SCHOOL_NAME'},
            {name:'END_TIME'},
            {name:'BUS_NUMBER'},
            {name:'BUS_PLATE_NUMBER'},
            {name:'BUS_ID'},
            {name:'BOARDING_TIME'},
            {name:'FING_ID'},
            {name:'LATITUDE'},
            {name:'LONGITUDE'},
            {name:'SPEED'},
            {name:'DIRECT'},
            {name:'ALTITUDE'}
        ]
    });
   this.items = [ this.form ];
    this.tbar = [{
        text : 'Clear',
        handler: function(){
            this.clear();
        },
        scope:this,
        iconCls: 'delete'
    }]
    spatial.school.ui.TrackStudent.superclass.constructor.call(this,Config);
}
Ext.extend(spatial.school.ui.TrackStudent,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    columns:[
        {
            header: 'Student Number',
            dataIndex: 'STUDENT_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Student Name',
            dataIndex: 'STUDENT_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Bus Number',
            dataIndex: 'BUS_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Time',
            dataIndex: 'BOARDING_TIME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){

        },
        'rowclick' : function(Grid1,rowIndex,event){
            var record = Grid1.getStore().getAt(rowIndex);
            Grid1.form.getForm().setValues(record.data)
            Grid1.showLocation(record.data,rowIndex);
        },
        "render" : function(component){


        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Student",

    laodData:function(myData){
        this.store.loadData(myData);
        var record = this.store.getAt(0);
        this.form.getForm().setValues(record.data)
        this.getSelectionModel().selectFirstRow();
    },
    selectedRecord : null,
    showLocation : function(record,rowIndex){
            var x1 = record.LONGITUDE;
            var y1 = record.LATITUDE;
            var p1 = transform(x1,y1);
            x1 = p1.x;
            y1 = p1.y;

            var stName1 = record.STUDENT_NAME;
            var time = record.BOARDING_TIME;
            var bus = record.BUS_NUMBER;
            var mapWidget = Fusion.getMapById('Map');
            var mapName = mapWidget.getAllMaps()[0]._sMapname;
            var scale = mapWidget.getScale();
            Ext.getCmp('MainTab').activate("mapPanel");


        Sparknet.map.information.Config.clearAllMarker("student");
        var count = this.store.getCount()  ;


        for(var i=0;i<count;i++) {
            var result = this.store.getAt(i).data;
            if(i!=rowIndex){
                if (result.LATITUDE) {
                    var x = result.LONGITUDE;
                    var y = result.LATITUDE;
                    var stName = record.STUDENT_NAME;
                    var p = transform(x, y);
                    x = p.x;
                    y = p.y;
                    Sparknet.map.information.Config.addMarker2(x, y, "student", false,  {ST_LABEL: stName },false);
                }
            }
        }


        Sparknet.map.information.Config.addMarker2(x1, y1, "student", false,  {ST_LABEL: stName1 },true);
        ZoomToView(x1, y1, scale, true);





    },
    clear : function(){
        this.store.removeAll();
        this.form.getForm().reset();
        Sparknet.map.information.Config.clearAllMarker("student");
    }
});


/**
 *
 *  -----------------------------------------school bus -------------------------------------------------------------
 *
 * */


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
        };
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
    	AssignedBusGrid = Ext.extend(Ext.grid.GridPanel,{
            constructor: function(config) {
                var store = new Ext.data.Store({
                    proxy:new Ext.data.HttpProxy({url:Sparknet.map.information.Config.configJson.url.api2}),    //
                    reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['BUS_ID','BUS_NUMBER','BUS_PLATE_NUMBER']})       //
                });
                var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
                config = Ext.apply({
                	sm : sm,
                    store: store,
                    columns : [sm,
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
                    }]
                }, config);

                AssignedBusGrid.superclass.constructor.call(this, config);
            },
            loadStoreData : function(data){
            	Sparknet.map.moulton.action.loadGrid2("school.getBus","loadPageInfo",{USER_ID: USER_ID},this.getStore(),null);
            }
    	});
    	
    	AssignedBusRelationShipGrid = Ext.extend(Ext.grid.GridPanel,{
            constructor: function(config) {
                var store = new Ext.data.Store({
                    proxy:new Ext.data.HttpProxy({url:Sparknet.map.information.Config.configJson.url.api2}),    //
                    reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['BUS_NUMBER_FROM','BUS_NUMBER_TO','RELATION'],idProperty: 'RELATION_ID'})       //
                });
                var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
                config = Ext.apply({
                	sm : sm,
                    store: store,
                    columns : [sm,
                    {
                        header: 'Bus Number',
                        dataIndex: 'BUS_NUMBER_FROM',
                        width: 100,
                        sortable: true
                    },{
                        header: 'Relationship',
                        dataIndex: 'RELATION',
                        width: 100,
                        renderer: function(value, metaData, record, rowIndex, colIndex, store) {
                        	return '<font size="14" >→</font>';
                        },
                        align: 'center'
                    },{
                        header: 'Bus Number',
                        dataIndex: 'BUS_NUMBER_TO',
                        width: 100,
                        sortable: true
                    }]
                }, config);

                AssignedBusRelationShipGrid.superclass.constructor.call(this, config);
            },
            loadStoreData : function(data){
            	Sparknet.map.moulton.action.loadGrid2("school.getBusRelation","loadPageInfo",{USER_ID: USER_ID},this.getStore(),null);
            }
    	});
    	
    	var grid1 = new AssignedBusGrid({flex : 1, title :'From'});
    	var grid2 = new AssignedBusGrid({flex : 1, title : 'To'});
    	var grid3 = new AssignedBusRelationShipGrid({flex: 1, title: 'Relationship'});
    	var win = new Ext.Window({
    	    title: 'Assign Bus',
    	    height: 500,
    	    width: 600,
    	    layout: {
    	    	type : 'vbox',
    	    	align: 'stretch'
    	    },
    	    items:[{
    	    	xtype: 'form',
    	    	flex : 10,
    	    	layout: {
        	    	type : 'hbox',
        	    	align: 'stretch'
        	    },
        	    items:[grid1,grid2],
        	    buttons: [{
                    text: 'Save',
                    handler: function(){
                    	var g1 = grid1.getSelectionModel().getSelections();
                    	var g2 = grid2.getSelectionModel().getSelections();
                    	
                    	if (!g1 || !g2 || g1.length == 0 || g2.length == 0){
                    		return;
                    	}
                    	var busNum1 = g1[0].data.BUS_NUMBER;
                    	var busNum2 = g2[0].data.BUS_NUMBER;
                    	if (busNum1 == busNum2){
                    		return;
                    	}
                    	
                    	var containsRecord = grid3.getStore().queryBy(function(record, id){
                    		if (record.data.BUS_NUMBER_FROM == busNum1 || record.data.BUS_NUMBER_TO == busNum1
                    				|| record.data.BUS_NUMBER_FROM == busNum2 || record.data.BUS_NUMBER_TO == busNum2){
                    			return true;
                    		}
                    	});
                    	if (containsRecord.getCount() > 0){
                    		Ext.MessageBox.alert('Tip','Duplicated selection of bus');
                    		return;
                    	}
                    	Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE"
                    			,"saveBusRelation",{from: busNum1, to: busNum2},function(){
                    		Ext.MessageBox.alert('Tip','Save successfully.');
                    		grid3.loadStoreData();
                        });
                    },
                    scope:this
                },{
                    text: 'Cancel',
                    handler: function(){
                    	win.close();
                    }
                }]
    	    },{
    	    	xtype : 'form',
    	    	flex : 5,
    	    	layout: 'fit',
    	    	items:[grid3],
    	    	buttons: [{
    	    		text: 'Delete',
    	    		handler: function(){
    	    			var selections = grid3.getSelectionModel().getSelections();
    	    			if (selections.length == 0){
    	    				return;
    	    			}
    	    			var ids = [];
    	    			Ext.each(selections, function(v,i){
    	    				ids.push({RELATION_ID : v.id});
    	    			});
    	    			Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE"
                    			,"deleteBusRelation",{ids: ids},function(){
                    		Ext.MessageBox.alert('Tip','Delete successfully.');
                    		grid3.loadStoreData();
                        });
    	    		}
    	    	}]
    	    }]
    	});
    	grid1.loadStoreData();
    	grid2.loadStoreData();
    	grid3.loadStoreData();
    	win.show();
    },
    
    notice : function(){
    	var records = this.getSelectionModel().getSelections();
        if(records.length < 1) {
            return;
        }
        
        var formNotice = new Ext.FormPanel({
            border:false,
            defaultType: 'textarea',
            labelWidth: 120,
            items: [
                {
                    fieldLabel: 'Notice Message',
                    allowBlank : false,
                    name: 'MESSAGE',
                    anchor: '100% 80%'
                },
                {
                	xtype: 'checkbox',
                	boxLabel: 'sms',
                	name : 'SMS'
                }
            ]
        });

        var windowNotice = new Ext.Window({
            width : 600,
            title : 'Notice',
            autoScroll : true,
            resizable  : false,
            closeAction :'hide',
            modal : false,
            plain: true,
            items:[formNotice],
            buttons: [{
                text: 'Send',
                handler: function(){
                	var values = formNotice.getForm().getValues();
                	var message = values['MESSAGE'];
                	var sms = formNotice.getForm().findField('SMS').checked;
                	if (Ext.isEmpty(message)){
                		return;
                	}
                    this.sendMessage(message, sms,function(){
                    	Ext.MessageBox.alert("Tips",'Information transmission is successful!');
                    	windowNotice.close();
                    });
                },
                scope:this
            },{
                text: 'Cancel',
                handler: function(){
                	formNotice.getForm().reset();
                    windowNotice.close();
                },
                scope : this
            }]
        });
        windowNotice.show();
    },
    sendMessage : function(message,sms,fun){
    	var records = this.getSelectionModel().getSelections();
        if(records.length < 1) {
            return;
        }
        var numbers = [];
        Ext.each(records, function(record, key) {
        	numbers.push({BUS_NUMBER: record.data.BUS_NUMBER});
        });
        Sparknet.map.moulton.action.submitInforService("Data processing..." ,"SCHOOL_SERVICE","sendMessageParents"
        		,{numbers: numbers, message: message, sms: sms} ,fun);
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


/**
//------------------------------------------------------------------Bus History----------------------------------------------
**/
spatial.school.ui.BusHistory= function(Config){
    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysBusByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"



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
                {name: 'LATITUDE'},
                {name: 'LONGITUDE'},
                {name: 'UTIME'},
                {name: 'SPEED'},
                {name: 'DIRECT'},
                {name: 'ALTITUDE'},
                {name: 'DRIVER_ID'},
                {name: 'DRIVER_NUMBER'},
                {name: 'DRIVER_NAME'},
                {name: 'DRIVER_FIRST_NAME'},
                {name: 'DRIVER_LAST_NAME'},
                {name: 'DRIVER_SEX'},
                {name: 'DRIVER_MOBILE'}
            ]
        ),
        listeners : {
            load : function(store ,records){
                for(var i=0;i<records.length;i++){
                    records[i].set("UTIME",time(records[i].data.UTIME));
                    records[i].set("SPEED",speed(records[i].data.SPEED));
                }
            }
        }});
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
        id:    'Q_BUS_ID_COMBOBOX2'

    }),{
        xtype : 'label',
        text : 'Start Date : '
    },{
        xtype : 'datetimefield',
        fieldLabel: 'Start Date',
        format:"Y-m-d H:i:s",
        name: 'bus_start_date',
        id: 'q_bus_start_date',
        vtype: 'daterange',
        endDateField: 'q_bus_end_date' // id of the end date field
    },'-',{
        xtype : 'label',
        text : 'End Date : '
    },{
        xtype : 'datetimefield',
        fieldLabel: 'End Date',
        format:"Y-m-d H:i:s",
        name: 'bus_end_date',
        id: 'q_bus_end_date',
        vtype: 'daterange',
        startDateField: 'q_bus_start_date' // id of the start date field
    },'-',{
        text : 'Search',
        handler: function(){
            this.search();
        },
        scope:this,
        iconCls: 'search'
    },'-',{
        text : 'Location',
        handler: function(){
            this.showLocation();
        },
        scope:this,
        iconCls: 'show_location'
    }/*,'-',{
        text : 'Distance ',
        menu: {        // <-- submenu by nested config object
            items: [
                {
                    text : 'Selected Distance ',
                    handler: function () {
                        this.showDistance();
                    },
                    scope: this
                },
                {
                    text : 'All Distance ',
                    handler: function () {
                        this.showAllDistance();
                    },
                    scope: this
                }
            ]
        }
        }*/];

    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 22,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.BusHistory.superclass.constructor.call(this,Config);
}
var busHistory_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
Ext.extend(spatial.school.ui.BusHistory,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    sm : busHistory_sm,
    iconCls:'bus_panel',
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        busHistory_sm,
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
            header: 'Tiime',
            dataIndex: 'UTIME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Speed/mph',
            dataIndex: 'SPEED',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        }/*,{
            header: 'Location',
            dataIndex: 'BUS_ID',
            width: 50,
            renderer:function(val){return Sparknet.map.moulton.action.showMapIcon2(val,"busHistory")},
            sortable: true
        }*/],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){

        },
        "render" : function(component){


        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Bus History",

    search : function(){
        var bus_id = Ext.getCmp("Q_BUS_ID_COMBOBOX2").getValue();
        var busStartDate = Ext.getCmp("q_bus_start_date").getValue();
        var busEndDate = Ext.getCmp("q_bus_end_date").getValue();
        var data = {
            BUS_ID : bus_id,
            START_DATE : time22(busStartDate),
            END_DATE : time22(busEndDate)
        }
        Sparknet.map.moulton.action.loadGrid2("school.getBusHistory","loadPageInfo",data,this.store,this.pagingBar);
    },


    showLocation : function(id){
        Sparknet.map.information.Config.clearAllMarker("bus");
        var records = this.getSelectionModel().getSelections();
        var arry = new Array();
        for(var i=0;i<records.length;i++){
            var result = records[i].data;
            arry.push(result);
            if(result.LATITUDE){
                var mapWidget = Fusion.getMapById('Map');
                var mapName = mapWidget.getAllMaps()[0]._sMapname;
                var scale = mapWidget.getScale();
                Ext.getCmp('MainTab').activate("mapPanel");

                var x = result.LONGITUDE;
                var y = result.LATITUDE;
                var p = transform(x,y);
                x = p.x;
                y = p.y;

                ZoomToView(x,y, scale, true);
                Sparknet.map.information.Config.addMarker2(x,y,"bus",false,{BUS_NUMBER:result.BUS_NUMBER},false);
            }
        }
        Sparknet.map.moulton.action.trackBusPanel.show();
        Sparknet.map.moulton.action.trackBusPanel.laodData(arry);
    },
    showDistance : function(){
        var myObject = this;
        var records =  this.getSelectionModel().getSelections();

        var dit = 0;
        for(var i=1;i<records.length;i++){
            console.log(records[0].data);
            console.log(records[i].data);
            dit = dit +  this.getDistance(records[i-1].data.LONGITUDE,records[i-1].data.LATITUDE,records[i].data.LONGITUDE,records[i].data.LATITUDE);
        }
        dit = Math.round(dit)*3.280839895*1000;
        alert(dit+" Feet");
    },
    showAllDistance : function(){
        var bus_id = Ext.getCmp("Q_BUS_ID_COMBOBOX2").getValue();
        var busStartDate = Ext.getCmp("q_bus_start_date").getValue();
        var busEndDate = Ext.getCmp("q_bus_end_date").getValue();
        var data = {
            BUS_ID : bus_id,
            START_DATE : time22(busStartDate),
            END_DATE : time22(busEndDate)
        }
        Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","getAllDistance",data,function(result){
            console.log(result);
            if(result && result.DICT)
                alert(result.DICT=" Feet")
        });
    },

    EARTH_RADIUS : 6378137,//赤道半径(单位m)

    /**
     * 转化为弧度(rad)
     * */
    rad : function(d){
        return d * Math.PI / 180.0;
    },
    /**
     * 基于googleMap中的算法得到两经纬度之间的距离,计算精度与谷歌地图的距离精度差不多，相差范围在0.2米以下
     * @param lon1 第一点的精度
     * @param lat1 第一点的纬度
     * @param lon2 第二点的精度
     * @param lat3 第二点的纬度
     * @return 返回的距离，单位km
     * */
    getDistance: function(lon1,lat1,lon2,lat2){
        var radLat1 = this.rad(lat1);
        var radLat2 = this.rad(lat2);
        var a = radLat1 - radLat2;
        var b = this.rad(lon1) - this.rad(lon2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a/2),2)+Math.cos(radLat1)*Math.cos(radLat2)*Math.pow(Math.sin(b/2),2)));
        s = s * this.EARTH_RADIUS;
        //s = Math.round(s * 10000) / 10000;
        s = Math.round(s);
        return s;
    }
});


/**
 *
 *  -----------------------------------------Student-------------------------------------------------------------
 *
 * */

spatial.school.ui.Student= function(Config){
    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysSchoolByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"
    var url2 = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-getParentsByName',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"
    this.form = new Ext.FormPanel({
        border:false,
        defaults: {anchor : '95%' },
        defaultType: 'textfield',
        labelWidth: 120,
        items: [
            {
                fieldLabel: 'Student Number',
                allowBlank : false,
                name: 'STUDENT_NUMBER'
            },
            {
                fieldLabel: 'First Name',
                allowBlank : false,
                name: 'STUDENT_FIRST_NAME'
            },
            {
                fieldLabel: 'Last Name',
                allowBlank : false,
                name: 'STUDENT_LAST_NAME'
            },
            new Ext.form.ComboBox({
                store: new Ext.data.ArrayStore({
                    fields: ['id','name'],
                    data : Sparknet.map.moulton.data.sex
                }),
                displayField:'name',
                valueField:'id',
                listWidth:300,
                fieldLabel: 'Sex',
                typeAhead: true,
                mode: 'local',
                name : 'STUDENT_SEX',
                forceSelection: true,
                editable : false,
                triggerAction: 'all',
                emptyText:'Select an sex...',
                selectOnFocus:true
            }),
            new Ext.form.ComboBox({
                store:new Ext.data.Store({
                    proxy:new Ext.data.HttpProxy({url:url}),    //
                    reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['SCHOOL_ID','SCHOOL_NAME']})       //
                }),
                displayField:'SCHOOL_NAME',        //
                valueField : 'SCHOOL_ID',
                typeAhead:false,        //
                triggerAction:'all',
                fieldLabel: 'School',
                loadingText:'Loading...',    //
                hiddenName : 'SCHOOL_ID',
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
                allowBlank : false,
                // forceSelection:true,
                listeners : {

                },
                name:    'SCHOOL_ID_COMBOBOX'

            }),
            new Ext.form.ComboBox({
                store:new Ext.data.Store({
                    proxy:new Ext.data.HttpProxy({url:url2}),    //
                    reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['USER_ID','USER_REAL_NAME']})       //
                }),
                displayField:'USER_REAL_NAME',        //
                valueField : 'USER_ID',
                typeAhead:false,        //
                triggerAction:'all',
                fieldLabel: 'Parents',
                loadingText:'Loading...',    //
                hiddenName : 'PARENT_ID',
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
                allowBlank : false,
                // forceSelection:true,
                listeners : {

                },
                name:    'PARENT_ID_COMBOBOX'

            }),
            {
                fieldLabel: 'Home Address',
                allowBlank : false,
                name: 'STUDENT_ADDRESS'
            },

/*            {
                xtype: 'mapselectedfield',
                emptyText: 'Click on the map',
                fieldLabel: 'Home Location',
                name: 'STUDENT_ADDRESS',
                buttonText: '',
                buttonCfg: {
                    iconCls: 'map_edit'
                }
            },*/
            {
                fieldLabel: 'Mobile',
                allowBlank : false,
                name: 'STUDENT_MOBILE'
            }
        ]
    });
    this.windowForm = new Ext.Window({
        width : 600,
        title : 'Add a student',
        autoScroll : true,
        resizable  : false,
        closeAction :'hide',
        modal : false,
        plain: true,
        items:[this.form],
        buttons: [{
            text: 'Save',
            handler: function(){
                this.addStudents();
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
                {name: 'STUDENT_ID'},
                {name: 'STUDENT_FIRST_NAME'},
                {name: 'STUDENT_NUMBER'},
                {name: 'STUDENT_SEX'},
                {name: 'STUDENT_MOBILE'},
                {name: 'STUDENT_ADDRESS'},
                {name: 'STATE'},
                {name:'CREATE_TIME'},
                {name:'STUDENT_LAST_NAME'},
                {name:'SCHOOL_ID'},
                {name:'SCHOOL_NAME'},
                {name:'END_TIME'}
            ]
        )});





    this.form2 = new Ext.FormPanel({
        buttonAlign : 'center',
        items: [
            {
                layout:'column',
                items:[{
                    columnWidth:.5,
                    layout: 'form',
                    bodyBorder : false,
                    border: false,
                    labelWidth: 120,
                    defaults: {anchor: '95%' },
                    defaultType: 'textfield',
                    items: [ new Ext.form.ComboBox({
                        store:new Ext.data.Store({
                            proxy:new Ext.data.HttpProxy({url:url}),    //
                            reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['SCHOOL_ID','SCHOOL_NAME']})       //
                        }),
                        displayField:'SCHOOL_NAME',        //
                        valueField : 'SCHOOL_ID',
                        typeAhead:false,        //
                        triggerAction:'all',
                        fieldLabel: 'School Name',
                        loadingText:'Loading...',    //
                        hiddenName : 'SCHOOL_ID',
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
                        name:    'Q_SCHOOL_ID_COMBOBOX',
                        id :'Q_SCHOOL_ID_COMBOBOX'
                    }), {
                        xtype : 'textfield',
                        fieldLabel: 'First Name',
                        name: 'Q_FIRST_NAME',
                        id:'Q_ST_FIRST_NAME'
                    }]
                },{
                    columnWidth:.5,
                    layout: 'form',
                    bodyBorder : false,
                    border: false,
                    labelWidth: 120,
                    defaults: {anchor: '95%' },
                    defaultType: 'textfield',
                    items: [{
                        xtype : 'textfield',
                        fieldLabel: 'Student Number',
                        name: 'STUDENT_NUMBER',
                        id:'Q_ST_NUMBER'
                    },{
                        fieldLabel: 'Last Name',
                        name: 'Q_LAST_NAME',
                        id:'Q_ST_LAST_NAME'
                    }]
                }]
            }
        ],
        buttons: [{
            text : 'Search',
            handler: function(){
                this.search();
            },
            scope:this,
            iconCls: 'search'
        },'-',{
            text : 'Add Student',
            handler: function(){
                this.openWindow();
            },
            scope:this,
            iconCls: 'student_panel'
        },'-',{
            text : 'Delete Student',
            handler: function(){
                this.deletStudents();
            },
            scope:this,
            iconCls: 'delete'
        }]
    });






    this.items = [this.form2];



    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 22,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.Student.superclass.constructor.call(this,Config);
}
var student_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
Ext.extend(spatial.school.ui.Student,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    iconCls:'student_panel',
    sm:student_sm,
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        student_sm,
        {
            header: 'Student Number',
            dataIndex: 'STUDENT_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Student First Name',
            dataIndex: 'STUDENT_FIRST_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Student Last Name',
            dataIndex: 'STUDENT_LAST_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Student Mobile',
            dataIndex: 'STUDENT_MOBILE',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Student Address',
            dataIndex: 'STUDENT_ADDRESS',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){
            //Grid1.menus.showAt(event.getXY());
        },
        "render" : function(component){
        }
    },

    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Student",



    search : function(){
        var schoolNumber = Ext.getCmp("Q_SCHOOL_ID_COMBOBOX").getValue();
        var stNumber = Ext.getCmp("Q_ST_NUMBER").getValue();
        var firstName = Ext.getCmp("Q_ST_FIRST_NAME").getValue();
        var lastName = Ext.getCmp("Q_ST_LAST_NAME").getValue();

        var data = {
            SCHOOL_ID : schoolNumber,
            STUDENT_NUMBER : stNumber,
            FIRST_NAME : firstName,
            LAST_NAME : lastName
        }
        Sparknet.map.moulton.action.loadGrid2("school.getStudentBySchool","loadPageInfo",data,this.store,this.pagingBar);
    },


    openWindow : function(){
        this.windowForm.show();
    },

    closeWindow : function(){
        this.windowForm.hide();
        this.form.getForm().reset();
    },
    addStudents : function(){
        var myObject = this;
        var form =  this.form.getForm();
        if(form.isValid()){
            var data = form.getValues(false);
            Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","saveStudent",data,function(){
                myObject.closeWindow();
                myObject.search();
            });
        }
    },
    deletStudents : function(){
        var myObject = this;
        Ext.MessageBox.confirm('Tip', 'To delete data?', function(btn, text){
            if (btn == 'yes'){
                var records =  myObject.getSelectionModel().getSelections();
                var arry = []
                for(var j=0;j<records.length;j++) {
                    arry.push(records[j].data )
                }
                var data = {"STUDNETS":arry};
                Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","deleteStudnets",data,function(){
                    myObject.search();
                });
            }
        });
    },
    reset : function(){
        this.form.getForm().reset();
    }
});





//------------------------------------------------------------------Student History----------------------------------------------

spatial.school.ui.StudentHistory= function(Config){
    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysSchoolByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"


    this.store = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({url:Sparknet.map.information.Config.configJson.url.api2}),
        reader:new Ext.data.JsonReader({
                root:'items',
                totalProperty:'total'},
            [
                {name: 'STUDENT_ID'},
                {name: 'STUDENT_NAME'},
                {name: 'STUDENT_FIRST_NAME'},
                {name: 'STUDENT_NUMBER'},
                {name: 'STUDENT_SEX'},
                {name: 'STUDENT_MOBILE'},
                {name: 'STUDENT_ADDRESS'},
                {name: 'STATE'},
                {name:'CREATE_TIME'},
                {name:'STUDENT_LAST_NAME'},
                {name:'SCHOOL_ID'},
                {name:'SCHOOL_NAME'},
                {name:'END_TIME'},
                {name:'BUS_NUMBER'},
                {name:'BUS_PLATE_NUMBER'},
                {name:'BUS_ID'},
                {name:'BOARDING_TIME'},
                {name:'FING_ID'},
                {name:'LATITUDE'},
                {name:'LONGITUDE'},
                {name:'SPEED'},
                {name:'DIRECT'},
                {name:'ALTITUDE'}
            ]
        ),
        listeners : {
            load : function(store ,records){
                for(var i=0;i<records.length;i++){
                    records[i].set("BOARDING_TIME",time(records[i].data.BOARDING_TIME));
                    records[i].set("SPEED",speed(records[i].data.SPEED));
                }
            }
        }});




    this.form = new Ext.FormPanel({
        buttonAlign : 'center',
        items: [
            {
                layout:'column',
                items:[{
                    columnWidth:.5,
                    layout: 'form',
                    bodyBorder : false,
                    border: false,
                    labelWidth: 120,
                    defaults: {anchor: '95%' },
                    defaultType: 'textfield',
                    items: [ new Ext.form.ComboBox({
                        store:new Ext.data.Store({
                            proxy:new Ext.data.HttpProxy({url:url}),    //
                            reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['SCHOOL_ID','SCHOOL_NAME']})       //
                        }),
                        displayField:'SCHOOL_NAME',        //
                        valueField : 'SCHOOL_ID',
                        typeAhead:false,        //
                        triggerAction:'all',
                        fieldLabel: 'School Name',
                        loadingText:'Loading...',    //
                        hiddenName : 'SCHOOL_ID',
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
                        name:    'Q_SCHOOL_ID_COMBOBOX',
                        id :'Q_SCHOOL_ID_COMBOBOX5'
                    }), {
                        fieldLabel : 'First Name',
                        xtype : 'textfield',
                        name: 'Q_FIRST_NAME',
                        id:'Q_ST_FIRST_NAME5'
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'Last Name',
                        name: 'Q_LAST_NAME',
                        id:'Q_ST_LAST_NAME5'
                    }]
                },{
                    columnWidth:.5,
                    layout: 'form',
                    bodyBorder : false,
                    border: false,
                    labelWidth: 120,
                    defaults: {anchor: '95%' },
                    defaultType: 'textfield',
                    items: [{
                        xtype : 'textfield',
                        name: 'STUDENT_NUMBER',
                        fieldLabel: 'Student Number',
                        id:'Q_ST_NUMBER5'
                    },{
                        xtype : 'datetimefield',
                        fieldLabel: 'Start Date',
                        format:"Y-m-d H:i:s",
                        name: 'student_start_date',
                        id: 'q_student_start_date',
                        vtype: 'daterange',
                        endDateField: 'q_student_end_date' // id of the end date field
                    },{
                        xtype : 'datetimefield',
                        fieldLabel: 'End Date',
                        format:"Y-m-d H:i:s",
                        name: 'student_end_date',
                        id: 'q_student_end_date',
                        vtype: 'daterange',
                        startDateField: 'q_student_start_date' // id of the start date field
                    }]
                }]
            }
        ],
        buttons: [{
            text : 'Search',
            handler: function(){
                this.search();
            },
            scope:this,
            iconCls: 'search'
        },'-',{
            text : 'Location',
            handler: function(){
                this.showLocation();
            },
            scope:this,
            iconCls: 'show_location'
        }]
    });






    this.items = [this.form];

    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 22,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.StudentHistory.superclass.constructor.call(this,Config);
}

var studentHistory_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
Ext.extend(spatial.school.ui.StudentHistory,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    sm : studentHistory_sm,
    iconCls:'student_panel',
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        studentHistory_sm,
        {
            header: 'Scan Time',
            dataIndex: 'BOARDING_TIME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Student Name',
            dataIndex: 'STUDENT_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Bus Number',
            dataIndex: 'BUS_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Bus Plate Number',
            dataIndex: 'BUS_PLATE_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        }/*,{
            header: 'Location',
            dataIndex: 'BUS_ID',
            width: 50,
            renderer:function(val){return Sparknet.map.moulton.action.showMapIcon2(val,"studentHistory")},
            sortable: true
        }*/],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){

        },
        "render" : function(component){
        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Student History",



    search : function(){
        var schoolNumber = Ext.getCmp("Q_SCHOOL_ID_COMBOBOX5").getValue();
        var stNumber = Ext.getCmp("Q_ST_NUMBER5").getValue();
        var firstName = Ext.getCmp("Q_ST_FIRST_NAME5").getValue();
        var lastName = Ext.getCmp("Q_ST_LAST_NAME5").getValue();
        var startDate = Ext.getCmp("q_student_start_date").getValue();
        var endDate = Ext.getCmp("q_student_end_date").getValue();

        var data = {
            SCHOOL_ID : schoolNumber,
            STUDENT_NUMBER : stNumber,
            FIRST_NAME : firstName,
            LAST_NAME : lastName,
            START_DATE : time22(startDate),
            END_DATE : time22(endDate)
        }
        Sparknet.map.moulton.action.loadGrid2("school.getStudentBySchool2","loadPageInfo",data,this.store,this.pagingBar);
    },

    showLocation : function(id){
        Sparknet.map.information.Config.clearAllMarker("student");
        var records = this.getSelectionModel().getSelections();


        var arry = new Array();
        for(var i=0;i<records.length;i++) {
            var record = records[i].data;
            arry.push(record);
            var x = record.LONGITUDE;
            var y = record.LATITUDE;
            var stName = record.STUDENT_NAME;
            var time = record.BOARDING_TIME;
            var bus = record.BUS_NUMBER;


            var p = transform(x,y);
            x = p.x;
            y = p.y;

            var mapWidget = Fusion.getMapById('Map');
            var mapName = mapWidget.getAllMaps()[0]._sMapname;
            var scale = mapWidget.getScale();
            Ext.getCmp('MainTab').activate("mapPanel");
            ZoomToView(x, y, scale, true);
            Sparknet.map.information.Config.addMarker2(x, y, "student", false,  {ST_LABEL: stName },false);
        }


        Sparknet.map.moulton.action.trackStudentPanel.show();
        Sparknet.map.moulton.action.trackStudentPanel.laodData(arry);
    }

});





/**
 *
 *  -----------------------------------------Driver-------------------------------------------------------------
 *
 * */

spatial.school.ui.Driver = function(Config){
    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysBusByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"
    this.form = new Ext.FormPanel({
        border:false,
        defaults: {anchor : '95%' },
        defaultType: 'textfield',
        labelWidth: 120,
        items: [
            {
                fieldLabel: 'Driver Number',
                allowBlank : false,
                name: 'DRIVER_NUMBER'
            },
            {
                fieldLabel: 'First Name',
                allowBlank : false,
                name: 'DRIVER_FIRST_NAME'
            },
            {
                fieldLabel: 'Last Name',
                allowBlank : false,
                name: 'DRIVER_LAST_NAME'
            },
            new Ext.form.ComboBox({
                store: new Ext.data.ArrayStore({
                    fields: ['id','name'],
                    data : Sparknet.map.moulton.data.sex
                }),
                displayField:'name',
                valueField:'id',
                listWidth:300,
                fieldLabel: 'Sex',
                typeAhead: true,
                mode: 'local',
                name : 'DRIVER_SEX',
                forceSelection: true,
                editable : false,
                triggerAction: 'all',
                emptyText:'Select an sex...',
                selectOnFocus:true
            }),
            new Ext.form.ComboBox({
                store:new Ext.data.Store({
                    proxy:new Ext.data.HttpProxy({url:url}),    //
                    reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['BUS_ID','BUS_NUMBER']})       //
                }),
                displayField:'BUS_NUMBER',        //
                valueField : 'BUS_ID',
                typeAhead:false,        //
                triggerAction:'all',
                fieldLabel: 'Bus',
                loadingText:'Loading...',    //
                hiddenName : 'BUS_ID',
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
                allowBlank : false,
                // forceSelection:true,
                listeners : {

                },
                name:    'BUS_ID_COMBOBOX'

            }), {
                fieldLabel: 'Mobile',
                allowBlank : false,
                name: 'DRIVER_MOBILE'
            }
        ]
    });
    this.windowForm = new Ext.Window({
        width : 600,
        title : 'Add a driver',
        autoScroll : true,
        resizable  : false,
        closeAction :'hide',
        modal : false,
        plain: true,
        items:[this.form],
        buttons: [{
            text: 'Save',
            handler: function(){
                this.addDriver();
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
                {name: 'DRIVER_ID'},
                {name: 'DRIVER_NUMBER'},
                {name: 'DRIVER_FIRST_NAME'},
                {name: 'DRIVER_LAST_NAME'},
                {name: 'DRIVER_SEX'},
                {name: 'DRIVER_MOBILE'},
                {name: 'CREATE_TIME'},
                {name: 'BUS_ID'},
                {name: 'BUS_NUMBER'},
                {name: 'BUS_PLATE_NUMBER'},
                {name: 'IMEI'},
                {name: 'STATE'}
            ]
        )
    });


    this.tbar= [{
        xtype : 'label',
        text : 'First Name: '
    }, {
        xtype : 'textfield',
        name: 'Q_FIRST_NAME',
        id:'Q_DR_FIRST_NAME'
    },{
        xtype : 'label',
        text : 'Last Name: '
    }, {
        xtype : 'textfield',
        name: 'Q_LAST_NAME',
        id:'Q_DR_LAST_NAME'
    },'-',{
        text : 'Search',
        handler: function(){
            this.search();
        },
        scope:this,
        iconCls: 'search'
    },'-',{
        text : 'Add Driver',
        handler: function(){
            this.openWindow();
        },
        scope:this,
        iconCls: 'student_panel'
    },'-',{
        text : 'Delete Driver',
        handler: function(){
            this.deleteDriver();
        },
        scope:this,
        iconCls: 'delete'
    }];

    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 22,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.Driver.superclass.constructor.call(this,Config);
}
var driver_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
Ext.extend(spatial.school.ui.Driver,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    iconCls:'driver_panel',
    sm:driver_sm,
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        driver_sm,
        {
            header: 'Driver Number',
            dataIndex: 'DRIVER_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver First Name',
            dataIndex: 'DRIVER_FIRST_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver Last Name',
            dataIndex: 'DRIVER_LAST_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver Mobile',
            dataIndex: 'DRIVER_MOBILE',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'The Current Bus Number',
            dataIndex: 'BUS_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Bus Plate Number',
            dataIndex: 'BUS_PLATE_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){
            //Grid1.menus.showAt(event.getXY());
        },
        "render" : function(component){
        }
    },

    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Driver",



    search : function(){

        var firstName = Ext.getCmp("Q_DR_FIRST_NAME").getValue();
        var lastName = Ext.getCmp("Q_DR_LAST_NAME").getValue();

        var data = {
            FIRST_NAME : firstName,
            LAST_NAME : lastName
        }
        Sparknet.map.moulton.action.loadGrid2("school.getDriverByName","loadPageInfo",data,this.store,this.pagingBar);
    },


    openWindow : function(){
        this.windowForm.show();
    },

    closeWindow : function(){
        this.windowForm.hide();
        this.form.getForm().reset();
    },
    addDriver : function(){
        var myObject = this;
        var form =  this.form.getForm();
        if(form.isValid()){
            var data = form.getValues(false);
            Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","saveDriver",data,function(){
                myObject.closeWindow();
                myObject.search();
            });
        }
    },
    deleteDriver : function(){
        var myObject = this;
        Ext.MessageBox.confirm('Tip', 'To delete data?', function(btn, text){
            if (btn == 'yes'){
                var records =  myObject.getSelectionModel().getSelections();
                var arry = []
                for(var j=0;j<records.length;j++) {
                    arry.push(records[j].data )
                }
                var data = {"DRIVERS":arry};
                Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","deleteDriver",data,function(){
                    myObject.search();
                });
            }
        });
    },
    reset : function(){
        this.form.getForm().reset();
    }
});



//------------------------------------------------------------------Driver History----------------------------------------------

spatial.school.ui.DriverHistory = function(Config){
    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysBusByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"
    this.store = new Ext.data.Store({
        proxy:new Ext.data.HttpProxy({url:Sparknet.map.information.Config.configJson.url.api2}),
        reader:new Ext.data.JsonReader({
                root:'items',
                totalProperty:'total'},
            [
                {name: 'DRIVER_ID'},
                {name: 'DRIVER_NUMBER'},
                {name: 'DRIVER_NAME'},
                {name: 'DRIVER_FIRST_NAME'},
                {name: 'DRIVER_LAST_NAME'},
                {name: 'DRIVER_SEX'},
                {name: 'DRIVER_MOBILE'},
                {name: 'BUS_NUMBER'},
                {name: 'BUS_PLATE_NUMBER'},
                {name: 'BUS_ID'},
                {name: 'LATITUDE'},
                {name: 'LONGITUDE'},
                {name: 'UTIME'},
                {name: 'SPEED'},
                {name: 'DIRECT'},
                {name: 'ALTITUDE'}
            ]
        ),
        listeners : {
            load : function(store ,records){
                 for(var i=0;i<records.length;i++){
                     records[i].set("UTIME",time(records[i].data.UTIME));
                     records[i].set("SPEED",speed(records[i].data.SPEED));					 
                 }
				
            }
        }
    });

    this.form = new Ext.FormPanel({
        buttonAlign : 'center',
        items: [
            {
                layout:'column',
                items:[{
                    columnWidth:.5,
                    layout: 'form',
                    bodyBorder : false,
                    border: false,
                    labelWidth: 120,
                    defaults: {anchor: '95%' },
                    defaultType: 'textfield',
                    items: [ {
                        xtype : 'textfield',
                        fieldLabel : 'Driver Number',
                        name: 'STUDENT_NUMBER',
                        id:'Q_DR_NUMBER5'
                    }, {
                        xtype : 'textfield',
                        fieldLabel : 'First Name',
                        name: 'Q_FIRST_NAME',
                        id:'Q_DR_FIRST_NAME5'
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'Last Name',
                        name: 'Q_LAST_NAME',
                        id:'Q_DR_LAST_NAME5'
                    }]
                },{
                    columnWidth:.5,
                    layout: 'form',
                    bodyBorder : false,
                    border: false,
                    labelWidth: 120,
                    defaults: {anchor: '95%' },
                    defaultType: 'textfield',
                    items: [{
                        xtype : 'datetimefield',
                        fieldLabel: 'Start Date',
                        format:"Y-m-d H:i:s",
                        name: 'student_start_date',
                        id: 'q_dr_start_date',
                        vtype: 'daterange',
                        endDateField: 'q_dr_end_date' // id of the end date field
                    },{
                        xtype : 'datetimefield',
                        fieldLabel: 'End Date',
                        format:"Y-m-d H:i:s",
                        name: 'student_end_date',
                        id: 'q_dr_end_date',
                        vtype: 'daterange',
                        startDateField: 'q_dr_start_date' // id of the start date field
                    },{
                        xtype : 'textfield',
                        fieldLabel : 'Speed/mph',
                        name: 'Q_SPEED',
                        id:'Q_SPEED'
                    }]
                }]
            }
        ],
        buttons: [{
            text : 'Search',
            handler: function(){
                this.search();
            },
            scope:this,
            iconCls: 'search'
        },'-',{
            text : 'Location',
            handler: function(){
                this.showLocation();
            },
            scope:this,
            iconCls: 'show_location'
        }]
    });






    this.items = [this.form];
    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 22,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.DriverHistory.superclass.constructor.call(this,Config);
}

var driverHistory_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
Ext.extend(spatial.school.ui.DriverHistory,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    sm : driverHistory_sm,
    iconCls:'driver_panel',
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        driverHistory_sm,
        {
            header: 'Driver Number',
            dataIndex: 'DRIVER_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver First Name',
            dataIndex: 'DRIVER_FIRST_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver Last Name',
            dataIndex: 'DRIVER_LAST_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Driver Mobile',
            dataIndex: 'DRIVER_MOBILE',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'The Current Bus Number',
            dataIndex: 'BUS_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Bus Plate Number',
            dataIndex: 'BUS_PLATE_NUMBER',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Time',
            dataIndex: 'UTIME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'Speed/mph',
            dataIndex: 'SPEED',
            width: 300,
            renderer:function(val){return nulltoEmpty(val)},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){

        },
        "render" : function(component){
        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"Driver History",



    search : function(){
        var drNumber = Ext.getCmp("Q_DR_NUMBER5").getValue();
        var firstName = Ext.getCmp("Q_DR_FIRST_NAME5").getValue();
        var lastName = Ext.getCmp("Q_DR_LAST_NAME5").getValue();
        var startDate = Ext.getCmp("q_dr_start_date").getValue();
        var endDate = Ext.getCmp("q_dr_end_date").getValue();
        var speed = Ext.getCmp("Q_SPEED").getValue();

        var data = {
            DRIVER_NUMBER : drNumber,
            FIRST_NAME : firstName,
            LAST_NAME : lastName,
            START_DATE : time22(startDate),
            END_DATE : time22(endDate),
            SPEED : speed
        }
        Sparknet.map.moulton.action.loadGrid2("school.getBusHistory","loadPageInfo",data,this.store,this.pagingBar);
    },

    showLocation : function(id){
        Sparknet.map.information.Config.clearAllMarker("driver");
        var records = this.getSelectionModel().getSelections();


        var arry = new Array();
        for(var i=0;i<records.length;i++){
            var result = records[i].data;
            arry.push(result);
            if(result.LATITUDE){
                var mapWidget = Fusion.getMapById('Map');
                var mapName = mapWidget.getAllMaps()[0]._sMapname;
                var scale = mapWidget.getScale();
                Ext.getCmp('MainTab').activate("mapPanel");

                var x = result.LONGITUDE;
                var y = result.LATITUDE;
                var p = transform(x,y);
                x = p.x;
                y = p.y;

                ZoomToView(x,y, scale, true);
                Sparknet.map.information.Config.addMarker2(x,y,"bus",false,{BUS_NUMBER:result.BUS_NUMBER},false);
            }
        }

        Sparknet.map.moulton.action.trackBusPanel.show();
        Sparknet.map.moulton.action.trackBusPanel.laodData(arry);
    }

});


//------------------------------------------------------------------School----------------------------------------------

spatial.school.ui.School= function(Config){
    var url = Sparknet.map.information.Config.configJson.url.api+"{type:'ExtComboBox',sqlId:'school-querysSchoolByNumber',sqlActive:'loadPageInfo',daoName:'MySqlMap',data:{}}"

    this.form = new Ext.FormPanel({
        border:false,
        defaults: {anchor : '95%' },
        defaultType: 'textfield',
        labelWidth: 120,
        items: [
            {
                fieldLabel: 'School Name',
                allowBlank : false,
                name: 'SCHOOL_NAME'
            },
            {
                fieldLabel: 'School Address',
                allowBlank : false,
                name: 'SCHOOL_ADDRESS'
            }/*,
             {
             xtype: 'mapselectedfield',
             emptyText: 'Click on the map',
             fieldLabel: 'Location',
             name: 'LOCATION',
             buttonText: '',
             buttonCfg: {
             iconCls: 'map_edit'
             }
             }*/
        ]
    });
    this.windowForm = new Ext.Window({
        width : 600,
        title : 'Add an school',
        autoScroll : true,
        resizable  : false,
        closeAction :'hide',
        modal : false,
        plain: true,
        items:[this.form],
        buttons: [{
            text: 'Save',
            handler: function(){
                this.addSchool();
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
                {name: 'SCHOOL_ID'},
                {name: 'SCHOOL_NAME'},
                {name: 'SCHOOL_ADDRESS'},
                {name: 'STATE'},
                {name: 'CREATE_TIME'}
            ]
        )});
    this.tbar= [{
        xtype : 'label',
        text : 'School Name: '
    },new Ext.form.ComboBox({
        store:new Ext.data.Store({
            proxy:new Ext.data.HttpProxy({url:url}),    //
            reader:new Ext.data.JsonReader({totalProperty:"total",root:"items",fields:['SCHOOL_ID','SCHOOL_NAME']})       //
        }),
        displayField:'SCHOOL_NAME',        //
        valueField : 'SCHOOL_ID',
        typeAhead:false,        //
        triggerAction:'all',
        fieldLabel: 'School',
        loadingText:'Loading...',    //
        hiddenName : 'SCHOOL_ID',
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
        name:    'Q_SCHOOL_ID_COMBOBOX',
        id :'Q_SCHOOL_ID_COMBOBOX2'
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
        text : 'Add School',
        handler: function(){
            this.openWindow();
        },
        scope:this,
        iconCls: 'school_panel'
    },'-',{
        text : 'Delete School',
        handler: function(){
            this.deletSchool();
        },
        scope:this,
        iconCls: 'delete'
    }];

    this.pagingBar = new Ext.ux.PagingToolbar({
        pageSize: 22,
        store: this.store,
        displayInfo: false
    });
    this.bbar = this.pagingBar;
    spatial.school.ui.School.superclass.constructor.call(this,Config);
}
var school_sm = new Ext.grid.CheckboxSelectionModel({singleSelect : false});
Ext.extend(spatial.school.ui.School,Ext.grid.GridPanel, {
    trackMouseOver:false,
    stripeRows:true,
    iconCls:'school_panel',
    sm:school_sm,
    loadMask:{msg:'Loading.....',removeMask:true},
    columns:[
        school_sm,
        {
            header: 'School Name',
            dataIndex: 'SCHOOL_NAME',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        },{
            header: 'School Address',
            dataIndex: 'SCHOOL_ADDRESS',
            width: 300,
            renderer:function(val){return ''+nulltoEmpty(val)+''},
            sortable: true
        }],
    listeners : {
        'rowdblclick' : function(Grid1,rowIndex,e){
        },
        'rowclick' : function(Grid1,rowIndex,event){
            Grid1.menus.showAt(event.getXY());
        },
        "render" : function(component){
        }

    },
    viewConfig: {
        forceFit:true,
        enableRowBody:true,
        showPreview:true
    },

    title:"School",



    search : function(){
        var number = Ext.getCmp("Q_SCHOOL_ID_COMBOBOX2").getValue();
        var data = {
            SCHOOL_ID : number
        }
        Sparknet.map.moulton.action.loadGrid2("school.getSchool","loadPageInfo",data,this.store,this.pagingBar);
    },

    showLocation : function(){
        var record = this.getSelectionModel().getSelected();

    },
    openWindow : function(){
        this.windowForm.show();
    },

    closeWindow : function(){
        this.windowForm.hide();
        this.form.getForm().reset();
    },
    addSchool : function(){
        var myObject = this;
        var form =  this.form.getForm();
        if(form.isValid()){
            var data = form.getValues(false);
            Sparknet.map.moulton.action.submitInforService("Data processing...","SCHOOL_SERVICE","saveSchool",data,function(){
                myObject.closeWindow();
                myObject.search();
            });
        }
    },
    deletSchool : function(){
        var myObject = this;
        Ext.MessageBox.confirm('Tip', 'To delete data?', function(btn, text){
            if (btn == 'yes'){
                var records =  myObject.getSelectionModel().getSelections();
                var arry = []
                for(var j=0;j<records.length;j++) {
                    arry.push(records[j].data )
                }
                var data = {"SCHOOLS":arry};


                pp =  {
                    sqlId : "school.deleteSchools",
                    sqlActive : "update",
                    daoName : "MySqlMap",
                    data : data
                };
                Sparknet.map.moulton.action.submitInforService("Data processing...","SQL_SERVICE","sqlMap",pp,function(){
                    myObject.search();
                });
            }
        });
    },
    reset : function(){
        this.form.getForm().reset();
    }


});
