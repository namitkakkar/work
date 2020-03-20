export class CommonUtils {

    static parseQueryString(queryString?: string): any {
        if (!queryString) {
            queryString = window.location.search.substring(1);
        }
        const params = {};
        const queries = queryString.split("&");
        queries.forEach((indexQuery: string) => {
            const indexPair = indexQuery.split("=");
            const queryKey = decodeURIComponent(indexPair[0]);
            const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");
            params[queryKey] = queryValue;
        });
        console.log("url params::", params);
        return params;
    }

}
