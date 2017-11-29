import * as country from "@/api/esriLib/init";
import { asmx } from "@/utils";
import { Toast } from "../../../node_modules/mint-ui";
import Router from "@/router";
/**
 * Initial state
 * @type {Object}
 */
const state = {
  esriMap: null, //地图
  topicMapId: "", //当前选中的专题图id

  topicMap: [], //当前专题图信息

  topicEditList: [], //权限专题图
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
    asmx
      .post("getAuthTopicMapEditList", {
        account: info.account,
        password: info.password
      })
      .then(function(resp) {
        state.topicEditList = resp.topicList;
      });
  },

  requestTopicMapById(state, info) {
    asmx
      .post("getAuthTopicMapById", {
        account: info.account,
        password: info.password,
        topicMapId: info.topicMapId,
        OID: info.oid
      })
      .then(function(resp) {
        state.topicMapId = info.topicMapId;
        state.topicMap = resp;
      });
  },

  tmapEdit(state, info) {
    let attributes = {
      attributes: info.configData
    };
    let edits =
      info.method == "add"
        ? {
            add: attributes
          }
        : { update: attributes };
    asmx
      .post("tmapEdit", {
        TID: info.TID,
        bsm: info.bsm,
        edits: edits
      })
      .then(function(resp) {
        if (resp.adds[0].success == 1) {
          Toast("操作成功");
          Router.push({
            name: "Success"
          });
        } else {
          Toast("操作失败");
        }
      });
  },

  setMap(state, info) {
    state.esriMap = info.map;
  },

  setTopicMapId(state, info) {
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
