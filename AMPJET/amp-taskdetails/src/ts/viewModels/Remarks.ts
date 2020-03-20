import * as ko from "knockout";
import "ojs/ojtable";
import { oj } from "@oracle/oraclejet/dist/types";
import "ojs/ojmodel";
import "ojs/ojlabel";
import "ojs/ojbutton";
import "ojs/ojinputtext";
import "ojs/ojdatetimepicker";
import "ojs/ojinputnumber"
import "ojs/ojcore"
import "ojs/ojinputtext";
// import { IRemarks } from "../models/interfaces/IRemarks";
import ArrayDataProvider = require("ojs/ojarraydataprovider");
import 'ojs/ojdialog';
import "ojs/ojinputtext";
import "ojs/ojinputtext";
import { Task } from "../ampCommon/tasklist/Task";
import { ojButtonEventMap } from 'ojs/ojbutton';
declare var require: any;

class RemarksViewModel {
    public remarksObservableArray: ko.ObservableArray<IRemarks> = ko.observableArray([]);
    remarksDataObservable: ko.Observable = ko.observable();
    workUnitNumber: ko.Observable<string> = ko.observable("76272872");
    noteslength: ko.Observable<number> = ko.observable();
    remarksTxtVal: ko.Observable<string>;
    formattedText: ko.Computed<string>;
    task: ko.Observable<Task>;
    public CREATED_BY: ko.Observable<string> = ko.observable("C13993");
    public CREATED_DATE: ko.Observable<string> = ko.observable("2020-01-22T00:00:00Z");
    public remarksId: ko.Observable<string> = ko.observable("");
    public REMARKS: ko.Observable<string> = ko.observable();
    public CREATED_USER: ko.Observable<string> = ko.observable("C139993");
    public REMARKS_SUBJECT: ko.Observable<string> = ko.observable("Add Remarks Testing");
    public moduleName: ko.Observable<string> = ko.observable("GCM_WU_INST");
    visibleRemarksFlag: ko.Observable<boolean> = ko.observable(false);

    public remarksInputObservableArray: ko.ObservableArray<WU_NOTES> = ko.observableArray<WU_NOTES>([]);
    constructor() {
        var self = this;
        self.task = ko.observable(Task.getInstance());
        this.remarksTxtVal = ko.observable("");
        ko.computed(() => {
            if (self.task().workUnitDetailsList() !== undefined && self.task().workUnitDetailsList().length > 0) {
                self.remarksId(self.task().workUnitDetailsList()[0].WU_INST_ID);
                self.task().getRemarksByRemarkId(self.remarksId(),
                    (res) => {
                        console.log(res);
                        console.log(res.WU_NOTES);
                        const resResult: IRemarks[] = <IRemarks[]>res.WU_NOTES;
                        self.remarksObservableArray(resResult);
                        console.log(self.remarksObservableArray());
                        self.remarksDataObservable(new ArrayDataProvider(self.remarksObservableArray(), { keyAttributes: 'REMARKS_ID' }));
                        self.remarksObservableArray(resResult);
                        console.log(self.remarksObservableArray());
                        self.noteslength(self.remarksObservableArray().length);
                    },
                    (error) => console.log(error));
            }
        });
    }
    public openListener = () => {
        let self = this;
        self.visibleRemarksFlag(true);
        console.log("visible::", self.visibleRemarksFlag());
    };

    public saveRemarksListener = () => {
        let self = this;
        var remarksInputObj = {
            WU_NOTES: [{
                CREATED_BY: this.CREATED_BY(),
                CREATED_DATE: this.CREATED_DATE(),
                REMARKS_PARENT_ID: this.remarksId(),
                MODULE_NAME: this.moduleName(),
                REMARKS_SUBJECT: this.REMARKS_SUBJECT(),
                REMARKS: this.remarksTxtVal()
            }]

        };
        self.visibleRemarksFlag(false);
        console.log(remarksInputObj);
        this.remarksInputObservableArray().push(remarksInputObj.WU_NOTES[0]);
        self.task().addRemark(remarksInputObj,
            (response) => {
                const resResult: IRemarks[] = <IRemarks[]>response.WU_NOTES;
                self.remarksObservableArray(response.WU_NOTES);
                self.remarksDataObservable(new ArrayDataProvider(self.remarksObservableArray(), { keyAttributes: 'REMARKS_ID' }));
                self.remarksTxtVal('');
                self.noteslength(self.remarksObservableArray().length);
            },
            (error) => console.log(error));
    }

    connected(): void {
        // implement if needed
    }

}

export default RemarksViewModel;

export interface IWU_NOTES {
    WU_NOTES: IRemarks[];
}
export interface IRemarks {
    CREATED_BY: string,
    CREATED_DATE: string,
    REMARKS_ID: string,
    REMARKS: string,
    CREATED_USER: string,
    REMARKS_SUBJECT: string
}

export interface WU_NOTES {
    CREATED_BY: string,
    CREATED_DATE: string,
    REMARKS_PARENT_ID: string,
    MODULE_NAME: string,
    REMARKS_SUBJECT: string,
    REMARKS: string

}

