import {ActivityPayload} from "../../../model/ActivityPayload";
export namespace WorkUnitPayload {
    export interface IWU_DETAILS {
        "WU_DETAILS" : IWorkUnitDetails;
      }
    export interface IWorkUnitDetails {
        WU_INST_ID: string;
        WU_NUMBER: string;
        WORK_UNIT_TYPE: string;
        STATUS: string;
        ASSIGNMENT_POOL: string;
        BPM_INSTANCE_ID: string;
        CASE_ID: string;
        CASE_NUMBER: string;
        BUSINESS_EVENT_ID: string;
        BUSINESS_EVENT_DATE: string;
        EVENT_NAME: string;
        EVENT_NUMBER: string;
        CATEGORY: string;
        SUBCATEGORY: string;
        CREATED_BY: string;
        CREATED_DATE: string;
        MODIFIED_BY: string;
        MODIFIED_DATE: string;
        WU_AO: IAinDetails[];
    }
    export interface IAinDetails {
        AIN: string;
        ASMT_OBJ_ID: string;
        PROPERTY_TYPE: string;
        WU_INST_ID: string;
        WU_INST_AO_ID: string;
        WU_ACTIVITIES: IWuActivityDetails[];
        WU_DETERMINATIONS: IDeterminationDetails[];
        WU_RTCODES: IWURTCodesDetails[];
        WU_INST_LOG: IWuInstLogDetails[];
    }
    export interface IWuActivityDetails {
        ACTIVITY_INST_ID?: number;
  WU_INST_AO_ID?: string;
  GCM_ACTIVITY_ID?: string,
  STAGE: string;
  ACTIVITY: string;
  GROUP_NAME?: string;
  UI_RESOURCE_ID: string;
  WU_ROUTING_INST_ID?: string;
  OPERATION_FLAG?: string;
  INSERT_LOG_FLAG?: string;
  PRE_CONFIGURED_FLAG?: string;
  PROGRAM_NAME?: string;
  POINTS?: string;
  ACTIVITY_CREATED_BY?: string;
  ACTIVITY_CREATED_DATE?: string;
  AIN?: string;
  ASMT_OBJ_ID?: string;
  PROPERTY_TYPE?: string;
  WU_INST_ID?: string;

  ROW_ID ?: Number;
  ACTIVITY_PAYLOAD ?: any;
  ACTIVITY_STR_PAYLOAD ? :ActivityPayload;
  ACTIVITY_PAYLOAD_STR ? : any;

    }
    export interface IDeterminationDetails {
        DETR_INST_ID: string;
        WU_INST_AO_ID: string;
        WU_ROUTING_INST_ID: string;
        STAGE: string;
        NAME: string;
        DISPLAY_TYPE: string;
        DETR_CREATED_BY: string;
        DETR_CREATED_DATE: string;
        DETR_FLAG: string;
        OPERATION_FLAG: string;
        INSERT_LOG_FLAG: string;
    }
    export interface IWURTCodesDetails {
        RTC_INST_ID: string;
        WU_INST_AO_ID: string;
        WU_ROUTING_INST_ID: string;
        STAGE: string;
        NAME: string;
        REFERENCE_NUMBER: string;
        REFERENCE_TYPE: string;
        REFERENCE_DESC: string;
        URL: string;
        INSERT_LOG_FLAG: string;
        PRE_CONFIGURED_FLAG: string;
        RTCODE_CREATED_BY: string;
        RTCODE_CREATED_DATE: string;
        OPERATION_FLAG: string;
        RTC_FLAG: string;
    }
    export interface IWURoutingDetails {
        ROUTING_ID: string;
        WU_INST_ID: string;
        CREATED_BY: string;
        CREATED_DATE: string;
        POOL_NAME: string;
        ASSIGN_POOL_NAME: string;
        PERFORM_POOL_NAME: string;
        QC_POOL_NAME: string;
        ASSIGN_FLAG: string;
        QC_ACTION: string;
        SEQ_NUMBER: string;
        GCM_ASGN_POOL_CONFIG_ID: string;
    }
    export interface IWuInstLogDetails {
        WU_INST_LOG_ID: string;
        CREATED_BY: string;
        CREATED_DATE: string;
        STATUS: string;
        CURRENT_USER_ID: string;
        GCM_WU_INST_ID: string;
    }
}