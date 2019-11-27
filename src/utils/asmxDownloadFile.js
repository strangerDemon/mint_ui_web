import tokenUtil from './tokenUtil'
import store from '../store'
import Config from "@/services";

const asmxDownfileFile = {
  asmxAjax: function (method, config) {
    config["Token"] = tokenUtil.token;
    var para = JSON.stringify(config)

    var form = $("<form>"); //定义一个form表单
    form.attr("style", "display:none");
    form.attr("target", "_self");
    form.attr("method", "get");
    form.attr("action", Config.API_URL+"unifiedFileDownLoad");//"http://map.xmtfj.gov.cn:8004/xmtdt.asmx/unifiedFileDownLoad");
    var input1 = $("<input>");
    input1.attr("type", "hidden");
    input1.attr("name", "para");
    input1.attr("value", para);
    $("body").append(form); //将表单放置在web中
    form.append(input1);
    form.submit(); //表单提交
  },
  validateFileAuth: function (method, config) {
    config["Token"] = tokenUtil.token;
    var para = JSON.stringify(config);
    var dtd = $.Deferred();
    $.ajax({
      url: 'http://map.xmtfj.gov.cn:8004/xmtdt.asmx/' + method,//'http://www.ztgis.com:8000/xmtdt.asmx/'+ method,//
      type: 'get',
      datatype: 'json',
      data: {
        para: para
      },
    }).then(function (data) {
      dtd.resolve(data);
    }, function () {
        console.log("下载失败")
    });
    return dtd.promise();
  }
}


export default asmxDownfileFile;
