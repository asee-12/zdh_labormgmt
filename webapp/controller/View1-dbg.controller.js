sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        var that;
        return Controller.extend("zdhproject1.controller.View1", {
            onInit: function () {
                that = this;
				that.loadGraph();
				that._setStatusGraph();
            },

			loadGraph: function() {
				var oModel = that.getOwnerComponent().getModel();
				oModel.read("/ZC_GRAPH1_S", {
					success: function(oData) {
						debugger;
						var oToday = oData.results[0];
						var oMicroToday = that.getView().byId("idMicroToday");
						var sTodayText = that.getView().byId("idPercentToday");
						
						that._setGraph(oToday,oMicroToday, sTodayText);
						
						
						var oTomorrow = oData.results[1];
						var oMicroTomorrow = that.getView().byId("idMicroTomorrow");
						var sTomorrowText = that.getView().byId("idPercentTomorrow");
						
						that._setGraph(oTomorrow,oMicroTomorrow, sTomorrowText);
						
						var oWeek =  oData.results[2];
						var oMicroWeek = that.getView().byId("idMicroWeek");
						var sWeekText = that.getView().byId("idPercentWeek");
						
						that._setGraph(oWeek, oMicroWeek, sWeekText);
						
	
	
	
					},
					error: function(oError) {
	
					}
				});
			},
	
			_setGraph: function(oValue, oGraph, oText) {
				
	
				var fPlannedHR = parseFloat(oValue.FIELD1).toFixed(2);
				var fAvailableHr = parseFloat(oValue.FIELD2).toFixed(2)
				var sColor = that._getType(fPlannedHR, fAvailableHr);

				oGraph.setTargetValue(parseInt(fPlannedHR));
				oGraph.getActual().setValue(parseInt(fAvailableHr));
				// oGraph.setTargetValue(10);
				// oGraph.getActual().setValue(20);
				oGraph.getActual().setColor(sColor);
	
				var fPercent = parseFloat(oValue.FIELD3).toFixed(2);
				oText.setText(fPercent + "%");
			},
			
			_setStatusGraph: function() {
				// var aFilter = [];
				// var oFilter = new sap.ui.model.Filter("Category", FilterOperator.EQ, "STATUS");
				// aFilter.push(oFilter);
	
				var oModel = this.getOwnerComponent().getModel();
				oModel.read("/ZC_GRAPH2_S", {
					// filters: [aFilter],
					success: function(oData) {
						debugger;
						var olclModel = new sap.ui.model.json.JSONModel();
						olclModel.setData({
							data: oData.results
						});
	
						var oVizFrame = that.getView().byId("idChart");
						oVizFrame.setModel(olclModel);
					},
					error: function() {}
				});
			},
	
			_getType: function(sPlanned, sActual) {
				var sReturn = "";
				if (sPlanned <= sActual) {
					sReturn = "Good";
				} else if (sPlanned > sActual) {
					var sDiff = sPlanned - sActual;
					var tenPercent = (10 / 100) * sActual;
					if (sDiff <= tenPercent) {
						sReturn = "Critical";
					} else {
						sReturn = "Error";
					}
				}
	
				return sReturn;
			},

            onGetGraph1Data: function(oEvent){
                debugger;
            var oModel = that.getOwnerComponent().getModel();
			oModel.read("/ZC_GRAPH2_S", {
				success: function(oData) {
					debugger;
					var oToday = oData.results[0];
					// var oMicroToday = that.getView().byId("idMicroToday");
					// var sTodayText = that.getView().byId("idPercentToday");
					
					// that._setGraph(oToday,oMicroToday, sTodayText);
					
					
					// var oTomorrow = oData.results[1];
					// var oMicroTomorrow = that.getView().byId("idMicroTomorrow");
					// var sTomorrowText = that.getView().byId("idPercentTomorrow");
					
					// that._setGraph(oTomorrow,oMicroTomorrow, sTomorrowText);
					
					// var oWeek =  oData.results[2];
					// var oMicroWeek = that.getView().byId("idMicroWeek");
					// var sWeekText = that.getView().byId("idPercentWeek");
					
					// that._setGraph(oWeek, oMicroWeek, sWeekText);
					



				},
				error: function(oError) {

				}
			});
            }
        });
    });
