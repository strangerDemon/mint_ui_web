export function GetQueryString(url, name) {
  var reg = new RegExp("(^|&{0,1})" + name + "=([^&]*)(&|$)");
  var r = url.substr(1).match(reg);
  if (r != null) {
    let value = unescape(r[2]);
    return value.replace(/"/g, "");
  }
  return null;
}
