sap.ui.define(
[
	"hapwp/model/localData",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
],
function(localData, JSONModel, ResourceModel){
	"use strict";
	
	var oModel = {};
	
	oModel.createDataModel = function(){
			return new JSONModel(localData);
	};
	
	oModel.createI18NModel = function(){
		return new ResourceModel({
			bundleName: "hapwp.i18n.i18n"
		});
	};
	
	oModel.createDataTransferModel = function(){
		return new JSONModel({
			params : { config: null  }
		});
	};
	
	return oModel;
});