export default (vueElement, leaflet, events) => {
  for (var i = 0; i < events.length; i++) {
    const exposedName = 'e-' + events[i];
    const eventName = events[i];
    // console.log('leaflet',leaflet,'eventName',eventName);
    vueElement.esri[exposedName] = leaflet.on(eventName, (ev) => {
      vueElement.$emit(exposedName, ev);
    });
  }
}
