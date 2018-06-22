import tokenUtil from './tokenUtil'

const asmxUploadFile = {
  asmxAjax: function (method, formData,config) {
    config['Token'] = tokenUtil.token
    formData.append("para", JSON.stringify(config));
    var dtd = $.Deferred();
    $.ajax({
      url: 'http://www.ztgis.com:8886/xmtdt.asmx/' + method,//'http://www.ztgis.com:8000/xmtdt.asmx/'+ method,//
      type: 'post',
      data: formData,
      processData: false, //必须false才会自动加上正确的Content-Type
      contentType: false,
    }).then(function (data) {
      dtd.resolve(data);
    }, function () {
      console.log("下载失败");
    });
    return dtd.promise();
  }
}

export default asmxUploadFile;
