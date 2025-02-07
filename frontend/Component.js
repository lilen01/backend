sap.ui.define([
    "sap/ui/core/UIComponent"

], function(UIComponent) {
    "use strict";

    return UIComponent.extend("vendor.Component", {
        metadata : {
            interfaces : [
                "sap.ui.core.IAsyncContentCreation"
            ],
            manifest : "json"
        },

        init: function() {
            UIComponent.prototype.init.apply(this, arguments);

            // to initialize the router
            this.getRouter().initialize();
        }
    });
});