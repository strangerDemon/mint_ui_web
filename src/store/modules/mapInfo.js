import { asmx } from "@/utils";
import { Toast } from "../../../node_modules/mint-ui";
import Router from "@/router";
/**
 * Initial state
 * @type {Object}
 */
const state = {
  topicMapId: "", //当前选中的专题图id

  topicMap: [], //当前专题图信息
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
        if (
          (resp.adds != undefined && resp.adds[0].success == 1) ||
          (resp.updates != undefined && resp.updates[0].success == 1)
        ) {
          Toast("操作成功");
          Router.push({
            name: "Success"
          });
        } else {
          Toast("操作失败");
        }
      });
  },
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
