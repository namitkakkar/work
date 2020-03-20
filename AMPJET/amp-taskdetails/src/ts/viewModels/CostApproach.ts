 import * as ko from "knockout";
 import "ojs/ojknockout";
 import "ojs/ojbutton";
 import "ojs/ojinputtext";
 import "ojs/ojselectsingle";
 import "ojs/ojdatetimepicker";
 import "ojs/ojformlayout";
 import "ojs/ojbutton";
 import {ActivityPayload, ValueSetList, KeyValue} from "../model/ActivityPayload";
 import {AdvancedActivityUtil} from "../util/AdvancedActivityUtil";
 import {AdvancedActivityConstants} from "../util/AdvancedActivityConstants";
 import ArrayDataProvider = require("ojs/ojarraydataprovider");

 class CostApproach {
    activityName: ko.Observable<string> = ko.observable<string>();
    eventType: ko.Observable<string> = ko.observable<string>('CH');
    valuationDate: ko.Observable<Date> = ko.observable<Date>();
    landValue: ko.Observable<number> = ko.observable<number>(0);
    improvementValue: ko.Observable<number> = ko.observable<number>(0);
    ppValue: ko.Observable<number> = ko.observable<number>(0);
    fixtureValue: ko.Observable<number> = ko.observable<number>(0);
    totalRealProperty: ko.Observable<number> = ko.observable<number>(0);
    fixtureTotal: ko.Observable<number> = ko.observable<number>(0);

    PAYLOAD_LIST: ko.ObservableArray<any> = ko.observableArray<any>([]);
    browsersDP: ArrayDataProvider<string, string>;

    constructor() {
        let self = this;

        let browsers = [
            { value: 'Change of Ownership', label: 'Change of Ownership' },
            { value: 'Decline in Value', label: 'Decline in Value' },
            { value: 'New Construction', label: 'New Construction' },
            { value: 'Other', label: 'Other' }
          ];
      
        self.browsersDP = new ArrayDataProvider(browsers, { keyAttributes: 'value' });

        ko.computed(() => {
            let self = this;
            self.totalRealProperty(+self.landValue() + +self.improvementValue());
            self.fixtureTotal(+self.ppValue() + +self.fixtureValue());
        });
    }

    public loadCostApproachDetails = (activityPayload: ActivityPayload) => {
        let self = this;
        if(activityPayload && (activityPayload.ValueSetList && activityPayload.ValueSetList.length >0)) {
            let keyPairList :KeyValue[] = activityPayload.ValueSetList[0].ValueSet;
            if(keyPairList && keyPairList.length >0) {
                for(const val in keyPairList) {
                    switch(keyPairList[val].key) { 
                        case 'EventType': { 
                            self.eventType(keyPairList[val].value); 
                            break; 
                        } 
                        case 'ValuationDate': { 
                            self.valuationDate(keyPairList[val].value);
                            break; 
                        } 
                        case 'LandValue': { 
                            self.landValue(keyPairList[val].value);
                            break; 
                        } 
                        case 'ImprovementValue': { 
                            self.improvementValue(keyPairList[val].value); 
                            break; 
                        } 
                        case 'PersonalPropertyValue': { 
                            self.ppValue(keyPairList[val].value);
                            break; 
                        } 
                        case 'FixtureValue': { 
                            self.fixtureValue(keyPairList[val].value); 
                            break; 
                        } 
                        default: { 
                            console.log("Key Not Found"); 
                        break; 
                        }
                    }
                } 
            }
        } else {
            self.eventType(''); 
            self.valuationDate();
            self.landValue(0); 
            self.improvementValue(0);
            self.ppValue(0);
            self.fixtureValue(0); 
        } 
    }

    public prepareCostApproachPayload = () => {
        let self = this;

        const activityPaylaodData: ActivityPayload = {
            name : "Cost Approach",
            ValueSetList : []
        }
        
        let keyValueList: KeyValue[] = [];
        keyValueList.push(AdvancedActivityUtil.getKeyValueObj(AdvancedActivityConstants.EVENT_TYPE, self.eventType()));
        keyValueList.push(AdvancedActivityUtil.getKeyValueObj(AdvancedActivityConstants.VAL_DATE, self.valuationDate()));
        keyValueList.push(AdvancedActivityUtil.getKeyValueObj(AdvancedActivityConstants.LAND_VALUE, self.landValue()));
        keyValueList.push(AdvancedActivityUtil.getKeyValueObj(AdvancedActivityConstants.IMPROVEMENT_VALUE, self.improvementValue()));
        keyValueList.push(AdvancedActivityUtil.getKeyValueObj(AdvancedActivityConstants.PERSONALPROPERTY_VALUE, self.ppValue()));
        keyValueList.push(AdvancedActivityUtil.getKeyValueObj(AdvancedActivityConstants.FIXTURE_VALUE, self.fixtureValue()));
        
        const valuesetList :ValueSetList = {
            name : "Cost Approach",
            ValueSet : keyValueList
        }

        activityPaylaodData.ValueSetList.push(valuesetList);
        
        return activityPaylaodData;
    }
}

export default new CostApproach();