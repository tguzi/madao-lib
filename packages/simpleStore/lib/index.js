import e,{useReducer as t,useCallback as r,useContext as n,createContext as a}from"react";import{__assign as o}from"tslib";export default function(c,u){var i=u.state,f=u.reducers,l=u.effects,s=a(null),p=function(a){var c=a.Context,u=a.namespace,i=a.state,f=a.reducers,l=a.effects;return[function(n){var a,o=n.children,s=t((function(e,t){var r=t.type,n=t.payload;return f&&f.hasOwnProperty(r)?f[r](e,n):e}),i),p=s[0],d=s[1],v=function(e,t){d({type:e,payload:t})},m=r((function(e,t){l&&l.hasOwnProperty(e)?l[e].call(null,t,v):f&&f.hasOwnProperty(e)&&d({type:e,payload:t})}),[]);return e.createElement(c.Provider,{value:(a={},a[u]=p,a.dispatch=m,a)}," ",o," ")},function(t){return function(r){var a=n(c),u=o(o({},r),a);return e.createElement(t,o({},u))}}]}({Context:s,namespace:c,state:i,reducers:f,effects:l}),d=p[0],v=p[1];return{Provider:d,Context:s,connect:v,useSimpleContext:function(){var e=n(s);return[e?e[c]:i,null==e?void 0:e.dispatch]}}}
//# sourceMappingURL=index.js.map
