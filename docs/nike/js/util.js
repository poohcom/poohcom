
/**
 * Created by j on 2017. 6. 1..
 */
/**
 * 공통 스크립트
 * @type {Object}
 */
var scriptUtil = new Object();

scriptUtil.sucMsg = 200;
scriptUtil.overMsg = 300;
scriptUtil.errMsg = 500;

//ajax call
scriptUtil.ajaxCallBack = function(url_v, type_v, data_v, dataType_v, sucFun, comFun){
    jQuery.ajax({
        url : url_v
        , type : type_v
        , data : data_v
        , dataType : dataType_v
        , success : sucFun
        , complete : comFun
    });
};

//FormData 사용 ajax (주로 파일업로드에 사용)
scriptUtil.ajaxFileCallBack = function(url_v, type_v, data_v, dataType_v, sucFun, comFun){
    jQuery.ajax({
        url : url_v
        , type : type_v
        , data : data_v
        , dataType : dataType_v
        , processData: false
        , contentType: false
        , success : sucFun
        , complete : comFun
    });
};

//jQuery Form ajax (주로 파일업로드에 사용)
scriptUtil.ajaxFormCallBack = function(url_v, type_v, data_v, dataType_v, sucFun, comFun, formId){
    var options = {
        url : url_v,
        type : type_v,
        contentType : "application/x-www-form-urlencoded; charset=utf-8",
        dataType : dataType_v,
        success : sucFun,
        complete : comFun
    };

    jQuery("#" + formId).ajaxForm(options).submit();
};


scriptUtil.getSelectHtml = function(data, name){
    var selectHtml = "<select name='" + name + "' id='" + name + "'>";
    selectHtml += "<option value=''>선택</option>";
    jQuery.each(data, function(idx, value){
        selectHtml += "<option value='" + value.opt + "'>" + value.name + "</option>";
    });
    selectHtml += "</select>";

    return selectHtml;
};

scriptUtil.movePage = function(pageName, param, paramName){
    location.href = pageName + "?" + paramName + "=" + param;
};

