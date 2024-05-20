sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
function (Controller, JSONModel) {
    "use strict";
    let _this;
    return Controller.extend("project1.controller.app", {
        onInit: function () {
            _this = this;
            this.get();
            this.getView().getModel("resModel").getData();
        },

        get: function () {
            let sUri = this.getOwnerComponent().getManifestObject().resolveUri("Northwind/V4/Northwind/Northwind.svc/Customers");
            const oHeaders = new Headers();
            const oRequest = {
                method: "GET",
                headers: oHeaders,
                redirect: "follow"
            };

            fetch(sUri, oRequest)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result);
                    _this.getView().setModel(new JSONModel(result), "resModel");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });
});