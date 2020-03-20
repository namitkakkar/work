define(['knockout', 'ojs/ojvalidation-base', 'ojs/ojarraydataprovider',
  'jquery', 'ojs/ojknockouttemplateutils', 'ojs/ojinputnumber',
  'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojvalidationgroup', 'ojs/ojinputtext', 'ojs/ojknockout',
  'ojs/ojrowexpander', 'ojs/ojchart', 'ojs/ojselectcombobox', 'ojs/ojformlayout', 'ojs/ojdatetimepicker', 'ojs/ojtimezonedata', 'ojs/ojfilepicker'],
  function (ko, ValidationBase, ArrayDataProvider, $, KnockoutTemplateUtils) {
    function createWorkUnitModel() {
      var self = this;
      self.eventDate = ko.observable(ValidationBase.IntlConverterUtils.dateToLocalIso(new Date(2019, 1, 1)));
      self.eventName = ko.observable();
      self.category = ko.observable();
      self.subCategory = ko.observable();
      self.workunitType = ko.observable();
      self.assignmentPool = ko.observable();
      self.propertyId = ko.observable();
      self.propertyType = ko.observable();
      self.activityDataProvider = ko.observable();
      self.fileNames = ko.observableArray([]);
      self.comments = ko.observable();
      self.addRowProperty = ko.observableArray([]);
      self.fileBase64 = ko.observableArray([]);
      self.selectListener = function (event) {
        self.files = event.detail.files;
        console.log(self.files);
        for (var i = 0; i < self.files.length; i++) {
          getBase64(self.files[i])
          self.fileNames.push(self.files[i].name);
          //console.log("fileProperties::",fileProperties);
        }
      }

      self.columnArray = [
        {
          "headerText": "Property ID",
          "field": "", "renderer": KnockoutTemplateUtils.getRenderer("propertyId", true)
        },
        {
          "headerText": "Property Type",
          "field": "", "renderer": KnockoutTemplateUtils.getRenderer("propertyType", true)
        },
        {
          "headerText": "Situs Address",
          "field": "Address", "renderer": KnockoutTemplateUtils.getRenderer("situsAddress", true)
        }];
      self.rowDataProvider = new ArrayDataProvider(self.addRowProperty, { keyAttributes: 'Property ID' });
      self.addRow = function () {
        let data = {
          "propertyId": self.propertyId(),
          "propertyType": self.propertyType(),
          "situsAddress": "Address",
        }
        self.addRowProperty.push(data);
      }
      function getBase64(file) {
        var reader = new FileReader();
        let baseValue;
        reader.readAsDataURL(file);
        reader.onload = function () {
          baseValue=reader.result.split(',');
          self.fileBase64.push(baseValue[1]);
          console.log(reader.result);
          return reader.result;
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        return reader.result;
      }
      self.fileData = {
        "fileName": "Capture.png",
        "contentType": "image/png",
      }
      self.create = function () {
        let fileProperties;
          fileProperties = {
            "fileName": self.files[0].name,
            "contentType": self.files[0].type,
            "file": self.fileBase64()[0],
            "category": "Public Service",
            "subCategory": "Miscellaneous",
            "propertyType": "RP",
            "ain": "2004012013"
          }
            $.ajax({
              type: "POST",
              url: "http://iampwcpd201.assessor.lacounty.gov:8888/RIDCRestService-Model-context-root/resources/laca",
              data: JSON.stringify(fileProperties),
              contentType: 'application/json',
              success: function (data) {
                console.log(data);
              }
            });
            function b64toBlob(b64Data, contentType, sliceSize) {
              console.log(b64Data);
              contentType = contentType || '';
              sliceSize = sliceSize || 512;
      
              var byteCharacters = atob(b64Data);
              var byteArrays = [];
      
              for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
      
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                  byteNumbers[i] = slice.charCodeAt(i);
                }
      
                var byteArray = new Uint8Array(byteNumbers);
      
                byteArrays.push(byteArray);
              }
      
              var blob = new Blob(byteArrays, { type: contentType });
              return blob;
            }
      }
    }
    return createWorkUnitModel;
  });