export namespace TaskPayload{
    export interface ITaskPayload{
        title: string;
        payload: IPayload;
    }
    export interface IPayload{
        GCMWorkTask: IGCMWorkTask;
    } 
    export interface IGCMWorkTask{ 
        WorkUnitType:string;
        SystemEvent:string;
        EventSource:string;
        EventReceivedDate: string;
        WorkUnitInstanceId: string;
        NextSequence: string;
        CurrentSequence: string;
        ReturnToSequence?: any;
        DocumentId?: any;
        Barcode?: any;
        CaseId?: any;
        CaseName?: any;
        Category: string;
        Subcategory: string;
        WorkUnitStatus: string;
        Outcome?: any;
        PropertyIdentificationList: IPropertyIdentificationList;
        CreatorInfo: ICreatorInfo;
        Next: INext;
        Previous: IPrevious;
        Refer: IRefer;
        EventParameterList: IEventParameterList;
        EnrichmentParameterList: IEnrichmentParameterList;
    }
    export interface IPropertyIdentificationList{
        PropertyIdentification: IPropertyIdentification;
    }
    export interface IPropertyIdentification{
        AIN: string;
        AOID: string;
        PropertyType: string;
        PropertyStatus?: any;
        IsPrimary: string;
    }
    export interface ICreatorInfo{
        CreatorId?: any;
        CreationDate: string;
        CreationPool?: any;
    }
    export interface INext{
        Assign: IAssign;
        Perform: IPerform;
        Approve: IApprove;
    }
    export interface IAssign{
        AssigneeRole: string;
        AssigneeRoleId?: any;
        AssigneeUser?: any;
        AssignFlag: string;
        PossiblePool: string;
    }
    export interface IPerform{
        AssigneeRole: string;
        AssigneeRoleId?: any;
        AssigneeUser?: any;
        AssignFlag: string;
        PossiblePool: string;
    }
    export interface IApprove{
        AssigneeRole: string;
        AssigneeRoleId?: any;
        AssigneeUser?: any;
        AssignFlag?: any;
        QCAction: string;
        PossiblePool: string;
    }
    export interface IPrevious{
        Assign: IAssign;
        Perform: IPerform;
        Approve: IApprove;
    }
    export interface IRefer{
        ReturnToTask?: any;
        ReturnToUser?: any;
        ReturnToRole?: any;
        ReturnToMe?: any;
        RouteToFlag?: any;
        ReturnToSequence?: any;
    }
    export interface IEventParameterList{
        EventParameter: Array<IEventParameter>;
    }
  
    export interface IEventParameter{
        Name: string;
        Value?: any;
    }
    export interface IEnrichmentParameterList{
        EventParameter: Array<any>;
    }
}