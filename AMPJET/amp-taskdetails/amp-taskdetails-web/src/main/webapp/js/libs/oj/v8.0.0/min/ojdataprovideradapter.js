/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 * @ignore
 */
define(["ojs/ojcore","jquery","ojs/ojdataprovideradapter-base"],function(e,t,a){"use strict";class n extends a{constructor(e){super(e),this.tableDataSource=e,this.FetchByKeysResults=class{constructor(e,t,a){this._parent=e,this.fetchParameters=t,this.results=a,this[n._FETCHPARAMETERS]=t,this[n._RESULTS]=a}},this.ContainsKeysResults=class{constructor(e,t,a){this._parent=e,this.containsParameters=t,this.results=a,this[n._CONTAINSPARAMETERS]=t,this[n._RESULTS]=a}},this.Item=class{constructor(e,t,a){this._parent=e,this.metadata=t,this.data=a,this[n._METADATA]=t,this[n._DATA]=a}},this.FetchByOffsetResults=class{constructor(e,t,a,r){this._parent=e,this.fetchParameters=t,this.results=a,this.done=r,this[n._FETCHPARAMETERS]=t,this[n._RESULTS]=a,this[n._DONE]=r}},this.FetchListParameters=class{constructor(e,t,a){this._parent=e,this.size=t,this.sortCriteria=a,this[n._SIZE]=t,this[n._SORTCRITERIA]=a}},this._addTableDataSourceEventListeners(),this[n._OFFSET]=0,this._ignoreDataSourceEvents=new Array}destroy(){this._removeTableDataSourceEventListeners()}containsKeys(e){let t=this,a=[];return e[n._KEYS].forEach(function(e){a.push(t.tableDataSource.get(e))}),Promise.all(a).then(function(a){let r=new Set;return a.map(function(e){null!=e&&r.add(e[n._KEY])}),Promise.resolve(new t.ContainsKeysResults(t,e,r))})}fetchByKeys(e){let t=this,a=[];return e[n._KEYS].forEach(function(e){a.push(t.tableDataSource.get(e))}),Promise.all(a).then(function(a){let r=new Map;return a.map(function(e){if(null!=e){let a=e[n._KEY],s=e[n._DATA];r.set(a,new t.Item(t,new t.ItemMetadata(t,a),s))}}),Promise.resolve(new t.FetchByKeysResults(t,e,r))})}fetchByOffset(e){let t=this,a=null!=e?e[n._SIZE]:-1,r=null!=e?e[n._SORTCRITERIA]:null,s=null!=e&&e[n._OFFSET]>0?e[n._OFFSET]:0,i=new this.FetchListParameters(this,a,r);return this._startIndex=0,this._getFetchFunc(i,s)(i,!0).then(function(a){let r=a[n._VALUE],s=a[n._DONE],i=r[n._DATA],l=r[n._METADATA].map(function(e){return e[n._KEY]}),o=new Array;return i.map(function(e,a){o.push(new t.Item(t,new t.ItemMetadata(t,l[a]),i[a]))}),new t.FetchByOffsetResults(t,e,o,s)})}fetchFirst(e){return this._isPagingModelTableDataSource()||(this._startIndex=0),new this.AsyncIterable(new this.AsyncIterator(this._getFetchFunc(e),e))}getCapability(e){return e==n._SORT&&"full"==this.tableDataSource.getCapability(e)?{attributes:"multiple"}:"fetchByKeys"==e?{implementation:"lookup"}:"fetchByOffset"==e?{implementation:"lookup"}:null}getTotalSize(){return Promise.resolve(this.tableDataSource.totalSize())}isEmpty(){return this.tableDataSource.totalSize()>0?"no":"yes"}getPage(){return this._isPagingModelTableDataSource()?this.tableDataSource.getPage():-1}setPage(e,t){return this._isPagingModelTableDataSource()?this.tableDataSource.setPage(e,t):Promise.reject(null)}getStartItemIndex(){return this._isPagingModelTableDataSource()?this.tableDataSource.getStartItemIndex():-1}getEndItemIndex(){return this._isPagingModelTableDataSource()?this.tableDataSource.getEndItemIndex():-1}getPageCount(){return this._isPagingModelTableDataSource()?this.tableDataSource.getPageCount():-1}totalSize(){return this._isPagingModelTableDataSource()?this.tableDataSource.totalSize():-1}totalSizeConfidence(){return this._isPagingModelTableDataSource()?this.tableDataSource.totalSizeConfidence():null}_getFetchFunc(e,t){let a=this;if(null!=e&&null!=e[n._SORTCRITERIA]){let r=e[n._SORTCRITERIA][0][n._ATTRIBUTE],s=e[n._SORTCRITERIA][0][n._DIRECTION];return this._ignoreSortEvent=!0,this._isPagingModelTableDataSource()||(this._startIndex=0),r=r,s=s,function(e,i){if(i){let i={};return i[n._KEY]=r,i[n._DIRECTION]=s,a[n._OFFSET]=0,a.tableDataSource.sort(i).then(function(){return a._ignoreSortEvent=!1,a._getTableDataSourceFetch(e,t)(e)})}return a._getTableDataSourceFetch(e,t)(e)}}return this._getTableDataSourceFetch(e,t);var r,s}_getTableDataSourceFetch(e,t){let a=this;return function(e,r){let s={};if(t=t>0?t:0,null!=a._startIndex&&(s[n._STARTINDEX]=a._startIndex+t),s[n._PAGESIZE]=null!=e&&e[n._SIZE]>0?e[n._SIZE]:null,!a._isPagingModelTableDataSource()&&e[n._SILENT]&&(s[n._SILENT]=e[n._SILENT]),null!=a.tableDataSource[n._SORTCRITERIA]&&null==e[n._SORTCRITERIA]){e[n._SORTCRITERIA]=[];let t=new a.SortCriterion(a,a.tableDataSource[n._SORTCRITERIA][n._KEY],a.tableDataSource[n._SORTCRITERIA][n._DIRECTION]);e[n._SORTCRITERIA].push(t)}return s[n._FETCHTYPE]=e[n._FETCHTYPE],a._isFetching=!0,new Promise(function(t,r){a._fetchResolveFunc=t,a._fetchRejectFunc=r,a._fetchParams=e,a._requestEventTriggered||(a._isPagingModelTableDataSource()||s[n._SILENT]||a._ignoreDataSourceEvents.push(!0),a.tableDataSource.fetch(s).then(function(r){if(a._isPagingModelTableDataSource()||s[n._SILENT]||a._ignoreDataSourceEvents.pop(),null!==r){a._isFetching=!1,void 0===r&&((r={})[n._KEYS]=[],r[n._DATA]=[]);let i=[];null!=r[n._KEYS]&&(i=r[n._KEYS].map(function(e){return new a.ItemMetadata(a,e)})),null==a._startIndex&&(a._startIndex=0);let l=!1;a._startIndex=a._startIndex+r[n._DATA].length,"actual"==a.tableDataSource.totalSizeConfidence()&&a.tableDataSource.totalSize()>0&&r.startIndex+r[n._DATA].length>=a.tableDataSource.totalSize()?l=!0:s[n._PAGESIZE]>0&&r[n._DATA].length<s[n._PAGESIZE]?l=!0:0==r[n._DATA].length&&(l=!0),a._fetchResolveFunc=null,a._fetchParams=null,t(l?new a.AsyncIteratorReturnResult(a,new a.FetchListResult(a,e,r[n._DATA],i)):new a.AsyncIteratorYieldResult(a,new a.FetchListResult(a,e,r[n._DATA],i)))}},function(e){a._isPagingModelTableDataSource()||s[n._SILENT]||a._ignoreDataSourceEvents.pop(),r(e)}))})}}_handleSync(t){let a=this;if(!(a._ignoreDataSourceEvents.length>0)){if(a._startIndex=null,t[n._STARTINDEX]>0&&(a._startIndex=t[n._STARTINDEX],a[n._OFFSET]=a._startIndex),a._fetchResolveFunc&&null!=t[n._KEYS]){a._isFetching=!1;let e=t[n._KEYS].map(function(e){return new a.ItemMetadata(a,e)}),r=!1;"actual"==a.tableDataSource.totalSizeConfidence()&&a.tableDataSource.totalSize()>0&&a._startIndex+t[n._DATA].length>=a.tableDataSource.totalSize()&&(r=!0),r?a._fetchResolveFunc(new a.AsyncIteratorReturnResult(a,new a.FetchListResult(a,a._fetchParams,t[n._DATA],e))):a._fetchResolveFunc(new a.AsyncIteratorYieldResult(a,new a.FetchListResult(a,a._fetchParams,t[n._DATA],e))),a._fetchResolveFunc=null,a._fetchParams=null}else a._requestEventTriggered||a.dispatchEvent(new e.DataProviderRefreshEvent);a._requestEventTriggered=!1}}_handleAdd(t){let a=this,r=t[n._KEYS].map(function(e){return new a.ItemMetadata(a,e)}),s=new Set;t[n._KEYS].map(function(e){s.add(e)});let i=new a.DataProviderAddOperationEventDetail(a,s,null,null,null,r,t[n._DATA],t[n._INDEXES]),l=new a.DataProviderMutationEventDetail(a,i,null,null);a.dispatchEvent(new e.DataProviderMutationEvent(l))}_handleRemove(t){let a=this,r=t[n._KEYS].map(function(e){return new a.ItemMetadata(a,e)}),s=new Set;t[n._KEYS].map(function(e){s.add(e)});let i=new a.DataProviderOperationEventDetail(a,s,r,t[n._DATA],t[n._INDEXES]),l=new a.DataProviderMutationEventDetail(a,null,i,null);a.dispatchEvent(new e.DataProviderMutationEvent(l))}_handleReset(t){let a=this;a._requestEventTriggered||a._isPagingModelTableDataSource()||(a._startIndex=0,a.dispatchEvent(new e.DataProviderRefreshEvent))}_handleSort(t){let a=this;a._ignoreSortEvent||(a._startIndex=null,a.dispatchEvent(new e.DataProviderRefreshEvent))}_handleChange(t){let a=this,r=t[n._KEYS].map(function(e){return new a.ItemMetadata(a,e)}),s=new Set;t[n._KEYS].map(function(e){s.add(e)});let i=new a.DataProviderOperationEventDetail(a,s,r,t[n._DATA],t[n._INDEXES]),l=new a.DataProviderMutationEventDetail(a,null,null,i);a.dispatchEvent(new e.DataProviderMutationEvent(l))}_handleRefresh(t){let a=this;a._isFetching||a._requestEventTriggered||(null!=t[n._OFFSET]?a._startIndex=t[n._OFFSET]:a._startIndex=null,a.dispatchEvent(new e.DataProviderRefreshEvent)),a._requestEventTriggered=!1}_handleRequest(t){let a=this;a._ignoreDataSourceEvents.length>0||void 0!==e.Model&&t instanceof e.Model||a._isFetching||(t[n._STARTINDEX]>0&&0==a.getStartItemIndex()&&(a._startIndex=t[n._STARTINDEX]),a._requestEventTriggered=!0,a.dispatchEvent(new e.DataProviderRefreshEvent))}_handleError(e){let t=this;t._fetchRejectFunc&&t._fetchRejectFunc(e),t._isFetching=!1,t._requestEventTriggered=!1}_handlePage(t){this._isFetching=!1,this._requestEventTriggered=!1;let a={};a.detail=t,this.dispatchEvent(new e.GenericEvent(e.PagingModel.EventType.PAGE,a))}_addTableDataSourceEventListeners(){this.removeAllListeners(),this.addListener("sync",this._handleSync),this.addListener("add",this._handleAdd),this.addListener("remove",this._handleRemove),this.addListener("reset",this._handleReset),this.addListener("sort",this._handleSort),this.addListener("change",this._handleChange),this.addListener("refresh",this._handleRefresh),this.addListener("request",this._handleRequest),this.addListener("error",this._handleError),this.addListener("page",this._handlePage)}_removeTableDataSourceEventListeners(){this.removeListener("sync"),this.removeListener("add"),this.removeListener("remove"),this.removeListener("reset"),this.removeListener("sort"),this.removeListener("change"),this.removeListener("refresh"),this.removeListener("request"),this.removeListener("error"),this.removeListener("page")}_isPagingModelTableDataSource(){return null!=this.tableDataSource.getStartItemIndex}}n._STARTINDEX="startIndex",n._SILENT="silent",n._SORTCRITERIA="sortCriteria",n._PAGESIZE="pageSize",n._OFFSET="offset",n._SIZE="size",n._CONTAINSPARAMETERS="containsParameters",n._RESULTS="results",n._FETCHTYPE="fetchType",e.EventTargetMixin.applyMixin(n),e.TableDataSourceAdapter=n,e.TableDataSourceAdapter=n});