define(["require","exports","knockout","ojs/ojarraydataprovider","../ampCommon/tasklist/Task","ojs/ojtable","ojs/ojmodel","ojs/ojlabel","ojs/ojbutton","ojs/ojinputtext","ojs/ojdatetimepicker","ojs/ojinputnumber","ojs/ojcore","ojs/ojinputtext","ojs/ojdialog","ojs/ojinputtext","ojs/ojinputtext"],(function(require,e,r,s,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function e(){var e=this;this.remarksObservableArray=r.observableArray([]),this.remarksDataObservable=r.observable(),this.workUnitNumber=r.observable("76272872"),this.noteslength=r.observable(),this.CREATED_BY=r.observable("C13993"),this.CREATED_DATE=r.observable("2020-01-22T00:00:00Z"),this.remarksId=r.observable(""),this.REMARKS=r.observable(),this.CREATED_USER=r.observable("C139993"),this.REMARKS_SUBJECT=r.observable("Add Remarks Testing"),this.moduleName=r.observable("GCM_WU_INST"),this.visibleRemarksFlag=r.observable(!1),this.remarksInputObservableArray=r.observableArray([]),this.openListener=function(){var r=e;r.visibleRemarksFlag(!0),console.log("visible::",r.visibleRemarksFlag())},this.saveRemarksListener=function(){var r=e,a={WU_NOTES:[{CREATED_BY:e.CREATED_BY(),CREATED_DATE:e.CREATED_DATE(),REMARKS_PARENT_ID:e.remarksId(),MODULE_NAME:e.moduleName(),REMARKS_SUBJECT:e.REMARKS_SUBJECT(),REMARKS:e.remarksTxtVal()}]};r.visibleRemarksFlag(!1),console.log(a),e.remarksInputObservableArray().push(a.WU_NOTES[0]),r.task().addRemark(a,(function(e){e.WU_NOTES;r.remarksObservableArray(e.WU_NOTES),r.remarksDataObservable(new s(r.remarksObservableArray(),{keyAttributes:"REMARKS_ID"})),r.remarksTxtVal(""),r.noteslength(r.remarksObservableArray().length)}),(function(e){return console.log(e)}))};var t=this;t.task=r.observable(a.Task.getInstance()),this.remarksTxtVal=r.observable(""),r.computed((function(){void 0!==t.task().workUnitDetailsList()&&t.task().workUnitDetailsList().length>0&&(t.remarksId(t.task().workUnitDetailsList()[0].WU_INST_ID),t.task().getRemarksByRemarkId(t.remarksId(),(function(e){console.log(e),console.log(e.WU_NOTES);var r=e.WU_NOTES;t.remarksObservableArray(r),console.log(t.remarksObservableArray()),t.remarksDataObservable(new s(t.remarksObservableArray(),{keyAttributes:"REMARKS_ID"})),t.remarksObservableArray(r),console.log(t.remarksObservableArray()),t.noteslength(t.remarksObservableArray().length)}),(function(e){return console.log(e)})))}))}return e.prototype.connected=function(){},e}();e.default=t}));