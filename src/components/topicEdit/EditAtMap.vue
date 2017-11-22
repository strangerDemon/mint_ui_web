<template>
  <div id='mapDiv'>
    <slot></slot>
    <div class="bottomButtons">
      <mt-button>
        <span class="direction goBack left" height="20" width="20" slot="icon"> 返回</span>
      </mt-button>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {
    mapState,
    mapGetters,
    mapActions,
    mapMutations
  } from 'vuex'
  import * as esriLoader from 'esri-loader'

  import {
    initTDTlLayers,
    getBaseMapTDT,
    getWebTiledLayer
  } from '@/api/esriLib/init'
  import {
    asmx
  } from '@/utils'
  const isEmptyObject = function (e) {
    for (let t in e)
      return !1;
    return !0
  }
  const events = [
    'basemap-change', 'before-unload', 'click', 'dbl-click', 'extent-change', 'key-down', 'key-up', 'layer-add',
    'layer-add-result', 'layer-remove', 'layer-reorder', 'layer-resume', 'layer-suspend', 'layers-add-result',
    'layers-removed', 'layers-reordered', 'load', 'mouse-down', 'mouse-drag', 'mouse-drag-end', 'mouse-drag-start',
    'mouse-move', 'mouse-out', 'mouse-over', 'mouse-up', 'mouse-wheel', 'pan', 'pan-end', 'pan-start', 'reposition',
    'resize', 'time-extent-change', 'unload', 'update-end', 'update-start', 'zoom', 'zoom-end', 'zoom-start',
  ];

  const props = {};
  export default {
    data() {
      return {
        esri: {},
        esriMap: {},
        editToolbar: {},
        queryExtent: {},
      }
    },
    computed: {
      autoTopicMapList() {
        return this.$store.state.mapInfo.topicEditList
      },
      topicMapId() {
        return this.$store.state.mapInfo.topicMapId;
      }
    },
    watch: {},
    created() {},
    mounted() {
      this.initMap()
    },
    methods: {
      init() {},
      initMap() {
        initTDTlLayers()
        esri.basemaps.tdt = getBaseMapTDT('Normal')
        let esriMap = new esri.Map('mapDiv', {
          center: [118.133988, 24.5698],
          zoom: 10,
          logo: false,
          slider: false,
        });
        esriMap.on("load", this.init);

        this.esriMap = esriMap
        //添加layers
        this.initLayer();
        this.addTopicMap();
        this.$store.commit('setMap', {
          map: esriMap
        })
      },
      //添加layers
      //添加国家的
      //添加厦门的
      initLayer() {
        let vm = this;
        let countryMapList = vm.addCountryLayerToMap();

        let mapList = [];
        let nodeList = [];
        asmx.post('getBaseMapPara').then(function (resp) {
          mapList = vm.listSortBy(resp, 'publishYear', 'desc');
          mapList = vm.listSortBy(mapList, 'istaglayer', 'asc');
          Array.from(mapList).forEach(function (layer) {
            if (layer.mapnature == 1) {
              let ly
              if (layer.maptype == 1) {
                ly = new esri.layers.ArcGISDynamicMapServiceLayer(layer.url);
              } else {
                ly = new esri.layers.ArcGISTiledMapServiceLayer(layer.url);
              }
              ly.id = layer.id;
              ly.show();
              vm.esriMap.addLayer(ly);
            }
            if (layer.istaglayer == 1) {
              nodeList.push({
                id: layer.id,
                nature: layer.mapnature
              });
            }
          });
          vm.$store.commit("setLayerList", {
            mapList: mapList,
            nodeList: nodeList,
            countryMapList: countryMapList
          });
        });
      },
      //时间排序
      listSortBy(arr, field, order) {
        let refer = [];
        let result = [];
        let index;
        order = order == 'asc' ? 'asc' : 'desc';
        for (let i = 0; i < arr.length; i++) {
          refer[i] = arr[i][field] + ':' + i;
        }
        refer.sort();
        if (order == 'desc') refer.reverse();
        for (let i = 0; i < refer.length; i++) {
          index = refer[i].split(':')[1];
          result[i] = arr[index];
        }
        return result;
      },
      addCountryLayerToMap() {
        let countryMap;
        let countryMapList = [];
        //矢量
        countryMap = new TdtVecWebTileLayer(); //矢量
        countryMap.id = "country_1";
        countryMap.show();
        this.esriMap.addLayer(countryMap);
        countryMapList.push(countryMap);

        countryMap = new TdtCvaWebTileLayer();
        countryMap.id = "country_node_1";
        countryMap.show();
        this.esriMap.addLayer(countryMap);
        countryMapList.push(countryMap);

        return countryMapList;
      },
      addTopicMap() {
        let vm = this
        vm.autoTopicMapList.forEach(function (layer) {
          console.log(layer, layer.id, vm.topicMapId, layer.id == vm.topicMapId)
          if (layer.id == vm.topicMapId) {
            let ly
            if (layer.mapType == 1) {
              ly = new esri.layers.ArcGISDynamicMapServiceLayer(layer.mapUrl);
            } else {
              ly = new esri.layers.FeatureLayer(layer.mapUrl);
              //ly = new esri.layers.ArcGISTiledMapServiceLayer(layer.mapUrl);
            }
            ly.id = layer.id;
            ly.show();
            vm.esriMap.addLayer(ly, "topicMap");
            return;
          }
        })
      }
    }
  }

</script>

<style>
  #mapDiv {
    height: 100%;
    width: 100%;
    margin: 0 0 0 0;
  }

  .direction {
    display: block;
    position: absolute;
    top: 51px;
    width: 19px;
    height: 19px;
    background: url("/static/img/slider.png") no-repeat 0 0;
    cursor: pointer;
  }

  .goBack {
    left: 8px;
    background-position: -22px -205px;
  }

  .goAhead {
    right: 8px;
    background-position: 6px -205px;
  }

  .bottomButtons {
    width: 100%;
    bottom: 10px;
    position: absolute;
    z-index: 9999;
  }

</style>
