sap.ui.define(
[
	"sap/ui/core/mvc/Controller",
	"hap/lib/MessageBroker"
],
function(Controller, MessageBroker){
	"use strict";
	
	Controller.extend("hapwp.controller.WorkPlace", {		
		onTilePress: function(e){			
			var oModel = this.getView().getModel("transfer"); 
			oModel.getData().config = e.getSource().getConfig();
//			oModel.refresh();
//			var oEventBus = sap.ui.getCore().getEventBus(); 
//			oEventBus.publish("config", "newConfig", e.getSource().getConfig());
			MessageBroker.createChannel("config")
						 .publish("newConfig", e.getSource().getConfig(), this._bPublishDelay);
			sap.ui.core.UIComponent.getRouterFor(this).navTo("list", {}, false);
			
			this._bPublishDelay = false;
		},  
		
		_bPublishDelay: true
		
	});
});