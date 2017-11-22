<template>
  <div class="topicMapEditTable">
    <div v-for="(item,index) in config" :key="index">
      <!--简单编辑框-->
      <mt-field v-if="item.control_type==1" :label="item.fieldCnName" v-model="configData[index]" :placeholder="item.fieldCnName"></mt-field>
      <!-- 时间选择器-->
      <div v-else-if="item.control_type==2" :id="'div'+item.id">
        <div @click="openPicker(index)">
          <mt-field readonly :label="item.fieldCnName" v-model="configData[index]"></mt-field>
        </div>
        <mt-datetime-picker ref="picker" :id="index" v-model="configSelectDiv[index]" type="date" year-format="{value} 年" month-format="{value} 月"
          date-format="{value} 日" @confirm="handleConfirm(index)">
        </mt-datetime-picker>
      </div>
      <!-- 单选-->
      <div v-else-if="item.control_type==3" :id="'div'+item.id" @click="test(index)">
        <div @click="openPicker(index)">
          <mt-field readonly :label="item.fieldCnName" v-model="configData[index]"></mt-field>
        </div>
        <mt-popup ref="picker" :id="index" v-model="configSelectDiv[index]" position="bottom" style="width: 100%;">
          <mt-checklist :title="item.fieldCnName" v-model="configData[index]" :options="item.formData">
          </mt-checklist>
        </mt-popup>

      </div>
      <!-- 复选-->
      <div v-else-if="item.control_type==4" :id="'div'+item.id" @click="test(index)">
        <mt-field readonly :label="item.fieldCnName" v-model="configData[index]"></mt-field>
        <mt-popup ref="picker" :id="index" v-model="configSelectDiv[index]" position="bottom" style="width: 100%;">
          <mt-checklist :title="item.fieldCnName" v-model="configData[index]" :options="item.formData">
          </mt-checklist>
        </mt-popup>
      </div>
      <!--选择照片-->
      <div v-else-if="item.control_type==5" :id="'div'+item.id" @click="test(index)">
        <mt-field readonly :label="item.fieldCnName" v-model="configData[index]"></mt-field>
        <!--<mt-actionsheet ref="picker" :id="index" :actions="actions" v-model="configSelectDiv[index]">
        </mt-actionsheet>-->
      </div>
    </div>
  </div>
</template>

<script>
  import * as regExp from '../../utils/regExp.js'
  import tokenUtil from '../../utils/tokenUtil'
  import {
    Toast
  } from '../../../node_modules/mint-ui';
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
        actions: [{
          name: "拍照",
          method: () => test("拍照")
        }, {
          name: "从相册中选取",
          method: () => test("从相册中选取")
        }]
      }
    },
    props: {},
    computed: {},
    watch: {
      '$store.state.mapInfo.topicMap' (val) {
        let vm = this
        val.formConfig = val.formConfig.replace(/"name"/g, '"label"');
        console.log(val.formConfig);
        vm.config = eval('(' + val.formConfig + ')');
        vm.config.forEach(function (data) {
          let value = data.defaultValue == undefined ? "" : data.defaultValue;
          vm.configData.push(value + "")
          if (data.control_type == 4) {
            vm.configSelectDiv.push([])
          } else {
            vm.configSelectDiv.push("")
          }
        })
        console.log(vm.configData)
      }
    },
    methods: {
      onValuesChange(picker, values) {
        if (values[0] > values[1]) {
          picker.setSlotValue(1, values[0]);
        }
      },
      test(word) {
        console.log(word);
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
        let vm = this
        let d = new Date(this.configSelectDiv[index]);
        this.configData[index] = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
      }
    },
    beforeCreate() {},
    created() {},
    destroyed() {},
    mounted() {
      let vm = this
      let url = window.location.href;
      let account = regExp.GetQueryString(url, "account");
      let password = regExp.GetQueryString(url, "password");
      let topicMapId = regExp.GetQueryString(url, "topicMapId");
      let token = regExp.GetQueryString(url, "token");
      tokenUtil.token = token;
      vm.$store.commit('requestTopicMapById', {
        account: account,
        password: password,
        topicMapId: topicMapId
      });
      vm.$store.commit('setUserInfo', {
        account: account,
        password: password
      });
    }
  }

</script>
<style lang="css" scoped>


</style>
