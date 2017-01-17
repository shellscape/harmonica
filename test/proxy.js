'use strict';

// node 4.6.2, 5
// https://developer.mozilla.org/en-US/docs/Archive/Web/Old_Proxy_API#Examples
if (Proxy.create) {
  let handler = {
      get: function (target, name){
        return 1;
      }
    },
    p = Proxy.create(handler),
    q = p.foo;
}
// node > 5
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
else {
  let handler = {
      get: function (target, name){
        return name in target ? target[name] : 37;
      }
    },
    p = new Proxy({}, handler);

  p.a = 1;
  p.b = undefined;
}
