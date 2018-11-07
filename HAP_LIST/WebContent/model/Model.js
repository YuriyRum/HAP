sap.ui.define(
[
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/model/json/JSONModel"
],
function(ResourceModel, JSONModel){
	"use strict";
	
	var oModel = {};
	
	oModel.createI18NModel = function(){
		return new ResourceModel({
			bundleName: "haplist.i18n.i18n"
		});
	};
	
	oModel.createDataModel = function(){
		return new JSONModel({
			entities:[
				{docType:"Годовая оценка", name:"Иванов", createUntil: "20.10.2018"},
				{docType:"Годовая оценка", name:"Сидоров", createUntil: "20.11.2018"}
			]
		});
	};
	
	oModel.createTransferModel = function(oData){
		return new JSONModel(oData);
	};
	
	return oModel;
}, /* bExport=*/ true);