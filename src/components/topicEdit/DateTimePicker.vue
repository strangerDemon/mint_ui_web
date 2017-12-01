<template>
  <div class="dateTimePicker">
    <mt-datetime-picker v-if="dateFmt.length<5" ref="picker" v-model="date" type="date" year-format="{value}年" @confirm="handleConfirm"
      :startDate="minDate" :endDate="maxDate">
    </mt-datetime-picker>
    <mt-datetime-picker v-else-if="dateFmt.length<8" ref="picker" v-model="date" type="date" year-format="{value}年" month-format="{value}月"
      @confirm="handleConfirm" :startDate="minDate" :endDate="maxDate">
    </mt-datetime-picker>
    <mt-datetime-picker v-else-if="dateFmt.length<11" ref="picker" v-model="date" type="date" year-format="{value}年" month-format="{value}月"
      date-format="{value}日" @confirm="handleConfirm" :startDate="minDate" :endDate="maxDate">
    </mt-datetime-picker>
    <mt-datetime-picker v-else-if="dateFmt.length<5" ref="picker" v-model="date" type="datetime" year-format="{value}年" month-format="{value}月"
      date-format="{value}日" hour-format="{value}时" @confirm="handleConfirm" :startDate="minDate" :endDate="maxDate">
    </mt-datetime-picker>
    <mt-datetime-picker v-else ref="picker" v-model="date" type="datetime" year-format="{value}年" month-format="{value}月" date-format="{value}日"
      hour-format="{value}时" minute-format="{value}分" @confirm="handleConfirm" :startDate="minDate" :endDate="maxDate">
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
  name: "dateTimePicker",
  directives: {},
  components: {},
  data() {
    return {
      date:null,
      minDate:null,
      maxDate:null,
    };
  },
  props: {
    dateFmt: {
      default: "",
      Type: String
    },
    dateStr: {
      default: "",
      Type: String
    },
    minDateStr: {
      default: "",
      Type: String
    },
    maxDateStr: {
      default: "",
      Type: String
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeToMinDate(val, format) {
      if (!val) {
        return null
      }
      if (typeof val === 'number' && val > 100000000) {
        val = val + ''
      }
      if (typeof val === 'string' && val.length === 8) {
        val = val.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
      }
      if (format && format.length < 14&&format.length>11) {
        val = Date.parse(val + ":")
      } else {
        val = Date.parse(val)
      }
      if (!val) {
        return null
      } else {
        if (format && format.length < 5) {//年份
          let d2 = new Date(val);
          d2.setHours(0);
          return d2
        } else if (format && format.length < 8) {
          let d2 = new Date(val);
          d2.setHours(0);
          return d2
        } else if (format && format.length < 11) {
          let d2 = new Date(val);
          d2.setHours(0)
          return d2
        } else if (format && format.length < 20) {
          let d2 = new Date(val);
          return d2
        }
      }
    },
    changeToMaxDate(val, format) {
      if (!val) {
        return null
      }
      if (typeof val === 'number' && val > 100000000) {
        val = val + ''
      }
      if (typeof val === 'string' && val.length === 8) {
        val = val.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
      }
      if (format && format.length < 14) {
        val = Date.parse(val + ":")
      } else {
        val = Date.parse(val)
      }
      if (!val) {
        return null
      } else {
        if (format && format.length < 5) {//年份
          let d2 = new Date(val);
          d2.setFullYear(d2.getFullYear() + 1);
          d2.setHours(0);
          return d2
        } else if (format && format.length < 8) {
          let d2 = new Date(val);
          d2.setMonth(d2.getMonth() + 1);
          d2.setHours(0);
          return d2
        } else if (format && format.length < 11) {
          let d2 = new Date(val);
          d2.setDate(d2.getDate() + 1);
          d2.setHours(0)
          return d2
        } else if (format && format.length < 14) {
          let d2 = new Date(val);
          d2.setHours(d2.getHours() + 1);
          return d2
        } else if (format && format.length < 17) {
          let d2 = new Date(val);
          d2.setMinutes(d2.getMinutes() + 1);
          return d2
        } else if (format && format.length < 20) {
          let d2 = new Date(val);
          d2.setSeconds(d2.getSeconds() + 1);
          return d2
        }
      }
    },
    //时间picker
    handleConfirm(index) {
      let vm = this;
      let d = new Date(vm.configSelectDiv[index]);
      let dataFmt = vm.validation[index].dateFmt;
      let dateTsring = "";
      if (dataFmt.indexOf("yyyy")) {
        dateTsring += d.getFullYear();
      }
      if (dataFmt.indexOf("MM")) {
        dateTsring += "-" + (d.getMonth() + 1);
      }
      if (dataFmt.indexOf("dd")) {
        dateTsring += "-" + d.getDate();
      }
      if (dataFmt.indexOf("HH")) {
        dateTsring += " " + d.getHours();
      }
      if (dataFmt.indexOf(":mm")) {
        dateTsring += ":" + d.getMinutes();
      }
      if (dataFmt.indexOf("ss")) {
        dateTsring += ":" + d.getSeconds();
      }

      Vue.set(this.configData, index, dateTsring);
    }
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    let vm=this
    
  }
};
</script>
<style lang="css" scoped>

</style>