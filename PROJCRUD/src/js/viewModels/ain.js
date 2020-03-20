define(['knockout', 'ojs/ojarraydataprovider', 'store/index', 'store/actions', 'ojs/ojinputnumber',
  'ojs/ojtable', 'ojs/ojlabel', 'ojs/ojvalidationgroup', 'ojs/ojinputtext', 'ojs/ojknockout', 'ojs/ojselectcombobox', 'ojs/ojformlayout'],
  function (ko, ArrayDataProvider, store, actions) {
    function ainViewModel(params) {
      self = this;
      self.userInfoSignal = params.userInfoSignal;
      self.ain = ko.observable();
      self.ainDataProvider = ko.observable();
      self.availableAins = ko.observable(0);
      self.propertyType = ko.observable("RP");
      self.ainArray = ko.observableArray();
      self.ainDataProvider = new ArrayDataProvider(self.ainArray, { keyAttributes: 'Ain', implicitSort: [{ attribute: 'Ain', direction: 'ascending' }] });
      self.completeLov = store.getState().lovs.Lov;
      console.log(self.completeLov);
      self.propertyData = self.completeLov.propertyTypeLov;

      /* self.propertyType = ko.observableArray([
        {value: 'Real Property', label: 'Real Property'},
        {value: 'Other Property',  label: 'Other Property'},
        {value: 'Old Property',   label: 'Old Property'},
        {value: 'New Property',    label: 'New Property'},
      ]); */
      self.columnArray = [{
        "headerText": "AIN",
        "field": "Ain"
      },
      {
        "headerText": "Assessee Name",
        "field": "AssessorName"
      },
      {
        "headerText": "Region",
        "field": "Region"
      },
      {
        "headerText": "Use Type",
        "field": "UseType"
      },
      {
        "headerText": "Delete",
        "template": "checkTemplate"
      }];

      self.saveAin = function () {
        params.userInfoSignal.dispatch(self.ainArray());
      };
      self.addAin = function () {
        let data = {
          Ain: self.ain(),
          AssessorName: 'Harry Potter',
          Region: 'East Cost',
          UseType: self.propertyType()
        }
        self.ainArray().push(data);
        self.ain('');
        self.propertyType = ko.observable("RP");
        self.availableAins(self.ainArray().length);
        document.getElementById('table').refresh();
      }
      self.removeRow = function (event, context) {
        self.ainArray.splice(context.index, 1);
        self.availableAins(self.ainArray().length);
        document.getElementById('table').refresh();
      }
    }
    self.cancelListener = function (event) {
      var popup = document.getElementById('popup1');
      popup.close();
    }
    return ainViewModel;
  });