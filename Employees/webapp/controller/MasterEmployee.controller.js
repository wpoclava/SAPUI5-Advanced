sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.Filter} Filter
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        function onInit() {

            this._bus = sap.ui.getCore().getEventBus();

        };

        function onFilter() {

            var oJSONCountries = this.getView().getModel("jsonCountries").getData();

            var filters = [];

            if (oJSONCountries.EmployeeId !== "") {
                filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJSONCountries.EmployeeId));
            }

            if (oJSONCountries.CountryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oJSONCountries.CountryKey));
            }

            var oList = this.getView().byId("tableEmployee");
            var oBinding = oList.getBinding("items");
            oBinding.filter(filters);

        };

        function onClearFilter() {

            var oModel = this.getView().getModel("jsonCountries");
            oModel.setProperty("/EmployeeId", "");
            oModel.setProperty("/CountryKey", "");

        };

        function showPostalCode(oEvent) {

            var itemPress = oEvent.getSource();
            var oContext = itemPress.getBindingContext("jsonEmployees");
            var objectContext = oContext.getObject();

            sap.m.MessageToast.show(objectContext.PostalCode);

        };

        function onShowCity() {

            var oJsonModelConfig = this.getView().getModel("jsonModelConfig");
            oJsonModelConfig.setProperty("/visibleCity", true);
            oJsonModelConfig.setProperty("/visibleBtnShowCity", false);
            oJsonModelConfig.setProperty("/visibleBtnHideCity", true);

        };

        function onHideCity() {

            var oJsonModelConfig = this.getView().getModel("jsonModelConfig");
            oJsonModelConfig.setProperty("/visibleCity", false);
            oJsonModelConfig.setProperty("/visibleBtnShowCity", true);
            oJsonModelConfig.setProperty("/visibleBtnHideCity", false);
        };

        function showOrders(oEvent) {

            //get selected controller
            var iconPressed = oEvent.getSource();

            //Context from the model
            var oContext = iconPressed.getBindingContext("jsonEmployees");

            if (!this._oDialogOrders) {
                this._oDialogOrders = sap.ui.xmlfragment("logaligroup.Employees.fragment.DialogOrders", this);
                this.getView().addDependent(this._oDialogOrders);
            }

            //Dialog binding to the Context to have access th the data of selected item
            this._oDialogOrders.bindElement("jsonEmployees>" + oContext.getPath());

            this._oDialogOrders.open();

        };

        function onCloseOrders() {
            this._oDialogOrders.close();
        };

        function showEmployee(oEvent) {

            var path = oEvent.getSource().getBindingContext("jsonEmployees").getPath();
            this._bus.publish("flexible", "showEmployee", path);

        }

        var Main = Controller.extend("logaligroup.Employees.controller.MasterEmployee", {});

        Main.prototype.onValidate = function () {
            var inputEmployee = this.byId("inputEmployee");
            var valueEmployee = inputEmployee.getValue();

            if (valueEmployee.length === 6) {
                //inputEmployee.setDescription("OK");
                this.getView().byId("labelCountry").setVisible(true);
                this.getView().byId("slCountry").setVisible(true);
            } else {
                //inputEmployee.setDescription("Not OK");
                this.getView().byId("labelCountry").setVisible(false);
                this.getView().byId("slCountry").setVisible(false);
            }
        };

        Main.prototype.onInit = onInit;

        Main.prototype.onFilter = onFilter;

        Main.prototype.onClearFilter = onClearFilter;

        Main.prototype.showPostalCode = showPostalCode;

        Main.prototype.onShowCity = onShowCity;

        Main.prototype.onHideCity = onHideCity;

        Main.prototype.showOrders = showOrders;

        Main.prototype.onCloseOrders = onCloseOrders;

        Main.prototype.showEmployee = showEmployee;

        return Main;
    });
