import * as country from "@/api/esriLib/init";
import { asmx } from "@/utils";
/**
 * Initial state
 * @type {Object}
 */
const state = {
  esriMap: null, //地图
  topicMapId: "", //当前选中的专题图id

  topicMap:[],//当前专题图信息

  topicEditList: [],//权限专题图
  countryMapList: [], //国家地图
  mapList: [], //厦门图层
  nodeList: [] //厦门注记图层
};

/**
 * Getters
 * @type {Object}
 */
const getters = {};

/**
 * Mutations
 * @type {Object}
 */
const mutations = {
  requsetTopicEditList(state, info) {
    asmx.post("getAuthTopicMapEditList", {
        account: info.account,
        password: info.password
      })
      .then(function(resp) {
        state.topicEditList = resp.topicList;
      });
  },

  requestTopicMapById(state,info){
    asmx.post("getAuthTopicMapById", {
      account: info.account,
      password: info.password,
      topicMapId:info.topicMapId
    })
    .then(function(resp) {
      alert(resp)
      state.topicMapId=info.topicMapId
      state.topicMap = resp;
    });
  },
  setMap(state, info) {
    state.esriMap = info.map;
  },

  setTopicMapId(state,info){
    state.topicMapId = info.topicMapId;
  },

  setLayerList(state, info) {
    state.mapList = info.mapList;
    state.nodeList = info.nodeList;
    state.countryMapList = info.countryMapList;
  }
};

/**
 * Actions
 * @type {Object}
 */
const actions = {};

// Export module
export default {
  state,
  getters,
  mutations,
  actions
};
