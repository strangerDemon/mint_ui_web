export default {
  methods: {
    graphicPosition(geometry, geometryType, expand = '3') {
      let extent
      let spatialReference = this.esriMap.spatialReference
      if(geometry==null){
        return ;
      }
      geometry.spatialReference = spatialReference
      //新建一个临时图层
      this.$store.commit('ESRI_SET_ACTIVE_LAYER',"themeExclusive")
      switch (geometryType) {
        case "esriGeometryPoint":
        case 'point':
          this.esriMap.centerAndZoom(new esri.geometry.Point(geometry, spatialReference), 18)
          var myPoint = {
            "geometry": geometry,
            "symbol": {
              "color": [255, 0, 0, 50],
              "size": 85,
              "angle": 0,
              "xoffset": 0,
              "yoffset": 0,
              "type": "esriSMS",
              "style": "circle",
              "outline": {
                "color": [1, 60, 20, 200],
                "width": 1,
                "type": "esriSLS",
                "style": "esriSLSSolid"
              }
            },
          };

          this.activeLayer && this.activeLayer.add(new esri.Graphic(myPoint));

          break;
        case 'esriGeometryPolygon':
        case 'polygon':
          extent = esri.geometry.Polygon(geometry).getExtent()
          this.esriMap.setExtent(extent.expand(expand), true)

          var pg = new esri.geometry.Polygon(this.esriMap.spatialReference);
          pg = esri.geometry.Polygon(geometry)
          var fillSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([255, 0, 0]), 2), new dojo.Color([102, 195, 255, 0.3]));
          this.activeLayer && this.activeLayer.add(new esri.Graphic(pg, fillSymbol));

          break;
        case "esriGeometryPolyline":
        case "polyline":
          extent = esri.geometry.Polyline(geometry).getExtent()
          this.esriMap.setExtent(extent.expand(expand), true)


          console.log(geometry);

          var pl = new esri.geometry.Polyline(this.esriMap.spatialReference);
          pl = esri.geometry.Polyline(geometry)
          var symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 10);
          this.activeLayer && this.activeLayer.add(new esri.Graphic(pl, symbol));
          break;
        default:
          break;
      }
    },
    doEditGraphic(graphic) {
      // console.log('doEditGraphic',graphic);
      if (graphic.geometryType !== "point") {
        this.editToolbar.activate(esri.toolbars.Edit.EDIT_VERTICES, graphic);
      } else {
        this.$message('新增对象不支持右键操作')
      }
    },

    doEditAttr(flag) {
      this.$store.commit('SHOW_THEME_EDIT', flag)
    }
  }
};
