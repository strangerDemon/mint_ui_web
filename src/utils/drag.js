import { on, off } from '@/utils/dom';
export default {
  bind: function (el, binding, vnode) {
    // console.log('bind-drag',el);
    //做绑定的准备工作
    //比如添加事件监听器，或是其他只需要执行一次的复杂操作
    let elmName = binding.value.dragElm;
    let elm = vnode.context.$refs[elmName].$el
    let l, t
    elm = !elm ? vnode.context.$refs[elmName] : elm
    // log('drag',elm)
    const mousemove = function (e) {
      el.style.position = "fixed"
      el.style.left = e.clientX - l + 'px';
      el.style.top = e.clientY - t + 'px';
    }
    const mouseup = function (e) {
      off(document, 'mousemove', mousemove)
      off(elm, 'mouseup', mouseup)
    }
    const mousedown = function (e) {
      // console.log('mousedown', e)
      l = e.clientX - el.offsetLeft;
      t = e.clientY - el.offsetTop;
      on(document, 'mousemove', mousemove)
      on(elm, 'mouseup', mouseup)
    }

    //  on(elm, 'click', function(){
    //   // el.style.display= 'none'
    //   console.log('vnode.el',el);
    //  });
    on(elm, 'mousedown', mousedown);
  },
  inserted: function () {
    //...
  },
  update: function () {
    //根据获得的新值执行对应的更新
    //对于初始值也会调用一次
  },
  componentUpdated: function () {
    //...
  },
  unbind: function () {
    // console.log('unbind:比如移除bind时绑定的事件监听器');
    //做清理操作
    //比如移除bind时绑定的事件监听器
  }

}
