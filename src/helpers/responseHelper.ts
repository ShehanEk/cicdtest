const LOG_LEVEL= 'DEBUG'
const getAllowedOrigins = (event: any)=>{

    // allowed origins
    let allOrigins = ['*'];
    let allowedOrigins = null;
    if (allOrigins.includes('*')) {
        allowedOrigins = '*';
    } else if (allOrigins.includes(event.headers.origin)) {
        allowedOrigins = event.headers.origin;
    }
    return allowedOrigins;
}

const getResponseHeaders=(allowedOrigins:any)=>{

    const headers = {
        'Content-Type': 'application/json',
        'X-XSS-Protection':'1; mode=block',
        'X-Content-Type-Options':'nosniff',
        'Cache-Control':'no-store, no-cache',
        'Strict-Transport-Security':'max-age=31536000; includeSubDomains',
        'Content-Security-Policy':"default-src 'none'"
    };

    if(allowedOrigins){
        headers['Access-Control-Allow-Origin']=allowedOrigins // Required for CORS support to work
    }
    return headers;
}

export const sendSuccess= function(event:any,message:string, content = {}, result = true) {
        const allowedOrigins = getAllowedOrigins(event)
        let successResponse = {
            statusCode: 200,
            headers: getResponseHeaders(allowedOrigins),
            body: JSON.stringify({
                result,
                message,
                content,
            }),
        };

        if( LOG_LEVEL === 'DEBUG')console.log('Response : ',successResponse);
        return successResponse;
}

export const   createResponse = function(event:any,message:string, content = {}, result = true) {
        const allowedOrigins = getAllowedOrigins(event)
        let successResponse = {
            statusCode: 201,
            headers: getResponseHeaders(allowedOrigins),
            body: JSON.stringify({
                result,
                message,
                content,
            }),
        };
        return successResponse;
}

export const   sendError = (event:any,statusCode:number, message:any, err:any, errorPayload:any) => {
        const allowedOrigins = getAllowedOrigins(event)
        if( LOG_LEVEL === 'DEBUG')console.log(err);
        const resData = {
            statusCode,
            headers: getResponseHeaders(allowedOrigins),
            body: JSON.stringify({ message, ...errorPayload }),
        };
        return resData;
}

