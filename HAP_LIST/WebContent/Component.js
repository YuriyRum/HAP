sap.ui.define(
[
	"sap/ui/core/UIComponent",
	"haplist/metadata/UIComponentMetadata",
	"haplist/model/Model",
	"hap/lib/MessageBroker"
],
function(UIComponent, UIComponentMetadata, Model, MessageBroker){
	"use strict";
	
	UIComponent.extend("haplist.Component", {
		
		metadata: UIComponentMetadata.getMetadata(),			
		
		init: function(){
			if(UIComponent.prototype.init){
				UIComponent.prototype.init.apply(this, arguments);
			}
			this.setModel(Model.createDataModel());			
			this.setModel(Model.createI18NModel(), "i18n");
			MessageBroker.createChannel("config").subscribe("newConfig", this._createTransferModel.bind(this));
		},

		onBeforeRendering: function(){
			if(UIComponent.prototype.onBeforeRendering){
				UIComponent.prototype.onBeforeRendering.apply(this, arguments);
			} 
		},
		
		onAfterRendering: function(){
			if(UIComponent.prototype.onAfterRendering){
				UIComponent.prototype.onAfterRendering.apply(this, arguments);
			} 
		},
		
		_createTransferModel: function(/*sChannel, sEventId,*/ oData){
			var oLocalData = oData||{};
			var oModel = this.getModel("transfer");
			if(!oModel) {
				this.setModel(Model.createTransferModel(oLocalData), "transfer");
			}else{
				oModel.setData(oLocalData);
				oModel.refresh();
			}			
		},
		
		exit: function(){
			MessageBroker.createChannel("config").unsubscribe("newConfig", this._createTransferModel);
		}
		
	});
});