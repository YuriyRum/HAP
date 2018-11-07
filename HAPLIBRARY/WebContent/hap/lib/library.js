/* global hap:true */

sap.ui.define(
[
	"jquery.sap.global",
	"sap/ui/core/library"
], 
function(jQuery){
	"use strict";
	// include Theme in case we have it
	//...
	
	// init library
	
	sap.ui.getCore().initLibrary({
		name: "hap.lib",
		version: "1.0.0",
		dependencies: ["sap.ui.core", "sap.m"],
		types:[],
		interfaces:[],
		controls:[
			"hap.lib.DynamicList",
			"hap.lib.MessageBroker"
		],
		elements:[]
	});
	return hap.lib;
	
}, /* bExport= */ false );