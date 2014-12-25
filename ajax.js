function XHRError(xhr) {
    this.message = xhr.responseText;
    this.xhr = xhr;
    this.stack = (new Error()).stack;
}
XHRError.prototype = new Error(); // Object.create(Error.prototype);
XHRError.prototype.constructor = XHRError;
XHRError.prototype.name = 'XHRError';

m.module({
    name:"ajax",
    src:document.currentScript.src,

    createCORS: function(method,url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
            throw new Error( "This browser does not support CORS" );
        }
        return xhr;
    },

    transfer: function(method,url,body,progress_callback ) {
        var result = new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest(); // this.createCORS(method,url);
            xhr.open(method,url,true);
            xhr.onreadystatechange=function()
            {
                switch( xhr.readyState )
                {
                    case 3:
                    {
                        var bytesTotal = xhr.getResponseHeader("Content-Length");
                        var bytesReceived = xhr.responseText.length;
                        if (m.isCallable(progress_callback)) {
                            progress_callback(bytesReceived,bytesTotal);
                        }
                        return;
                    }
                    case 4:
                    {
                        if (200 <= xhr.status && xhr.status <= 299) {
                            resolve(xhr);
                        } else {
                            reject(new XHRError(xhr));
                        }
                    }
                }
            };
            xhr.send(body);
        });
        return result;
    }
});
