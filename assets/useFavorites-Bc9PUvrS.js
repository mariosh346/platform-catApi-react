import{r}from"./index-B4a_Qms2.js";import{p as c}from"./parsers-Cp_Y0xt0.js";const a="favorites";function d(){const[o,s]=r.useState([]);return r.useEffect(()=>{const e=JSON.parse(localStorage.getItem(a)??"[]"),t=c(e);s(t)},[]),{favorites:o,addFavorite:e=>{const t=[...o,e];s(t),localStorage.setItem(a,JSON.stringify(t))},removeFavorite:e=>{const t=o.filter(i=>i.id!==e.id);s(t),localStorage.setItem(a,JSON.stringify(t))}}}export{d as u};
