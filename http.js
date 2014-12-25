m.module({
    name: "http",
    src : document.currentScript.src,

    dependencies:
    {
        ajax : { url: "ajax.js" } 
    },

    delete: function(url,progress) {
        return m.modules.ajax.transfer('DELETE',url,null,progress);
    },

    get: function(url,progress) {
        return m.modules.ajax.transfer('GET',url,null,progress);
    },

    post: function(url,body,progress) {
        return m.modules.ajax.transfer('POST',url,body,progress);
    },

    put: function(url,body,progress) {
        return m.modules.ajax.transfer('PUT',url,body,progress);
    }

    
});
