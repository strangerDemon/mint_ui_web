import {
  Message
} from 'element-ui';
import tokenUtil from './tokenUtil'

const asmxUploadFile = {
  asmxAjax: function (method, formData,config) {
    config['Token'] = tokenUtil.token
    formData.append("para", JSON.stringify(config));
    var dtd = $.Deferred();
    $.ajax({
      url: 'http://www.ztgis.com:8886/xmtdt.asmx/' + method,
      type: 'post',
      data: formData,
      processData: false, //必须false才会自动加上正确的Content-Type
      contentType: false,
    }).then(function (data) {
      dtd.resolve(data);
    }, function () {
      Message({
        message: "上传失败，请稍后重试！",
        type: 'warning',
        duration: 2 * 1000
      });
    });
    return dtd.promise();
  }
}

export default asmxUploadFile;
