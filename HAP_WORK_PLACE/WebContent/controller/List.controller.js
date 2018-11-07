sap.ui.define(
[
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
],		
function(Controller, History){
	"use strict";
	
	Controller.extend("hapwp.controller.List",{
		
		onNavButton: function(e){
			var oHistory = History.getInstance();
			var oHash = oHistory.getPreviousHash();
			
			sap.ui.core.UIComponent.getRouterFor(this).navTo("workplace", {});
			/*
			if(oHash){
				window.history.go(-1);
			}else{
				sap.ui.core.UIComponent.getRouterFor(this).navTo("workplace", {});
			}
			*/
		}
	
	});
});