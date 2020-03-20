export enum Methods {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

export const invokeAPI = (url: string, method: Methods, data: any, onSuccess: (response: any) => void, onError: (error: any) => void): void => {
    const headers = { "Authorization": "Basic T0FfTlJQSUMxOlBhc3N3b3JkMTIz" };
    if (url.indexOf('http://') === -1) {
        url = `http://iampwtd201.assessor.lacounty.gov:7777${url}`;
    }

    $.ajax({
        type: 'GET', url: url, data: data ? JSON.stringify(data) : null,
        headers: data ? { ...headers, 'Content-Type': 'application/json' } : headers,
        success: (data, textStatus, jqXHR) => {
            console.log(data);
            onSuccess(data);
        },
        error: (jqXHR, textStatus, errorThrown) => {
            const errPayload = {
                errorCode: jqXHR.status,
                timestamp: Date.now(),
                message: errorThrown
            };
            onError(errPayload);
        }
    });
};
