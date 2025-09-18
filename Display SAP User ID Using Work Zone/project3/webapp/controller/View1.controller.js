sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("project3.controller.View1", {
        onInit: function () {
            var useremail;
            var username
            if (sap.ushell && sap.ushell.Container) {
                var oUserInfo = sap.ushell.Container.getService("UserInfo");
                var sUserName = oUserInfo.getUser().getFullName();
                console.log("sUserName",sUserName);
                var sUser = oUserInfo.getUser().getEmail();
                if (sUser) {
                    useremail = sUser;
                    username = sUserName
                } else {
                    useremail = "abc@yash.com";
                    username = sUserName
                }
            } else {
                useremail = "abc@yash.com";
                username = sUserName
            }
            this.getView().byId("userNameText").setText(`Welcome ${username}`);
            this.getView().byId("userEmailText").setText(`Mail ID: ${useremail}`);
            console.log("User email:", useremail);

            // this.getView().byId("emailText").setText(useremail);
            // var oModel = this.getView().getModel("uiModel");
            // oModel.setProperty("/testedBy", username);
            // oModel.setProperty("/UserMail", useremail);
 

            // Load Pega Embed script dynamically
            const script = document.createElement("script");
            script.src = "https://leaseplan01.pegalabs.io/prweb/PRRestService/c11nsvc/v1/pega-embed.js";

            script.onload = () => {
                const embed = document.createElement("pega-embed");
                embed.id = "theEmbed";
                embed.setAttribute("action", "createCase");
                embed.setAttribute("caseTypeID", "Aaseya-OrderMan-Work-PurchaseOrder");
                embed.setAttribute("casePage", "assignment");
                embed.setAttribute("appAlias", "order-management-1");
                embed.setAttribute("pegaServerUrl", "https://leaseplan01.pegalabs.io/prweb/");
                embed.setAttribute("grantType", "customBearer");
                embed.setAttribute("clientId", "43074556503670088552");
                embed.setAttribute("style", "width:100%");
                embed.setAttribute("startingFields", JSON.stringify({

                    PurchaseOrderNumber:useremail
                

                }));
                embed.setAttribute("additionalHeaders", JSON.stringify({
                    "X-External-User-ID": username,
                    "X-External-User-Mail": useremail}));
                    
                
                    
                // Append embed to container with ID 'pegaContainer' if available
                const container = this.byId("pegaContainer");
                if (container && container.getDomRef()) {
                    container.getDomRef().appendChild(embed);
                } else {
                    console.warn("Pega container not found or not rendered yet.");
                }
            };

            script.onerror = () => {
                console.error("Failed to load Pega Embed script.");
            };

            document.head.appendChild(script);
        }
    });
});
