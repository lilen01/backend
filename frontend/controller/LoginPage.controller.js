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
            var url = "http://localhost:3000/user/" + username;

            console.log("URL: ", url);
            
            if (!username || !password) {
                MessageBox.error("Please enter both username and password.");
                return;
            } else {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log("User Data: ", data);
                        if (data.userName == username && data.password == password) {
                            MessageBox.success("Login successful! Welcome, " + username + "!");
                        } else {
                            MessageBox.error("Unauthorized attempt.");
                        }
                    });
            }

            // Clear the input fields after successful login
            this.byId("usernameInput").setValue("");
            this.byId("passwordInput").setValue("");
        },

        onCreateAccountPress: function () {
            // Navigate to the Sign Up page
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("SignUp");
        },

        toPage1() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Page1");
        },

        toPage2() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("Page2");
        },

        toSignUp() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("SignUp");
        }
    });
});