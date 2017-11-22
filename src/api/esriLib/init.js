import * as esriLoader from 'esri-loader'

let tianDiTu = {
  Normal: {
    Map: "http://${subDomain}.tianditu.com/DataServer?T=vec_c&X=${col}&Y=${row}&L=${level}",
    Annotion: "http://${subDomain}.tianditu.cn/DataServer?T=cva_w&X=${col}&Y=${row}&L=${level}",
  },
  Satellite: {
    Map: "http://t{subDomain}.tianditu.cn/DataServer?T=img_w&X={col}&Y={row}&L={level}",

    Annotion: "http://t{subDomain}.tianditu.cn/DataServer?T=cia_w&X={col}&Y={row}&L={level}",
  },
  Terrain: {
    Map: "http://t{subDomain}.tianditu.cn/DataServer?T=ter_w&X={col}&Y={row}&L={level}",
    Annotion: "http://t{subDomain}.tianditu.cn/DataServer?T=cta_w&X={col}&Y={row}&L={level}",
  },
  subDomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
  copyright: "天地图-国家"
}

const tileInfo = {
  "rows": 256,
  "cols": 256,
  "compressionQuality": 0,
  "origin": {
    "x": -180,
    "y": 90
  },
  "spatialReference": {
    "wkid": 4326
  },
  "lods": [{ "level": 1, "resolution": 0.703125, "scale": 295497593.05875003 }, { "level": 2, "resolution": 0.3515625, "scale": 147748796.52937502 }, { "level": 3, "resolution": 0.17578125, "scale": 73874398.264687508 }, { "level": 4, "resolution": 0.087890625, "scale": 36937199.132343754 }, { "level": 5, "resolution": 0.0439453125, "scale": 18468599.566171877 }, { "level": 6, "resolution": 0.02197265625, "scale": 9234299.7830859385 }, { "level": 7, "resolution": 0.010986328125, "scale": 4617149.8915429693 }, { "level": 8, "resolution": 0.0054931640625, "scale": 2308574.9457714846 }, { "level": 9, "resolution": 0.00274658203125, "scale": 1154287.4728857423 }, { "level": 10, "resolution": 0.001373291015625, "scale": 577143.73644287116 }, { "level": 11, "resolution": 0.0006866455078125, "scale": 288571.86822143558 }, { "level": 12, "resolution": 0.00034332275390625, "scale": 144285.93411071779 }, { "level": 13, "resolution": 0.000171661376953125, "scale": 72142.967055358895 }, { "level": 14, "resolution": 8.58306884765625e-005, "scale": 36071.483527679447 }, { "level": 15, "resolution": 4.291534423828125e-005, "scale": 18035.741763839724 }, { "level": 16, "resolution": 2.1457672119140625e-005, "scale": 9017.8708819198619 }, { "level": 17, "resolution": 1.0728836059570313e-005, "scale": 4508.9354409599309 }, { "level": 18, "resolution": 5.3644180297851563e-006, "scale": 2254.4677204799655 }, { "level": 19, "resolution": 2.682209014892578E-6, "scale": 1127.2338602399827 }, { "level": 20, "resolution": 1.341104507446289E-6, "scale": 563.61693011999137 }]
}

export const getWebTiledLayer = function (mapType) {
  return new esri.layers.WebTiledLayer(tianDiTu[mapType].Map, {
    id: mapType,
    subDomains: tianDiTu.subDomains,
    copyright: tianDiTu.copyright,
    // initialExtent :new esri.geometry.Extent(117.882220756,24.422481324,118.454166203,24.907266363,new esri.SpatialReference({wkid:4326}))
  });

}





export const getBaseMapTDT = function (mapType) {
  var urlTemplate = tianDiTu[mapType].Map;
  var type = urlTemplate.substr(urlTemplate.indexOf("T=") + 2, 3);
  var layer = new esri.layers.WebTiledLayer(urlTemplate, {
    subDomains: tianDiTu.subDomains,
    copyright: tianDiTu.copyright
  });
  var layerAnnotion = new esri.layers.WebTiledLayer(tianDiTu[mapType].Annotion, {
    subDomains: tianDiTu.subDomains,
    copyright: tianDiTu.copyright
  });
  return {
    baseMapLayers: [layer, layerAnnotion],
    title: mapType === 'Normal' ? '矢量' : '影像',
    thumbnailUrl: "http://t6.tianditu.cn/DataServer?T=" + type + "_w&X=3392&Y=1758&L=12"
  }
}



export const initTDTlLayers = function () {
  /*
      国家矢量地图服务
  */
  dojo.declare("TdtVecWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      return "http://t" + row % 8 + ".tianditu.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
    }
  });

  /*
      国家矢量注记地图服务
  */
  dojo.declare("TdtCvaWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      return "http://t" + row % 8 + ".tianditu.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";

    }
  });

  /*
      国家影像地图服务
  */
  dojo.declare("TdtImgWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      return "http://t" + row % 8 + ".tianditu.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
    }
  });

  /*
      国家影像注记地图服务
  */
  dojo.declare("TdtCiaWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      return "http://t" + row % 8 + ".tianditu.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
    }
  });

  /*
      国家晕渲地图服务
  */
  dojo.declare("TdtTerWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      return "http://t" + row % 8 + ".tianditu.cn/ter_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
    }
  });

  /*
      国家晕渲注记地图服务
  */
  dojo.declare("TdtCtaWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      return "http://t" + row % 8 + ".tianditu.cn/cta_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=c&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=tiles";
    }
  });

  /*
      福建天地图服务
  */
  dojo.declare("FjImgWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      //http://service.fjmap.net/fujian_ter_20131220/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=fujian_ter_20131220&STYLE=fujian_ter_20131220&TILEMATRIXSET=Matrix_0&TILEMATRIX=14&TILEROW=2979&TILECOL=13567&FORMAT=image%2Fpng
      var url = "http://service.fjmap.net/fujian_ter_20131220/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=fujian_ter_20131220&STYLE=fujian_ter_20131220&TILEMATRIXSET=Matrix_0&TILEMATRIX=" + level + "&TILEROW=" + row + "&TILECOL=" + col + "&FORMAT=image%2Fpng";
      return url;
    }
  });

  /*
      水印图层
  */
  dojo.declare("watermarkWebTileLayer", esri.layers.TiledMapServiceLayer, {
    constructor: function () {
      this.spatialReference = new esri.SpatialReference({
        wkid: 4326
      });
      this.initialExtent = (this.fullExtent = new esri.geometry.Extent(-180.0, -90.0, 180.0, 90.0, this.spatialReference));
      this.tileInfo = new esri.layers.TileInfo(tileInfo);

      this.loaded = true;
      this.onLoad(this);
    },

    getTileUrl: function (level, row, col) {
      return "img/map/watermaker.png"
    }
  });
}

export const createMap = function (self) {
  var me = self;
  esriLoader.dojoRequire([
    'esri/map',
    "esri/layers/WebTiledLayer",
    "esri/basemaps",
    "esri/dijit/BasemapToggle",

  ], (Map, WebTiledLayer, esriBasemaps, BasemapToggle) => {
    esriBasemaps.tdt = getBaseMapTDT(WebTiledLayer, "Normal")

    let esriMap = new Map('mapDiv', {
      center: [118, 24.5],
      zoom: 8,
      basemap: "tdt",
      logo: false
    });

    esri.setMap(esriMap);

  });
}
