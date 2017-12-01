/**
 * Created by Administrator on 2017/1/30.
 */
this.userAgent = navigator.userAgent.toLowerCase();
export const isIos = function() {
  return this.userAgent.match(/iPhone\sOS/i) == "iphone os";
};

export const isAndroid = function() {
  return this.userAgent.indexOf("Android") > -1 || this.userAgent.indexOf("Adr") > -1;
};

export const platform =function(){
  return this.userAgent;
}