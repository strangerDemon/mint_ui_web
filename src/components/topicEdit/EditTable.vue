<template>
  <div class="topicMapEditTable">
    <div class="configFormDiv">
      <div v-for="(item,index) in config" :key="index">
        <!--简单编辑框-->
        <mt-field v-if="item.control_type==1" :label="item.fieldCnName" v-model="configData[index]" :placeholder="item.fieldCnName"
        :attr="{ maxlength: validation[index].maxLength}" @blur.native.capture="checkValidation(index)"></mt-field>
        <!-- 时间选择器-->
        <div v-else-if="item.control_type==2" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configData[index]" disableClear @focus.native.capture="openPicker(index)">
            <span class="dropDown" @click="openPicker(index)"></span>
          </mt-field>
          <!-- <date-time-picker :date="configSelectDiv[index]"  :minDate="validation[index].minDate"  :maxDate="validation[index].maxDate" 
              :dateFmt="validation[index].dateFmt" ></date-time-picker> -->
           <mt-datetime-picker ref="picker" :id="index" v-model="configSelectDiv[index]" :type="validation[index].dateFmt.indexOf('HH')>0?'datetime':'date'"
              year-format="{value}年"
              month-format="{value}月"
              date-format="{value}日"
              hour-format="{value}时"
              minute-format="{value}分"
             @confirm="handleConfirm(index)" 
             :startDate="validation[index].minDate!=''?new Date(validation[index].minDate):new Date(1970,0,1)" 
             :endDate="validation[index].maxDate!=''?new Date(validation[index].maxDate):new Date((new Date()).getYear()+1910,11,31)">
          </mt-datetime-picker>
        </div>
        <!-- 单选-->
        <div v-else-if="item.control_type==3" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configSelectDataShow[index]" disableClear @focus.native.capture="openPicker(index)">
            <span class="dropDown" @click="openPicker(index)"></span>
          </mt-field>
          <mt-popup ref="picker" :id="index" v-model="configSelectDiv[index]" position="bottom" style="width: 100%;">
            <mt-radio :title="item.fieldCnName+'(单选)'" align="right" v-model="configData[index]" :options="item.formData">
            </mt-radio>
          </mt-popup>
        </div>
        <!-- 复选-->
        <div v-else-if="item.control_type==4" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configSelectDataShow[index]" disableClear @focus.native.capture="openPicker(index)">
            <span class="dropDown" @click="openPicker(index)"></span>
          </mt-field>
          <mt-popup ref="picker" :id="index" v-model="configSelectDiv[index]" position="bottom" style="width: 100%;">
            <mt-checklist :title="item.fieldCnName+'(多选)'" align="right" v-model="configData[index]" :options="item.formData">
            </mt-checklist>
          </mt-popup>
        </div>
        <!--选择照片-->
        <div v-else-if="item.control_type==5" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configData[index]" disableClear  type="hidden">
          </mt-field>
          <div class="uploadShowDiv">
              <div v-show="configData[index]!=''" class="uploadImage">
                <img :src="fullImageUrl[index]" class="uploadShowImage" />
                <span class="error" @click="deleteImage(index)"></span>
              </div>
              <img v-show="configData[index]==''" src="../../../static/img/add.png" class="uploadIcon"  @click="camera(index)" />
          </div>
           <!--camera照相机；camcorder摄像机；microphone录音  multiple属性，表示可以支持多选 capture="camera" -->
          <input style="display:none;" capture="camera" type="file" accept="image/*" :id="'cameraInput'+index" @change="cameraInputChange" ref="cameraInput">

        </div>
      </div>
    </div>
   
    <mt-button class="saveButton" type="primary" size="large" @click.native="saveData">保存</mt-button>
  </div>
</template>

<script>
import * as regExp from "../../utils/regExp.js";
import tokenUtil from "../../utils/tokenUtil";
import { Toast } from "../../../node_modules/mint-ui";
import Vue from "vue";
import asmxUploadFile from "@/utils/asmxUploadFile.js";
import DateTimePicker from "../topicEdit/DateTimePicker";
export default {
  name: "topicMapEditTable",
  directives: {},
  components: { DateTimePicker },
  data() {
    return {
      param: {
        //url 参数
        account: "",
        password: "",
        topicMapId: "",
        oid: "",
        bsm: "",
        operation: "",
        token: ""
      },
      config: null, //formConfig
      //数据
      configData: [], //提交的值
      validation: [], //文本框校验

      //为了实现下来框和下来复选框 组合mt-popup 和radio checklist添加的变量
      configSelectDiv: [], //下拉框显示
      configSelectDataShow: [], //下拉框的input框显示label

      fullImageUrl: [], //图片显示全路径
      fileHttpPath:"",//编辑时基础url
    };
  },
  props: {},
  computed: {},
  watch: {
    //[
    //  {"control_type":"1","id":17,"fieldEnName":"POICODE","fieldCnName":"编码","formType":1,"defaultValue":"","formValidation":{"isNull":1,"maxLength":"50","regularExp":"","tip":""}},
    //  {"control_type":"1","id":12,"fieldEnName":"NAME","fieldCnName":"名称","formType":1,"defaultValue":"","formValidation":{"isNull":1,"maxLength":"50","regularExp":"","tip":""}},
    //  {"control_type":"1","id":25,"fieldEnName":"CLASSID","fieldCnName":"分类编码","formType":1,"defaultValue":"","formValidation":{"isNull":1,"maxLength":"30","regularExp":"","tip":""}},
    //  {"control_type":"1","id":26,"fieldEnName":"DMBM","fieldCnName":"地名编码","formType":1,"defaultValue":"1234","formValidation":{"isNull":1,"maxLength":"8","regularExp":"/^[1-9]*[1-9][0-9]*$/","tip":"请输入正整数"}},
    //  {"control_type":"2","id":13,"fieldCnName":"测绘时间","fieldEnName":"CHSJ","formType":2,"defaultValue":"2017-11-15","formValidation":{"isNull":0,"minDate":"2012-01-01","maxDate":"2020-01-01","dateFmt":"yyyy-MM-dd"}},
    //  {"control_type":"3","id":14,"fieldCnName":"兴趣点等级","fieldEnName":"显示等级","formType":3,"formData":[{"value":"1","label":"一级"},{"value":"2","label":"二级"},{"value":"3","label":"三级"},{"value":"4","label":"四级"},{"value":"5","label":"五级"},{"value":"6","label":"六级"}],"formValidation":{"isNull":0}},
    //  {"control_type":"4","id":15,"fieldCnName":"类别","fieldEnName":"TYPE","formType":4,"formData":[{"value":"1001","label":"类别1"},{"value":"1002","label":"类别2"},{"value":"1003","label":"类别3"}],"formValidation":{"isNull":0}},
    //  {"control_type":"5","id":16,"fieldCnName":"图片","fieldEnName":"IMAGE_","formType":5,"formData":[],"formValidation":{"isNull":1},"fileConfig":{"dataType":"JPG","filePath":"D:\\天地图手机端采集","fileMaxSize":"10"}}]
    //包含编辑时的默认值
    "$store.state.mapInfo.topicMap"(val) {
      let vm = this;
      vm.fileHttpPath=val.fileHttpUrl;
      val.formConfig = val.formConfig.toString().replace(/"name"/g, '"label"');
      vm.config = eval("(" + val.formConfig + ")");
      console.log("config",vm.config);
      vm.config.forEach(function(data) {
        let value = data.defaultValue == undefined ? "" : data.defaultValue;
        value =
          data.fieldValue == undefined || data.fieldValue == ""
            ? value
            : data.fieldValue;
            console.log(data,value);
        if (["3", "4", "5"].indexOf(data.control_type) >= 0) {
          vm.configSelectDiv.push(false);
        } else if (["2"].indexOf(data.control_type) >= 0) {
          if (value == "") {
            vm.configSelectDiv.push(new Date());
          } else {
            vm.configSelectDiv.push(new Date(value));
          }
        } else {
          vm.configSelectDiv.push("");
        }
        if (data.control_type == 4) {
          if (value == "") {
            vm.configData.push([]);
            vm.configSelectDataShow.push([]);
          } else {
            vm.configData.push(value.split(","));
            vm.configSelectDataShow.push(value.split(","));
          }
        } else {
          vm.configData.push(value + "");
          vm.configSelectDataShow.push("");
        }
        vm.validation.push(data.formValidation);
        vm.fullImageUrl = new Array(vm.config.length).fill("");
      });
      console.log(vm.configData,vm.configSelectDataShow);
    },
    configData(val) {
      this.doConfigData();
    }
  },
  methods: {
    //config Data 数据变化后手动执行
    doConfigData() {
      let vm = this;
      for (let i = 0, length = vm.config.length; i < length; i++) {
        let select = "";
        if (vm.config[i].formData != undefined) {
          vm.config[i].formData.forEach(function(data) {
            if (vm.configData[i].indexOf(data.value) >= 0) {
              select += data.label + ",";
            }
          });
          Vue.set(
            vm.configSelectDataShow,
            i,
            select.substring(0, select.length - 1)
          );
        }
      }
    },
    camera(index) {
      let fireOnThis = document.getElementById("cameraInput" + index);
      if (this.getIos()) {
        fireOnThis.removeAttribute("capture");
      }
      //fireOnThis.click();
      //android 4.4 cannot click
      let evObj = document.createEvent("MouseEvents");
      evObj.initMouseEvent(
        "click",
        true,
        true,
        window,
        1,
        12,
        345,
        7,
        220,
        false,
        false,
        true,
        false,
        0,
        null
      );
      fireOnThis.dispatchEvent(evObj);
    },
    cameraInputChange(evt) {
      let vm = this;
      let cameraInput = $(evt.target);
      let index = cameraInput[0].id.substring(11);
      let files = evt.target.files || evt.dataTransfer.files;
      let formData = new FormData();
      formData.append("fileData", files[0]);
      asmxUploadFile
        .asmxAjax("tmapUploadFile", formData, { TID: vm.param.topicMapId })
        .then(function(resp) {
          let result = eval("(" + resp + ")");
          Vue.set(
            vm.fullImageUrl,
            index,
            result.Results.fileHttpUrl.replace(/\\/g, "/")
          );
          Vue.set(vm.configData, index, result.Results.fileUrl);
          vm.doConfigData(); //囧，i dont konw why 搞事情
        });
    },
    //judge is ios or not
    getIos() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/iPhone\sOS/i) == "iphone os") {
        return true;
      } else {
        return false;
      }
    },
    openPicker(index) {
      this.$refs.picker.forEach(function(picker) {
        if (picker.$el.id == index) {
          picker.open();
        }
      });
    },
    //时间picker
    handleConfirm(index) {
      let vm = this;
      let d = new Date(vm.configSelectDiv[index]);
      let dataFmt = vm.validation[index].dateFmt;
      let dateTsring = "";
      if (dataFmt.indexOf("yyyy") >= 0) {
        dateTsring += d.getFullYear();
      }
      if (dataFmt.indexOf("MM") >= 0) {
        dateTsring += "-" + (d.getMonth() + 1);
      }
      if (dataFmt.indexOf("dd") >= 0) {
        dateTsring += "-" + d.getDate();
      }
      if (dataFmt.indexOf("HH") >= 0) {
        dateTsring += " " + d.getHours();
      }
      if (dataFmt.indexOf(":mm") >= 0) {
        dateTsring += ":" + d.getMinutes();
      }
      if (dataFmt.indexOf("ss") >= 0) {
        dateTsring += ":" + d.getSeconds();
      }

      Vue.set(this.configData, index, dateTsring);
    },
    //照片处理
    // vue 不能监测到数组值的变化，要用vue.set才能获取到变化操作
    imageSheet(index) {
      Vue.set(this.configSelectDiv, index, true);
    },
    deleteImage(index) {
      Vue.set(this.fullImageUrl, index, "");
      Vue.set(this.configData, index, "");
    },
    //表单验证
    checkValidation(index) {
      let vm = this;
      let valid = vm.validation[index];
      if (valid.regularExp != "") {
        //正则校验
        let regular = new RegExp(valid.regularExp);
        if (!regular.test(vm.configData[index])) {
          Toast(vm.config[index].fieldCnName + ":" + valid.tip);
        }
      }
      if (
        (valid.isNull == "1" || valid.isNull == 1) &&
        vm.configData[index] == ""
      ) {
        //不可为空
        Toast(vm.config[index].fieldCnName + ":不可为空");
      }
    },
    saveData() {
      let vm = this;
      vm.$store.commit("tmapEdit", {
        TID: vm.param.topicMapId,
        bsm: vm.param.bsm,
        edits: vm.configData
      });
    }
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    let vm = this;
    let url = window.location.href;

    vm.param.account = regExp.GetQueryString(url, "account");
    vm.param.password = regExp.GetQueryString(url, "password");
    vm.param.topicMapId = regExp.GetQueryString(url, "tid");
    vm.param.oid = regExp.GetQueryString(url, "oid");
    vm.param.bsm = regExp.GetQueryString(url, "bsm");
    vm.param.operation = regExp.GetQueryString(url, "operation");
    vm.param.token = regExp.GetQueryString(url, "token");

    tokenUtil.token = vm.param.token;

    vm.$store.commit("requestTopicMapById", {
      account: vm.param.account,
      password: vm.param.password,
      topicMapId: vm.param.topicMapId,
      oid: vm.param.oid
    });
    vm.$store.commit("setUserInfo", {
      account: vm.param.account,
      password: vm.param.password
    });
  }
};
</script>
<style lang="css" scoped>
.topicMapEditTable {
  overflow-y: scroll;
}

.configFormDiv {
  margin-bottom: 50px;
  position: relative;
}

.saveButton {
  position: fixed;
  bottom: 0;
}

.uploadShowDiv {
  /* 安卓4.4 不支持calc */
  /* width: calc(100vw - 20px); */
  height: 35vh;
  min-width: 100px;
  min-height: 100px;
  background-color: gray;
  margin: 0px 10px;
}

.uploadImage,
.uploadShowImage {
  position: relative;
  height: 100%;
  width: auto;
  text-align: center;
}

.uploadImage .error {
  background-image: url("../../../static/img/x.png");
  background-size: cover;
  /*等比缩放*/
  position: absolute;
  right: -10px;
  width: 20px;
  height: 20px;
  top: -10px;
}

.uploadIcon {
  position: relative;
  cursor: pointer;
  /* left: calc(50vw - 50px);
  top: calc(17.5vh - 35px); */
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}

.dropDown {
  background-image: url("../../../static/img/dropDown.png");
  background-size: cover;
  /*等比缩放*/
  position: absolute;
  width: 25px;
  height: 25px;
  right: -5px;
  top: -12px;
}
</style>
