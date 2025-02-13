sap.ui.define([
    "sap/ui/core/mvc/Controller"

], function(Controller) {
    "use strict";

    return Controller.extend("vendor.controller.MainPage", {

        onClick : function() {
            sap.m.MessageToast.show("Clicked");
        },

        toLoginPage : function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage");
        }
    });
});