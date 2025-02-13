
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/core/UIComponent"
], function (Controller, MessageBox, UIComponent) {
    "use strict";
    
    
    return Controller.extend("vendor.controller.SignUp", {
        onInit: function () {
            // Initialization code if needed
        },

        onSignUpPress: function () {
            var username = this.byId("idUsernameInput").getValue();
            var email = this.byId("emailInput").getValue();
            var password = this.byId("idPasswordInput").getValue();
            var confirmPassword = this.byId("confirmPasswordInput").getValue();
            var url = "http://localhost:3000/user";

            if (!username || !email || !password || !confirmPassword) {
                MessageBox.error("Please fill in all fields.");
                return;
            }

            if (password !== confirmPassword) {
                MessageBox.error("Passwords do not match.");
                return;
            }

            const oUserData = {
                userName : username,
                password : password,
                email : email
            };

            fetch(url, {
                method : "POST",
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(oUserData)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("User details submitted successfully.");
                })
                .catch(err => console.log("Error while creating account: ", err));

            // Here you would typically make an AJAX call to your backend to create the account
            // For this example, we'll just show a success message
            MessageBox.success("Account created successfully! Welcome, " + username + "!");

            // Clear the input fields after successful sign up
            this.byId("idUsernameInput").setValue("");
            this.byId("emailInput").setValue("");
            this.byId("idPasswordInput").setValue("");
            this.byId("confirmPasswordInput").setValue("");
        },

        onLoginPress: function () {
            // Navigate back to the Login page
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("login");
        },
        
        toLoginPage: function () {
            // Navigate back to the Login page
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("LoginPage");
        }
    });
});