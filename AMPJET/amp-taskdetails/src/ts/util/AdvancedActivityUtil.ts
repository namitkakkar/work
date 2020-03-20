import {KeyValue} from "../model/ActivityPayload";

export class AdvancedActivityUtil {
    public static getKeyValueObj(key: string, value: any): KeyValue {
        const data: KeyValue = {
            key : key,
            value : value
        }; 
        return data;
    }

}