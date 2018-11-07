sap.ui.define(
		
[
	"sap/ui/core/UIComponent",
	"hapwp/metadata/UIComponentMetadata",
	"hapwp/model/Model",
	"hapwp/utils/Refresher"
],

function(UIComponent, UIComponentMetadata, Model, Refresher){
	"use strict";
	
	UIComponent.extend("hapwp.Component", {
		
		metadata: UIComponentMetadata.getMetadata(),
		
		init: function(){
			if(UIComponent.prototype.init){
				UIComponent.prototype.init.apply(this, arguments);
			}			
			this.getRouter().initialize();
			this.setModel(Model.createDataModel());
			this.setModel(Model.createI18NModel(), "i18n");
			this.setModel(Model.createDataTransferModel(), "transfer");
			
			Refresher.addListener(this.getModel());
		},
		
		exit: function(){
			if(UIComponent.prototype.destroy){
				UIComponent.prototype.destroy.apply(this, arguments);
			}			
			Refresher.destroy();
		}
		
	});
});