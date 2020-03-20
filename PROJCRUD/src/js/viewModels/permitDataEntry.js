define(['knockout', 'ojs/ojvalidation-base',
 'jquery',  'ojs/ojknockouttemplateutils','ojs/ojinputnumber',
  'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojvalidationgroup', 'ojs/ojinputtext', 'ojs/ojknockout',
   'ojs/ojrowexpander', 'ojs/ojchart', 'ojs/ojselectcombobox', 'ojs/ojformlayout', 'ojs/ojdatetimepicker','ojs/ojtimezonedata'], 
function(ko,  ValidationBase, $,KnockoutTemplateUtils) {
function createWorkUnitModel()
    {
      var self = this;
      self.permitNumber = ko.observable();
      self.issuingOffice = ko.observable();
      self.issueDate = ko.observable(ValidationBase.IntlConverterUtils.dateToLocalIso(new Date(2019, 1, 1)));
      self.projectAddress = ko.observable();
      self.projectCity = ko.observable();
      self.projectZipCode = ko.observable();
      self.permitDescription = ko.observable();
      self.propertyOwner = ko.observable();
      self.units = ko.observable();
      self.squareFoot = ko.observable();
      self.permitValue = ko.observable();
      self.stratum = ko.observable();
      self.receivedDate = ko.observable(ValidationBase.IntlConverterUtils.dateToLocalIso(new Date(2019, 1, 1)));
      self.tract = ko.observable();
      self.block = ko.observable();
      self.lot = ko.observable();
      self.pcisRefNo = ko.observable();
      self.permitType = ko.observable();
      self.permitSubcategory = ko.observable();
      self.permitCategory = ko.observable();
      self.projectNumber = ko.observable();
      self.eventCode = ko.observable();
      self.ownerAddress = ko.observable();
      self.ownerCity = ko.observable();
      self.ownerZipCode = ko.observable();
      self.ownerPhoneNumber = ko.observable();
      self.ownerEmail = ko.observable();
      self.stories = ko.observable();
      self.contractorName = ko.observable();
      self.contractorAddress = ko.observable();
      self.contractorCity = ko.observable();
      self.contractorState = ko.observable();
      self.contractorTelephone = ko.observable();
      self.licenseType = ko.observable();
      self.licenseNumber = ko.observable();
      self.principalName = ko.observable();
      self.licenseExpirationDate = ko.observable(ValidationBase.IntlConverterUtils.dateToLocalIso(new Date(2019, 1, 1)));
      self.useCode = ko.observable();
      self.proposedUseCode = ko.observable();
      self.applicantName = ko.observable();
      self.applicantBusinessName = ko.observable();
      self.applicantRelationship = ko.observable();
      self.applicantAddress = ko.observable();
      self.applicantCity = ko.observable();
      self.applicantTelephone = ko.observable();
      self.primaryZone = ko.observable();
      self.primaryDimensions = ko.observable();
      self.primarySquareFootage = ko.observable();
      self.censusTract = ko.observable();
      self.discard = ko.observableArray();
      self.construction = ko.observableArray();
      }
    return createWorkUnitModel;
});