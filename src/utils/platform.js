/**
 * Created by Administrator on 2017/1/30.
 */
this.userAgent = navigator.userAgent.toLowerCase();
export const isIos = function() {
  return (
    this.userAgent.match(/iPhone\sOS/i) == "iphone os" ||
    this.userAgent.match(/iPad/i) == "ipad"
  );
};

export const isAndroid = function() {
  return this.userAgent.match(/android/i) == "android";
};

export const platform = function() {
  return this.userAgent;
};
