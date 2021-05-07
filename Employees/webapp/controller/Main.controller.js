sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {

    return Controller.extend("logaligroup.Employees.controller.Main", {

        onInit: function () {

            var oView = this.getView();
            //var i18nBundle = oView.getModel("i18n").getResourceBundle();

            var oJsonModelEmpl = new sap.ui.model.json.JSONModel();
            oJsonModelEmpl.loadData("./localService/mockdata/Employees.json", false);
            oView.setModel(oJsonModelEmpl, "jsonEmployees");

            var oJsonModelCountries = new sap.ui.model.json.JSONModel();
            oJsonModelCountries.loadData("./localService/mockdata/Countries.json", false);
            oView.setModel(oJsonModelCountries, "jsonCountries");

            var oJsonModelLayout = new sap.ui.model.json.JSONModel();
            oJsonModelLayout.loadData("./localService/mockdata/Layout.json", false);
            oView.setModel(oJsonModelLayout, "jsonLayout");            

            var oJsonModelConfig = new sap.ui.model.json.JSONModel({
                visibleID: true,
                visibleName: true,
                visibleCountry: true,
                visibleCity: false,
                visibleBtnShowCity: true,
                visibleBtnHideCity: false
            });
            oView.setModel(oJsonModelConfig, "jsonModelConfig");

            this._bus = sap.ui.getCore().getEventBus();

            this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetails, this);

        },

        showEmployeeDetails: function(category, nameEvent, path) {
            var detailView = this.getView().byId("detailEmployeeView");
            detailView.bindElement("jsonEmployees>" + path);
            this.getView().getModel("jsonLayout").setProperty("/ActiveKey", "TwoColumnsMidExpanded");
        }
    });
});