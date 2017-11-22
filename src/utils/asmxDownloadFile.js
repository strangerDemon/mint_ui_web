import {
  Message
} from 'element-ui';
import tokenUtil from './tokenUtil'
import store from '../store'

const asmxDownfileFile = {
  asmxAjax: function (method, config) {
    config["Token"] = tokenUtil.token;
    var para = JSON.stringify(config)

    var form = $("<form>"); //定义一个form表单
    form.attr("style", "display:none");
    form.attr("target", "_self");
    form.attr("method", "get");
    form.attr("action", "http://www.ztgis.com:8886/xmtdt.asmx/unifiedFileDownLoad");
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
      url: 'http://www.ztgis.com:8886/xmtdt.asmx/' + method,
      type: 'get',
      datatype: 'json',
      data: {
        para: para
      },
    }).then(function (data) {
      dtd.resolve(data);
    }, function () {
      Message({
        message: "下载失败，请稍后重试！",
        type: 'warning',
        duration: 2 * 1000
      });
    });
    return dtd.promise();
  }
}


export default asmxDownfileFile;
