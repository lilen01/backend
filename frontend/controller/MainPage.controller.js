sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"

], function (Controller, JSONModel) {
    "use strict";

    const url = "http://localhost:3000/user";

    return Controller.extend("vendor.controller.MainPage", {

        onInit: function () {
            var oUserData = new JSONModel();

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    oUserData.setData({
                        user : data
                    });
                    console.log("Data: ", data);

                    this.getView().setModel(oUserData, "userData");
                });
        },

        editUserData : function (oEvent) {
            var oPath = oEvent.getSource().getBindingContext('userData').getPath();
            console.log(oPath);

            if (!this.pDialog) {
                this.loadFragment({
                    name: "vendor.fragment.EditDialog"
                }).then(function(pdialog) {
                    this.pDialog = pdialog;
                    this.pDialog.open();
                    this.pDialog.bindElement({
                        path: oPath,
                        model: 'userData'
                    })
                }.bind(this));
            } else {
                this.pDialog.open();
                this.pDialog.bindElement({
                    path: oPath,
                    model: 'userData'
                })
            }
        },

        onCloseEditDialog : function() {
            this.pDialog.close()
        },

        onSubmitEditUserData : function(oEvent) {
            var oData = oEvent.getSource().getBindingContext('userData').getObject();
            var username = oEvent.getSource().getBindingContext('userData').getObject().userName;
            
            var oURL = url + '/' + username;

            fetch(oURL, {
                method : "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(oData)
            })
                .then(response => response.json())
                .then(() => {
                    console.log("User details updated successfully.");
                })
                .catch(err => console.log("Error while creating account: ", err));
        },

        toLoginPage: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage");
        }
    });
});