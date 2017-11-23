<template>
  <div class="topicMapEditTable">
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
        <mt-field readonly :label="item.fieldCnName" v-model="configData[index]" disableClear>
          <span class="dropDown" @click="openPicker(index)"></span>
        </mt-field>
        <mt-popup ref="picker" :id="index" v-model="configSelectDiv[index]" position="bottom" style="width: 100%;">
          <mt-radio :title="item.fieldCnName" align="right" v-model="configData[index]" :options="item.formData">
          </mt-radio>
        </mt-popup>
      </div>
      <!-- 复选-->
      <div v-else-if="item.control_type==4" :id="'div'+item.id">
        <mt-field readonly :label="item.fieldCnName" v-model="configData[index]" disableClear >
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
            <img  src="" class="uploadShowImage"/>
            <span class="error"  @click.native="deleteImage(index)"></span>
          </div>
          <img v-show="configData[index]==''" src="../../../static/img/add.png" class="uploadIcon" @click="imageSheet(index)"/>
        </div>    
        <mt-actionsheet ref="picker" :id="index" :actions="actions" v-model="configSelectDiv[index]">
        </mt-actionsheet>    
      </div>  
    </div>
    <input style="display:none;" type="file" capture="camera" accept="image/*" id="cameraInput">
    <mt-button class="saveButton" type="primary" size="large" @click.native="saveData">保存</mt-button>
  </div>
</template>

<script>
import * as regExp from "../../utils/regExp.js";
import tokenUtil from "../../utils/tokenUtil";
import { Toast } from "../../../node_modules/mint-ui";
import Vue from "vue";
export default {
  name: "topicMapEditTable",
  directives: {},
  components: {},
  data() {
    return {
      username: "",
      config: null,
      configData: [],
      configSelectDiv: [],
      actions: [
        {
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
    "$store.state.mapInfo.topicMap"(val) {
      let vm = this;
      val.formConfig = val.formConfig.replace(/"name"/g, '"label"');
      alert(val.formConfig);
      console.log(val.formConfig);
      vm.config = eval("(" + val.formConfig + ")");
      vm.config.forEach(function(data) {
        let value = data.defaultValue == undefined ? "" : data.defaultValue;
        if (["3", "4", "5"].indexOf(data.control_type) >= 0) {
          vm.configSelectDiv.push(false);
        } else {
          vm.configSelectDiv.push("");
        }
        if (data.control_type == 4) {
          vm.configData.push([]);
        } else {
          vm.configData.push(value + "");
        }
      });
      console.log(vm.configData, vm.configSelectDiv);
    }
  },
  methods: {
    onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    camera(word) {
      console.log(word); 
      let fireOnThis = document.getElementById("cameraInput");
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
      let d = new Date(this.configSelectDiv[index]);
      Vue.set(this.configData,index,d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate());
    },
    //照片处理
    // vue 不能监测到数组值的变化，要用vue.set才能获取到变化操作
    imageSheet(index) {
      Vue.set(this.configSelectDiv, index, true);
      console.log(this.configSelectDiv);
    },
    deleteImage(index) {
      Vue.set(this.configSelectDiv, index, false);
      console.log(this.configSelectDiv);
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
    let account = regExp.GetQueryString(url, "account");
    let password = regExp.GetQueryString(url, "password");
    let topicMapId = regExp.GetQueryString(url, "topicMapId");
    let token = regExp.GetQueryString(url, "token");
    tokenUtil.token = token;

    vm.$store.commit("requestTopicMapById", {
      account: account,
      password: password,
      topicMapId: topicMapId
    });
    vm.$store.commit("setUserInfo", {
      account: account,
      password: password
    });
  }
};
</script>
<style lang="css" scoped>
.saveButton {
  position: absolute;
  bottom: 0;
}

.uploadShowDiv {
  position: absolute;
  width: calc(100vw - 20px);
  height: 35vh;
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
  background-size: cover; /*等比缩放*/
  position: absolute;
  right: -10px;
  width: 20px;
  height: 20px;
  top: -10px;
}

.uploadIcon {
  position: absolute;
  left: calc(50vw - 50px);
  top: calc(17.5vh - 50px);
}
.dropDown {
  background-image: url("../../../static/img/dropDown.png");
  background-size: cover; /*等比缩放*/
  position: absolute;
  width: 25px;
  height: 25px;
  right: -5px;
  top: -12px;
}
</style>
