module.exports={
    error:function(message, data, code){
        return {
            success:false,
            message:message,
            data:data,
            code:code
        }
    },
    success:function(message, data){
        return {
            success:true,
            message:message,
            data:data
        }
    }
}