sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/UIComponent" // Added import for UIComponent
], function (Controller, MessageBox, UIComponent) { // Added UIComponent to the parameters
    "use strict";

    return Controller.extend("vendor.controller.LoginPage", {
        onInit: function () {
            // Initialization code if needed
        },

        onLoginPress: function () {
            var username = this.byId("usernameInput").getValue();
            var password = this.byId("passwordInput").getValue();

            if (!username || !password) {
                MessageBox.error("Please enter both username and password.");
                return;
            }

            // Here you would typically make an AJAX call to your backend to verify credentials
            // For this example, we'll just show a success message
            MessageBox.success("Login successful! Welcome, " + username + "!");

            // Clear the input fields after successful login
            this.byId("usernameInput").setValue("");
            this.byId("passwordInput").setValue("");
        },

        onCreateAccountPress: function () {
            // Navigate to the Sign Up page
            var oRouter = UIComponent.getRouterFor(this); // Use the imported UIComponent
            oRouter.navTo("signup");
        }
    });
});