/**
author :Warren
http://www.wglong.com
**/
var userImei = 'SNI-Mad-052';
var LATITUDE,LONGITUDE;
Date.prototype.format = function(format){ 
var o = { 
"M+" : this.getMonth()+1, //month 
"d+" : this.getDate(), //day 
"h+" : this.getHours(), //hour 
"m+" : this.getMinutes(), //minute 
"s+" : this.getSeconds(), //second 
"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
"S" : this.getMilliseconds() //millisecond 
} 

if(/(y+)/.test(format)) { 
format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
} 

for(var k in o) { 
if(new RegExp("("+ k +")").test(format)) { 
format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
} 
} 
return format; 
} 


function goTo(page) {
    showLoader();
	$.mobile.changePage(page, {
		  transition: "slide"
    });
}
function goBack() {
	$.mobile.back();
}


function showLoader() {
    //显示加载器.for jQuery Mobile 1.2.0
    $.mobile.loading('show', {
        text: '加载中...', //加载器中显示的文字
        textVisible: true, //是否显示文字
        theme: 'b',        //加载器主题样式a-e
        textonly: false,   //是否只显示文字
        html: ""           //要显示的html内容，如图片等
    });
}

//隐藏加载器.for jQuery Mobile 1.2.0
function hideLoader(){
    //隐藏加载器
    $.mobile.loading('hide');
}

var api = {

    pageNum : 0,

    pageSize : 10,

    total : 0,
    
    myScroll : null,

    getODB2GPS : function(imei){
        var url = "";
        if(imei){
             url = webPath+"/api/SCHOOL_SERVICE/getodb2CurrentDate/{'IMEI':'"+imei+"'}"
        }else{
             url = webPath+"/api/SCHOOL_SERVICE/getodb2CurrentDate/{'IMEI':'"+userImei+"'}"
        }
		var now = new Date(); 
		var nowStr = now.format("yyyy-MM-dd hh:mm:ss"); 
		console.log(nowStr);
		$("#heartNumber").html(nowStr); 
        $.getJSON(url, null, function (data, textStatus){
        	
        	if(data['result']){              
        			/*		 
        		$("#heartNumber").html(data['result']['SPEED']);   
				*/
				
				
				
                $("#timeDiv").html(data['result']['NewDate1']);
                $("#htime").html(data['result']['NewDate']);
                LATITUDE =data['result']['LATITUDE'];
                LONGITUDE =data['result']['LONGITUDE'];	
        		
        	}
        });
    },
    getODB2GPSHistry : function(func,imei) {
       
        if(api.pageNum<0){
        	api.pageNum = 0;
        }
            var url = "";
            if (imei) {
                    url = webPath + "/api/SCHOOL_SERVICE/getodb2HistryDate/{'IMEI':'" + imei + "','pageNum':" + api.pageNum + ",'pageSize':" + api.pageSize + "}"
                } else {
                    url = webPath + "/api/SCHOOL_SERVICE/getodb2HistryDate/{'IMEI':'" + userImei + "','pageNum':" + api.pageNum + ",'pageSize':" + api.pageSize + "}"
                }
            //console.log(url);
                $.getJSON(url, null, function (data, textStatus) {
                	//console.log(api);
                    if(data['total']!=api.total){
                        api.total += data.length;
                        api.pageNum += api.pageSize;
                        func(data['items']);
                    }else{
                        api.myScroll.refresh();
                    }
                });
    },
    getPageNum : function(){
        if(this.pageNum>0){
             var n1 = this.pageNum*this.pageSize;
            if(n1>=this.total){
                return -1;
            }else{
                return this.pageNum;
            }
        }else{
            return this.pageNum
        }
    },
    showHistory : function(){
        api.getODB2GPSHistry( function (list) {	// <-- Simulate network congestion, remove setTimeout from production!
            var content = ""
            for (var i=0;i<list.length;i++){				
                content = content + "<li>";
				// content = content + "<div class=\"listtitle\">"+list[i]['PULSECOUNT']+"<span class=\"timestyle\">"+list[i]['DATE']+"</span></div>";
                content = content + "<div class=\"listtitle\">"+ "<a href=\"#\" onclick=\"api.showMapodb2("+list[i]['LATITUDE']+","+list[i]['LONGITUDE']+")\">" +list[i]['NewDate'] 
				+"</a></div>";
                content = content + "</li>";
            }
            $("#contentList1").append(content).listview('refresh');
            //console.log(api);
            //console.log(api.myScroll);
            if(api.myScroll){
            	 api.myScroll.refresh();		//数据加载完成后，调用界面更新方法   Remember to refresh when contents are loaded (ie: on ajax completion)
            }
           
        })
    },
    showMapodb2:function(temp1,temp2){
		if (temp1) {
			window.location.href = "http://maps.google.com/maps?f=q&q="+temp1+","+temp2+"&z=16";
		}
		else {
			window.location.href = "http://maps.google.com/maps?f=q&q="+LATITUDE+","+LONGITUDE+"&z=16";
		}
    	
    }
   

}


