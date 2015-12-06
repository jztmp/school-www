
/**
 *       
 * @class spark.Log
 */

Ext.namespace('spatial.school.ui')

spatial.school.ui.User = function(Config){

    this.recordUser = Ext.data.Record.create([
          			     					{name: 'ID'},
        	        						{name: 'NAME'},
        	        						{name: 'P_ID'},
        	        						{name: 'CITY_ID'},
        	        						{name: 'SCHOOL_ID'},
        	        						{name: 'OLD'},
        	        						{name: 'SEX'},
        	        						{name: 'TEL'},
        	        						{name: 'MAIL'},
        	        						{name: 'ADDRESS'},
        	        						{name: 'BUS_ID'},
        	        						{name: 'STATE'},
        	        						{name: 'USERNAME'},
        	        						{name: 'PASSWROD'},
        	        						{name: 'POWER_ID'}
                                           ]); 

	   this.menus = new Ext.menu.Menu();
       this.menus.add({
                             text: 'User Permission',
                             handler : function(){
                            	 user2.window4.show();
                                }
                         });
 
	   
this.formPanel4 = new Ext.form.FormPanel({
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
										        data : [['0',"System administrator"],['1',"Principal"],['2',"Teacher"],['3',"Students' parents"],['4',"Bus driver"]] // from states.js
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
	   });
	   
	   
	   
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
		    html : "<iframe id='id1' src='http://"+spark.variable.Variable.serverIp+":8080/jwchat/' width='100%' height='100%' scrolling='no' frameborder='0'></iframe>"
	   });
	   
       this.store = new Ext.data.Store({ 
		        proxy:new Ext.data.HttpProxy({url:spark.variable.Variable.url}), 
		        reader:new Ext.data.JsonReader({ 
		                        root:'rows', 
		                        totalProperty:'total'}, 
		                        this.recordUser
		)});
   			this.tbar= [
        		{
    				xtype : 'label',
    				text : 'User Name'
				},{
					xtype : 'textfield',
					width : "400",
					height : "30",
					id : "USER_NAME_MG",
	                name : 'USER_NAME'
	            },'-',{
    				xtype : 'label',
    				text : 'User Role'
				},new Ext.form.ComboBox({
			        store: new Ext.data.ArrayStore({
				        fields: ['id','name'],
				        data : [['0',"System administrator"],['1',"Principal"],['2',"Teacher"],['3',"Students' parents"],['4',"Bus driver"]] // from states.js
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
	                text : 'Chat',
	                handler: function(){
	                this.chat();
	                },
	                scope:this,
	                iconCls: 'chat'	
	            }];
				            
		this.pagingBar = new Ext.ux.PagingToolbar({
	        pageSize: 22,
	        store: this.store,
	        displayInfo: false
	    });		            
         this.bbar = this.pagingBar;
		spatial.school.ui.User.superclass.constructor.call(this,Config);
	   }

Ext.extend(spatial.school.ui.User,Ext.grid.GridPanel, {
		trackMouseOver:false,
		stripeRows:true,
		loadMask:{msg:'Loading.....',removeMask:true},
		columns:[
			{
				header: 'User Name',
				dataIndex: 'NAME',
				width: 300,
				renderer:function(val){return ''+nulltoEmpty(val)+''},
				sortable: true
			},{
				header: 'User Role',
				dataIndex: 'POWER_ID',
				width: 300,
				renderer:function(val){return ''+nulltoEmpty(val)+''},
				sortable: true
			}],
		  listeners : {
		     	           'rowdblclick' : function(Grid1,rowIndex,e){
		     	           },
		     	           'rowclick' : function(Grid1,rowIndex,event){
		     	        	  user2.menus.showAt(event.getXY());
		     	           },
		     	           "render" : function(component){
				             
				           }
		     	          
		     	        },
		  viewConfig: {
		                 forceFit:true,
		                 enableRowBody:true,
		                 showPreview:true
		     	        },
        
        title:"<font style='font-size:200%;'>User</font>",
        
      
     
        
        search : function(){
	        			 var UserName = Ext.getCmp('USER_NAME_MG').getValue();
	        			 var UserRole = Ext.getCmp('USER_ROLE_MG').getValue();
				        
	
				        var submitObject = {USER_NAME:UserName,USER_ROLE:UserRole};
						var sqlName = "listUser";
				        submitObject = Ext.encode(submitObject);
				        this.pagingBar.setOtherarams({sqlName:sqlName,pojo:submitObject});
						this.store.load({params:{start:0,limit:22,sqlName:sqlName,pojo:submitObject,action:'query'},timeout:3000,callback:function(){
						if(user2.store.getCount()==0){
						  Ext.MessageBox.alert("Tips",'<font style="font-size:160%">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;records&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>')
						}				
						}
			});           
        },
        
     
        reset : function(){
            this.formPanel4.getForm().reset();
        },
        updateRole : function(){
        	var record = this.getSelectionModel().getSelected(); 
        	var id = record.get("ID");
        	var UserRole = Ext.getCmp('USER_ROLE2').getValue();
	         var r = new this.recordUser({
	        	 	ID:id,
	        	 	POWER_ID : UserRole
	         });
	         
	         
	         
	         	 var a = [{"POWER_ID":UserRole,"ID":id}];
		         spark.tool.LoadMsg.wait();
	             var params = {};
	             params.sqlName = 'updateUserRole';
	             params.action = 'update';
	             params.pojo = Ext.encode(a);
	    	   //alert(spark.variable.Variable.mapUrl);
	    	   var ajax = new spark.tool.Ajax({
				    url: spark.variable.Variable.url,
			        params:params
			        });
			        ajax.setSuccessFunction(function(responseArray){
			        	record.set("POWER_ID",UserRole);  
			           spark.tool.LoadMsg.stopWait();
			           user2.window4.hide();
			        })
	    	    	ajax.send(); 
        },
        
        chat : function(){
        	//this.window2.show();
        	window.open("http://"+spark.variable.Variable.serverIp+":8080/jwchat/",'',"height=300, width=300, top=0, left=400,toolbar=no, menubar=no, scrollbars=no, resizable=no, location=n o, status=no")
        }

  
});
