define(["require","exports","knockout","../util/AdvancedActivityUtil","../util/AdvancedActivityConstants","ojs/ojarraydataprovider","ojs/ojknockout","ojs/ojbutton","ojs/ojinputtext","ojs/ojselectsingle","ojs/ojdatetimepicker","ojs/ojformlayout","ojs/ojbutton"],(function(require,e,t,a,l,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=function(){var e=this;this.activityName=t.observable(),this.eventType=t.observable("CH"),this.valuationDate=t.observable(),this.landValue=t.observable(0),this.improvementValue=t.observable(0),this.ppValue=t.observable(0),this.fixtureValue=t.observable(0),this.totalRealProperty=t.observable(0),this.fixtureTotal=t.observable(0),this.PAYLOAD_LIST=t.observableArray([]),this.loadCostApproachDetails=function(t){var a=e;if(t&&t.ValueSetList&&t.ValueSetList.length>0){var l=t.ValueSetList[0].ValueSet;if(l&&l.length>0)for(var i in l)switch(l[i].key){case"EventType":a.eventType(l[i].value);break;case"ValuationDate":a.valuationDate(l[i].value);break;case"LandValue":a.landValue(l[i].value);break;case"ImprovementValue":a.improvementValue(l[i].value);break;case"PersonalPropertyValue":a.ppValue(l[i].value);break;case"FixtureValue":a.fixtureValue(l[i].value);break;default:console.log("Key Not Found")}}else a.eventType(""),a.valuationDate(),a.landValue(0),a.improvementValue(0),a.ppValue(0),a.fixtureValue(0)},this.prepareCostApproachPayload=function(){var t=e,i={name:"Cost Approach",ValueSetList:[]},u=[];u.push(a.AdvancedActivityUtil.getKeyValueObj(l.AdvancedActivityConstants.EVENT_TYPE,t.eventType())),u.push(a.AdvancedActivityUtil.getKeyValueObj(l.AdvancedActivityConstants.VAL_DATE,t.valuationDate())),u.push(a.AdvancedActivityUtil.getKeyValueObj(l.AdvancedActivityConstants.LAND_VALUE,t.landValue())),u.push(a.AdvancedActivityUtil.getKeyValueObj(l.AdvancedActivityConstants.IMPROVEMENT_VALUE,t.improvementValue())),u.push(a.AdvancedActivityUtil.getKeyValueObj(l.AdvancedActivityConstants.PERSONALPROPERTY_VALUE,t.ppValue())),u.push(a.AdvancedActivityUtil.getKeyValueObj(l.AdvancedActivityConstants.FIXTURE_VALUE,t.fixtureValue()));var o={name:"Cost Approach",ValueSet:u};return i.ValueSetList.push(o),i},this.browsersDP=new i([{value:"Change of Ownership",label:"Change of Ownership"},{value:"Decline in Value",label:"Decline in Value"},{value:"New Construction",label:"New Construction"},{value:"Other",label:"Other"}],{keyAttributes:"value"}),t.computed((function(){var t=e;t.totalRealProperty(+t.landValue()+ +t.improvementValue()),t.fixtureTotal(+t.ppValue()+ +t.fixtureValue())}))};e.default=new u}));