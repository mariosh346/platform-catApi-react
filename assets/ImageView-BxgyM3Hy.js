import{r as s,u as y,a as M,b as k,j as t}from"./index-B4a_Qms2.js";import{M as C}from"./Modal-045I_77L.js";import{u as S}from"./useFavorites-Bc9PUvrS.js";import{p as E}from"./parsers-Cp_Y0xt0.js";import{a as w}from"./catApi-Bkpp4f2E.js";function P(){const[e,c]=s.useState(null),[p,l]=s.useState(!0),[m,h]=s.useState(null),n=y(),r=M(),{imageId:i}=k(),{addFavorite:F,removeFavorite:b,favorites:d}=S(),u=s.useCallback(()=>{const a=typeof r.state=="object"&&r.state&&"image"in r.state?r.state.image:void 0;if(a)try{const[o]=E([a]);c(o);return}catch(o){console.error("Invalid state data:",o)}},[r.state]),g=s.useCallback(async a=>{try{const o=await w(a);c(o)}catch(o){console.error("Failed to fetch image:",o),h("Failed to load image"),n("/")}},[n]),f=s.useCallback(async()=>{i&&(l(!0),u(),e||await g(i),l(!1))},[g,u,i]);s.useEffect(()=>{f()},[i,f]);const x=()=>{n(-1)},v=s.useMemo(()=>e?d.some(a=>a.id===e.id):!1,[e,d]),j=s.useMemo(()=>m??!e?"Error loading image":void 0,[m,e]),I=a=>{v?b(a):F(a)};return t.jsx(C,{onClose:x,isLoading:p,error:j,children:e&&t.jsxs(t.Fragment,{children:[t.jsx("img",{src:e.url,alt:"cat",className:"w-full"}),e.breeds&&e.breeds.length>0?t.jsxs(t.Fragment,{children:[t.jsx("h3",{children:e.breeds[0].name}),t.jsx("p",{children:e.breeds[0].description})]}):t.jsx("p",{children:"No breed info available"}),t.jsx("button",{type:"button",onClick:()=>{I(e)},children:v?"Remove from Favourites":"Mark as Favourite"})]})})}export{P as default};
