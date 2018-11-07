sap.ui.define([],
function(){
	"use strict";
	
	var fnChannel = function(){
		this.oPublushed = {};
		this.oSubscribers = {};
	};
	
	fnChannel.prototype.publish = function(eventName, oData, bDelay) {
		if(bDelay) {
			this.oPublushed[eventName] = oData;
			return;
		};
		var aHandlers = this.oSubscribers[eventName];
		
		for(var i = 0; i < aHandlers.length; i++) {
			aHandlers[i](oData);
		};
	};
	
	fnChannel.prototype.subscribe = function(eventName, fnHandler) {
		if(!this.oSubscribers[eventName]) {
			this.oSubscribers[eventName] = [];
		} 
		this.oSubscribers[eventName].push(fnHandler);
		
		var oData = this.oPublushed[eventName];
		if(oData) {
			this.publish(eventName, oData);			
			delete this.oPublushed[eventName];
		}
	};
	
	fnChannel.prototype.unsubscribe = function(eventName, fnHandler) {
		var aHandlers = this.oSubscribers[eventName];
		if(aHandlers) {
			var indexAt = aHandlers.indexOf(fnHandler);	
			if(indexAt !== -1) {
				aHandlers.splice(indexAt, 1);
			}
		};
		if(aHandlers.length === 0) {
			delete this.oSubscribers[eventName];
		}
	};
	
	var oMessageBroker = {
			
		oChannels: {},	
		createChannel: function(sChannelName){
			if(!this.oChannels[sChannelName]) {
				this.oChannels[sChannelName] = new fnChannel();
			};			
			return this.oChannels[sChannelName];
		},
		
		
	};
	
	return oMessageBroker;
}, /* bExport = */ false);