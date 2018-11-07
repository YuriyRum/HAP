sap.ui.define(
[
	"sap/ui/core/Control",
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/Text",
	"sap/m/ColumnListItem",
	"./library"
],
function(Control, Table, Column, Text, ColumnListItem, library){
	"use strict";
	
	Control.extend("hap.lib.DynamicList",{
		library: "hap.lib",			
		metadata:{			
			properties: {
				columns: {type: "object"},
				pathToData: {type: "string"}
			},
			
			aggregations: {
				_table: {type: "sap.m.Table", multiple: false, visibility: "hidden"}
			}			
		},
		
		init: function(){
			this.setAggregation("_table", new Table())
		},
		
		onBeforeRendering: function() {
			if( Control.prototype.onBeforeRendering ) {
				Control.prototype.onBeforeRendering.apply(this, arguments);
			} 
			var oTable = this.getAggregation("_table");			
			oTable.destroyColumns();
			var oColumns = this.getProperty("columns");
			if(!oColumns) {
				return;
			}								
			var oColumnListItem = new ColumnListItem();
										
			oColumns.forEach(function(oColumn){
				var sWidth = oColumn.width||"10em"; 
				var oNewColumn = new Column({
					width: sWidth					
				});
				oNewColumn.setHeader( new Text({ text:oColumn.name }) );
				oTable.addColumn(oNewColumn);
								
				oColumnListItem.addCell( new Text().bindText({
					path: oColumn.sourceName 
				}));				
			});		
			
			var sPath = this.getProperty("pathToData");
			oTable.bindItems({
				path: sPath,
				template: oColumnListItem
			});					
		},
		
		renderer: {
			render: function(oRm, oControl){
				oRm.write("<div");
				oRm.writeControlData(oControl);
				oRm.write(">");
				
				oRm.renderControl(oControl.getAggregation("_table"));
				
				oRm.write("</div>");
				
			}
		}, 
		
		exit: function() {
			var oTable = this.getAggregation("_table");
			oTable.unbindItems();
			oTable.destroy();
		}
		
	});
});