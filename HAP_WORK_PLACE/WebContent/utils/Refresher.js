sap.ui.define(
[],		
function(){
	"use strict";
	
	return {
		addListener: function(oModel){
			//this._ids.push(jQuery.sap.intervalCall(6000, this, this._updateModel, [oModel]));
			this._worker = new Worker("utils/worker.js");
			this._worker.postMessage("start"); // start fetching data from back-end
			
			var that = this;
			this._worker.onmessage = function(){
				that._updateModel(oModel);
			}
		},					
		
		destroy: function(){
//			this._ids.forEach(function(id){
//				jQuery.sap.clearIntervalCall(id);
//			});
			this._worker.postMessage("stop");
			this._worker.terminate();
		},		
		_updateModel: function(Model){			
			Model.getData().services.forEach(function(service){
				service.number = Math.floor(Math.random() * 10);
			});
			Model.refresh();
		},
		
		_ids:[],
		_worker:{}
	}
});