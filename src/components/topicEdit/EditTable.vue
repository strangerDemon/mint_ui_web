<template>
  <div class="topicMapEditTable">
    <div class="configFormDiv">
      <div v-for="(item,index) in config" :key="index">
        <!--简单编辑框-->
        <mt-field v-if="item.control_type==1" :label="item.fieldCnName" v-model="configData[index]" :placeholder="item.fieldCnName"></mt-field>
        <!-- 时间选择器-->
        <div v-else-if="item.control_type==2" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configData[index]" disableClear>
            <span class="dropDown" @click="openPicker(index)"></span>
          </mt-field>
          <mt-datetime-picker ref="picker" :id="index" v-model="configSelectDiv[index]" type="date" year-format="{value} 年" month-format="{value} 月"
            date-format="{value} 日" @confirm="handleConfirm(index)">
          </mt-datetime-picker>
        </div>
        <!-- 单选-->
        <div v-else-if="item.control_type==3" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configSelectDataShow[index]" disableClear>
            <span class="dropDown" @click="openPicker(index)"></span>
          </mt-field>
          <mt-popup ref="picker" :id="index" v-model="configSelectDiv[index]" position="bottom" style="width: 100%;">
            <mt-radio :title="item.fieldCnName" align="right" v-model="configData[index]" :options="item.formData">
            </mt-radio>
          </mt-popup>
        </div>
        <!-- 复选-->
        <div v-else-if="item.control_type==4" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configSelectDataShow[index]" disableClear>
            <span class="dropDown" @click="openPicker(index)"></span>
          </mt-field>
          <mt-popup ref="picker" :id="index" v-model="configSelectDiv[index]" position="bottom" style="width: 100%;">
            <mt-checklist :title="item.fieldCnName" align="right" v-model="configData[index]" :options="item.formData">
            </mt-checklist>
          </mt-popup>
        </div>
        <!--选择照片-->
        <div v-else-if="item.control_type==5" :id="'div'+item.id">
          <mt-field readonly :label="item.fieldCnName" v-model="configData[index]">
          </mt-field>
          <div class="uploadShowDiv">
            <div v-show="configData[index]!=''" class="uploadImage">
              <img :src="configData[index]" class="uploadShowImage" />
              <span class="error" @click.native="deleteImage(index)"></span>
            </div>
            <img v-show="configData[index]==''" src="../../../static/img/add.png" class="uploadIcon"  @click="camera()" />
          </div>
          <!-- 直接使用原生的 -->
          <!-- <mt-actionsheet ref="picker" :id="index" :actions="actions" v-model="configSelectDiv[index]">
        </mt-actionsheet> -->
        </div>
      </div>
    </div>
    <!--camera照相机；camcorder摄像机；microphone录音  multiple属性，表示可以支持多选 capture="camera" -->
    <input style="display:none;" capture="camera" type="file" accept="image/*" id="cameraInput">
    <mt-button class="saveButton" type="primary" size="large" @click.native="saveData">保存</mt-button>
  </div>
</template>

<script>
  import * as regExp from "../../utils/regExp.js";
  import tokenUtil from "../../utils/tokenUtil";
  import {
    Toast
  } from "../../../node_modules/mint-ui";
  import Vue from "vue";
  export default {
    name: "topicMapEditTable",
    directives: {},
    components: {},
    data() {
      return {
        param: { //url 参数
          account: "",
          password: "",
          topicMapId: "",
          oid: "",
          bsm: "",
          operation: "",
          token: "",
        },
        config: null, //formConfig
        configDefault: null, //old  Value

        configData: [], //提交的值
        //为了实现下来框和下来复选框 组合mt-popup 和radio checklist添加的变量
        configSelectDiv: [], //下拉框显示
        configSelectDataShow: [], //下拉框的input框显示label

        actions: [{
            name: "拍照",
            method: () => this.camera("拍照")
          },
          {
            name: "从相册中选取",
            method: () => this.camera("从相册中选取")
          }
        ]
      };
    },
    props: {},
    computed: {},
    watch: {
      //[{"control_type":"1","id":17,"fieldEnName":"POICODE","fieldCnName":"编码","formType":1,"defaultValue":"","formValidation":{"isNull":1,"maxLength":"50","regularExp":"","tip":""}},{"control_type":"1","id":12,"fieldEnName":"NAME","fieldCnName":"名称","formType":1,"defaultValue":"","formValidation":{"isNull":1,"maxLength":"50","regularExp":"","tip":""}},{"control_type":"1","id":25,"fieldEnName":"CLASSID","fieldCnName":"分类编码","formType":1,"defaultValue":"","formValidation":{"isNull":1,"maxLength":"30","regularExp":"","tip":""}},{"control_type":"1","id":26,"fieldEnName":"DMBM","fieldCnName":"地名编码","formType":1,"defaultValue":"1234","formValidation":{"isNull":1,"maxLength":"8","regularExp":"/^[1-9]*[1-9][0-9]*$/","tip":"请输入正整数"}},{"control_type":"2","id":13,"fieldCnName":"测绘时间","fieldEnName":"CHSJ","formType":2,"defaultValue":"2017-11-15","formValidation":{"isNull":0,"minDate":"2012-01-01","maxDate":"2020-01-01","dateFmt":"yyyy-MM-dd"}},{"control_type":"3","id":14,"fieldCnName":"兴趣点等级","fieldEnName":"显示等级","formType":3,"formData":[{"value":"1","label":"一级"},{"value":"2","label":"二级"},{"value":"3","label":"三级"},{"value":"4","label":"四级"},{"value":"5","label":"五级"},{"value":"6","label":"六级"}],"formValidation":{"isNull":0}},{"control_type":"4","id":15,"fieldCnName":"类别","fieldEnName":"TYPE","formType":4,"formData":[{"value":"1001","label":"类别1"},{"value":"1002","label":"类别2"},{"value":"1003","label":"类别3"}],"formValidation":{"isNull":0}},{"control_type":"5","id":16,"fieldCnName":"图片","fieldEnName":"IMAGE_","formType":5,"formData":[],"formValidation":{"isNull":1},"fileConfig":{"dataType":"JPG","filePath":"D:\\天地图手机端采集","fileMaxSize":"10"}}]
      "$store.state.mapInfo.topicMap" (val) {
        let vm = this;
        val.formConfig = val.formConfig.replace(/"name"/g, '"label"');
        vm.config = eval("(" + val.formConfig + ")");
        console.log(vm.config);
        vm.config.forEach(function (data) {
          let value = data.defaultValue == undefined ? "" : data.defaultValue;
          if (["3", "4", "5"].indexOf(data.control_type) >= 0) {
            vm.configSelectDiv.push(false);
          } else {
            vm.configSelectDiv.push("");
          }
          if (data.control_type == 4) {
            vm.configData.push([]);
            vm.configSelectDataShow.push([]);
          } else {
            vm.configData.push(value + "");
            vm.configSelectDataShow.push("");
          }
        });
      },
      configData(val) {
        let vm = this;
        for (let i = 0, length = vm.config.length; i < length; i++) {
          let select = ""
          if (vm.config[i].formData != undefined) {
            vm.config[i].formData.forEach(function (data) {
              if (vm.configData[i].indexOf(data.value) >= 0) {
                select += data.label + ",";
              }
            })
            Vue.set(vm.configSelectDataShow, i, select.substring(0, select.length - 1));
          }
        }
        console.log(vm.configSelectDataShow);
      },
      //原始值 初始化
      "$store.state.mapInfo.topicMapDefault" (val) {
        console.log(val);
        this.configDefault = eval("(" + val + ")");
        this.initDefault();
      }
    },
    methods: {
      //默认值 初始化 提出
      initDefault() {
        let vm = this;
        vm.configData = vm.configDefault;
      },
      camera() {
        let fireOnThis = document.getElementById("cameraInput");
        if (this.getIos()) {
          fireOnThis.removeAttribute("capture");
        }
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
      //judge is iso or not
      getIos() {
        let ua = navigator.userAgent.toLowerCase();
        if (ua.match(/iPhone\sOS/i) == "iphone os") {
          return true;
        } else {
          return false;
        }
      },
      openPicker(index) {
        this.$refs.picker.forEach(function (picker) {
          if (picker.$el.id == index) {
            picker.open();
          }
        });
      },
      //时间picker
      handleConfirm(index) {
        let vm = this;
        let d = new Date(this.configSelectDiv[index]);
        Vue.set(
          this.configData,
          index,
          d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
        );
      },
      //照片处理
      // vue 不能监测到数组值的变化，要用vue.set才能获取到变化操作
      imageSheet(index) {
        Vue.set(this.configSelectDiv, index, true);
      },
      deleteImage(index) {
        Vue.set(this.configSelectDiv, index, false);
        Vue.set(this.configData, index, "");
      },
      saveData() {
        console.log(this.configData);
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
        topicMapId: vm.param.topicMapId
      });
      if (vm.param.oid != null && vm.param.oid != "") {
        vm.$store.commit("requestTopicMapDefault", {
          oid: vm.param.oid
        });
      }
      vm.$store.commit("setUserInfo", {
        account: vm.param.account,
        password: vm.param.password
      });
      console.log(vm.param);
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
    width: calc(100vw - 20px);
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
    width: 100%;
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
    left: calc(50vw - 50px);
    top: calc(17.5vh - 35px);/*Math.max((35vh -100px)/2+ 48px,48px*/
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
