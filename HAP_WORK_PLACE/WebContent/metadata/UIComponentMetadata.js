sap.ui.define([],
function(){
	"use strict";
	
	return {
		getMetadata: function(){
			return {
				rootView: "hapwp.view.WorkPlace",
				
				properties: {
					config: {type: "object"}
				},
				
				routing: {
					config: {
						routerClass: "sap.m.routing.Router",
						viewType: "XML",
						viewPath: "hapwp.view",
						controlId: "hapwp_app",
						controlAggregation: "pages"						
					},
					
					routes:[
						{
							pattern: "",
							name:"workplace",
							target:"workplace"
						},
						{
							pattern: "list",
							name:"list",
							target:"list"
						}
					],
					
					targets:{
						workplace:{
							viewName: "WorkPlace",
							viewLevel: 1
						},
						list:{
							viewName:"List",
							viewLevel: 2
						}
					}
				}
			};
		}
	};
});
