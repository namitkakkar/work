export interface ActivityPayload {
    name ?: string,
    ValueSetList : ValueSetList[]
}

export interface ValueSetList {
    name ?: string,
    ValueSet : KeyValue[]
}

export interface KeyValue {
    key: string,
    value: any
}