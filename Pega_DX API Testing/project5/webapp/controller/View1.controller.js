sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, JSONModel) {
    "use strict";
       var sBearerToken = "eyJraWQiOiIwNjgxQjUyQUQ3ODY1ODRDRTU0MDVCQzkxM0FERkU2QiIsInR5cCI6IkpXVCIsImFsZyI6IlJTMjU2In0.eyJhdWQiOiJ1cm46NzkzMTM2OTkxMjY1NzE4NjM4NzEiLCJzdWIiOiJXZWJEZW1vVXNlciIsImFwcF9uYW1lIjoiT3JkZXJNYW4iLCJuYmYiOjE3NTY3ODU4MDMsImFwcF92ZXJzaW9uIjoiMDEuMDEuMDEiLCJpc3MiOiJ1cm46bGVhc2VwbGFuMDEucGVnYWxhYnMuaW8iLCJleHAiOjE3NTY4MjE4MDMsImlhdCI6MTc1Njc4NTgwMywianRpIjoiQ0ExRTkyNzAzNTM0MDk4MzRFOTA3RjkxQzlEQzRGMDMiLCJvcGVyYXRvcl9hY2Nlc3MiOiJPcmRlck1hbjpBdXRob3JzIn0.BUMlSDB0Q2CJnycIy16tD4TshcIuv4cSEZGY3s6QIxeXMI-5spnL0y1_ZLJ6ZDkWOixSQNoTubwLviw7KrdOZZD4YNqtqF6lQiKkZXABewI28YC6R9cndU59bRaY4Kce8Dt7ng0RQ922qJoTHIq0DHe0qWM0Hk5t7-JLORKqYAv797DPKQTH1HEz1KAVCb36fLiqqbUE9GZPQjp9obDUkjiBrKwvVsKB9C7fRF0YCunWb8hcvpmmPaQUedQ228IQX7iKNHSTZSDbzruTmlpe6yunE7D003NwRnLuoAJaoVaVP9IuHSaEI3KOjYHa9DO5k8RKw8tPRI8056TTHYaQ84JhNKOD2kBDJ0S7xwCSJkhUIUGnv-NDzsONzmX1fNcVlCFGGS3pvcdEaHcA8pGev3NRdE7DbLm1dGI6ShQ1mruU_bOG92IxmbBg4rzzXK6F7QFt-DFy7jWfkXMjItmIMCrUfZW5VquHm5jkmTBf-86_XW2zNlFb_-IXyKak7fNf8GlWcu9HKQC4DJWu_fioOxs8zTLLFEtGAQBhw337XJ7RMohGukRM8AiiBotol4kEfrS1UwgtQsuXjfGqbxWIs3kMd1qC1dKti1_WdU9hishhM41gol_kJpG67VaWYXgjLfUmU-W5jU0aHaVFXkUaif2se6qSpXQE2vhZWPmuQ10"; // Replace with actual token securely
    
       return Controller.extend("project5.controller.View1", {

        onInit: function () {
            var oData = {
                incidentType1: "",
                incidentType2: "",
                incidentType3: "",
                incidentType4: "",
                incidentType5: "",
                incidentType6: "",
                incidentType7: "",
                incidentType8: "",
                incidentType9: "",
                incidentType10: "",
                incidentType11: "",
                incidentType12: "",
                assignmentId: "",
                CaseId: ""
            };
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);
        },

        onSubmitIncident: function () {
            var oView = this.getView();
            var oModel = oView.getModel();

            var oIncidentData = {
                OrderDate: oModel.getProperty("/incidentType2"),
                DeliveryAddress: oModel.getProperty("/incidentType3"),
                PurchaseOrderNumber: oModel.getProperty("/incidentType9"),
                PaymentTerms: oModel.getProperty("/incidentType8"),
                ApprovalStatus: oModel.getProperty("/incidentType1"),
                pyStatusWork: oModel.getProperty("/incidentType12"),
                Description: oModel.getProperty("/incidentType4"),
                TotalAmount: oModel.getProperty("/incidentType7"),
                pyLabel: oModel.getProperty("/incidentType6"),
                pyDuplicateID: oModel.getProperty("/incidentType5"),
                pyText: oModel.getProperty("/incidentType11"),
                QuantityOrdered: oModel.getProperty("/incidentType10")
            };

            var oPayload = {
                    caseTypeID: "Aaseya-OrderMan-Work-PurchaseOrder",
                    content: {
                        
                        PurchaseOrderNumber: oIncidentData.PurchaseOrderNumber,
                        QuantityOrdered:oIncidentData.QuantityOrdered,
                        PaymentTerms:oIncidentData.PaymentTerms,
                        DeliveryAddress:oIncidentData.DeliveryAddress,
                        OrderDate:oIncidentData.OrderDate,
                        
                        
                    }
                };


            var sUrl = "https://leaseplan01.pegalabs.io/prweb/api/application/v2/cases?viewType=&pageName=";

            $.ajax({
                url: sUrl,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                headers: {
                    "Authorization": "Bearer " + sBearerToken
                },
                success: function (response) {
                    MessageToast.show("Incident submitted successfully!");

                    var assignmentId = response?.data?.caseInfo?.assignments?.[0]?.ID || "";
                    var caseId = response?.ID || "";

                    oModel.setProperty("/assignmentId", assignmentId);
                    oModel.setProperty("/CaseId", caseId);

                    if (caseId) {
                        MessageToast.show("Case ID: " + caseId);
                    }
                },
                error: function (oError) {
                    MessageToast.show("Error: " + oError.statusText);
                }
            });
        },

        onGetAssignmentDetails: function () {
            var that = this;
            var assignmentId = this.getView().getModel().getProperty("/assignmentId");
            var sUrl = "https://leaseplan01.pegalabs.io/prweb/api/application/v2/assignments/" + encodeURIComponent(assignmentId) + "?viewType=&pageName=";

            $.ajax({
                url: sUrl,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + sBearerToken
                },
                success: function (response) {

                    

                    var caseInfo = response.data.caseInfo;
                    var oModel = new JSONModel({
                        caseTypeID: caseInfo.caseTypeID,
                        owner: caseInfo.owner,
                        assignmentId : response?.data?.caseInfo?.assignments?.[0]?.ID || "",
                        caseId : caseInfo.ID


                    });
                    that.getView().setModel(oModel, "assignmentModel");
                },
                error: function (error) {
                    console.error("Error fetching assignment details: ", error);
                }
            });
        },

        onGNEXT: function () {
            var that = this;
            var assignmentId = this.getView().getModel().getProperty("/assignmentId");
            var sUrl = "https://leaseplan01.pegalabs.io/prweb/api/application/v2/assignments/next?viewType=page&pageName=";

            $.ajax({
                url: sUrl,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + sBearerToken
                },
                success: function (response) {

                    

                    var caseInfo = response.data.caseInfo;
                    var oModel = new JSONModel({
                        caseTypeID: caseInfo.caseTypeID,
                        owner: caseInfo.owner,
                        assignmentId : response?.data?.caseInfo?.assignments?.[0]?.ID || "",
                        caseId : caseInfo.ID


                    });
                    that.getView().setModel(oModel, "assignmentModel");
                },
                error: function (error) {
                    console.error("Error fetching assignment details: ", error);
                }
            });
        },

        onDtaObject: function () {
            var that = this;
            var sUrl = "https://leaseplan01.pegalabs.io/prweb/api/application/v2/data_objects?type=";

            $.ajax({
                url: sUrl,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + sBearerToken
                },
                success: function (response) {

                    

                    var caseInfo = response.data.caseInfo;
                    var oModel = new JSONModel({
                        caseTypeID: caseInfo.caseTypeID,
                        owner: caseInfo.owner,
                        assignmentId : response?.data?.caseInfo?.assignments?.[0]?.ID || "",
                        caseId : caseInfo.ID


                    });
                    that.getView().setModel(oModel, "assignmentModel");
                },
                error: function (error) {
                    console.error("Error fetching assignment details: ", error);
                }
            });
        },

        onDeleteCase: function () {
            var sCaseID = this.getView().getModel().getProperty("/deleteCaseId");

            if (!sCaseID) {
                MessageToast.show("Please enter a Case ID to delete.");
                return;
            }

            var sUrl = "https://leaseplan01.pegalabs.io/prweb/api/application/v2/cases/" + encodeURIComponent(sCaseID);

            $.ajax({
                url: sUrl,
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + sBearerToken,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                success: function (oResponse) {
                    MessageToast.show("Case deleted successfully!");
                    console.log("Delete response:", oResponse);
                },
                error: function (oError) {
                    MessageToast.show("Delete Sucess");
                    console.error("Delete error:", oError);
                }
            });
        },

       onUpdateCase1: function () {
    var that = this;
    var assignmentId = this.getView().getModel().getProperty("/assignmentId");
    console.log("assignmnent id:",assignmentId);
    var actionId = "Create";
    var sUrl = "https://leaseplan01.pegalabs.io/prweb/api/application/v2/assignments/" 
        + encodeURIComponent(assignmentId) 
        + "/actions/" 
        + encodeURIComponent(actionId) 
        + "?viewType=form&excludeAdditionalActions=true";

    $.ajax({
        url: sUrl,
        method: "GET",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + sBearerToken,
            "x-origin-channel": "Web",
            "Accept": "application/json"
        },
        success: function (response, textStatus, jqXHR) {
            var etag = jqXHR.getResponseHeader("etag"); // Fetch the ETag header here
            if (etag) {
                MessageToast.show("ETag fetched successfully: " + etag);
                // Optionally update the model with the ETag or use as needed
                that.getView().getModel().setProperty("/UETAG", etag);
            } else {
                MessageToast.show("ETag not found in response headers.");
            }
            // If caseInfo processing is also needed:
            var caseInfo = response.data.caseInfo;
            var oModel = new JSONModel({
                caseTypeID: caseInfo.caseTypeID,
                owner: caseInfo.owner,
                assignmentId: caseInfo.assignments && caseInfo.assignments[0] ? caseInfo.assignments[0].ID : "",
                caseId: caseInfo.ID
            });
            that.getView().setModel(oModel, "assignmentModel");
        },
        error: function (oError) {
            MessageToast.show("ETag fetch failed: " + oError.statusText);
        }
    });
}
,


        onUpdateCase: function () {
            var PON = this.getView().getModel().getProperty("/UPON");
            var sCaseID = this.getView().getModel().getProperty("/UCaseId");
            var sActionID = "pyUpdateCaseDetails";

            var ETAG = this.getView().getModel().getProperty("/UETAG");

            var sUrl = "https://leaseplan01.pegalabs.io/prweb/api/application/v2/cases/" +
                encodeURIComponent(sCaseID) +
                "/actions/" +
                encodeURIComponent(sActionID) +
                "?viewType=form";

            var oPayload = {
                content: {
                    PurchaseOrderNumber: PON
                }
            };

            $.ajax({
                url: sUrl,
                method: "PATCH",
                contentType: "application/json",
                data: JSON.stringify(oPayload),
                headers: {
                    "Authorization": "Bearer " + sBearerToken,
                    "If-Match": ETAG,
                    "x-origin-channel": "Web",
                    "Accept": "application/json",
                    
                },

                success: function (oResponse) {
                    MessageToast.show("Case updated successfully!");
                    console.log("Update response:", oResponse);
                },
                error: function (oError) {
                    MessageToast.show("Update failed: " + oError.statusText);
                }
            });
        },



    });
});
