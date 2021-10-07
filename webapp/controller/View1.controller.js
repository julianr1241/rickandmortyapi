sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
		"use strict";

		return Controller.extend("prueba.controller.View1", {
			
			api: "https://rickandmortyapi.com/api/character",
			onInit: function () {
			var that=this;
			that.getData();
		
				
			},
	
			onItemPres:function(oEvent)
		{
			var oItem = oEvent.getSource();
			var oCtx = oItem.getBindingContext();
			var path = oCtx.getPath();
			this.getView().byId("objectid").bindElement(path);
			// alert(oEvent.getSource());
			
		},
			getData: function()
			{
				let that=this;
				var list=[]
				jQuery.ajax(
					{
						url:that.api,
						method:'GET',
						dataType:'json',
						async:true,
						success:function(oData)
						{
							if(oData.results.length>0)
							{
								console.log(oData.results);
								list=oData.results;
								that.drawList(list);
							}
						}
					}
				)
				
			},
			drawList:function(list)
			{
				var Character={
					character:[]
				};
				if(list.length>0)
				{
					for(let i=0;i<list.length;i++)
					{
						var obj={
						
							name:list[i].name,
							status:list[i].status,
							image:list[i].image,
							gender:list[i].gender,
							specie:list[i].species,
							location:list[i].location.name
						
							
						};
						Character.character.push(obj);
					}
					var model=new JSONModel(Character);
				
					
					this.getView().setModel(model);
		
			
				}
			}
		
		});
	});
