sap.ui.define([], 
function(){
	"use strict";
	
	return {
		services:  [
				{ title: "Текущие задачи", number: 10 , config: {
					columns: [ 
						{name: "Тип документа", width: "12em", sourceName: "docType"},
						{name: "ФИО", sourceName: "name"},
						{name: "Выполнить до", sourceName: "createUntil"},
						]
					} },
				{ title: "Мои цели", number: 2 },
				{ title: "Цели подчиненных", number: 0 },
				{ title: "Планы развития", number: 1 },
				{ title: "Текущие документы", number: 12 },
				{ title: "Уровень успешности", number: 12 },
				{ title: "Архив", number: 54, config: {
					columns: [ 
						{name: "Тип документа", width: "12em", sourceName: "docType"},
						{name: "ФИО", sourceName: "name"},
						]
					} 
				}				
			]					
	};
});