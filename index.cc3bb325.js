let e;function t(){window.innerWidth<=768?function(){let e=document.querySelector(".display-mode--is-fixed");if(!e)return;let t=e.offsetHeight;document.body.style.paddingBottom=t+"px"}():document.body.style.paddingBottom="0"}Vue.createApp({data:()=>({bookmarks:[],filter:"",filteredBookmarks:[],selectedTag:"",searchTerm:"",displayMode:"grid"}),computed:{totalBookmarks(){return this.bookmarks.length},uniqueTags(){return Object.entries(this.bookmarks.reduce((e,t)=>(t.tags.split(",").forEach(t=>{let s=t.trim();e[s]=(e[s]||0)+1}),e),{})).map(([e,t])=>({name:e,count:t}))},isResetActive(){return""===this.selectedTag},isTagActive(){return e=>e===this.selectedTag},itemCount(){return this.filteredBookmarks.length},isGridDisplay(){return"grid"===this.displayMode},isListDisplay(){return"list"===this.displayMode}},watch:{filter:"searchBookmarks",searchTerm:"searchBookmarks"},mounted(){this.fetchData()},methods:{trimText:e=>e.length>46?e.slice(0,46)+"...":e,fetchData(){return fetch("./data.json").then(e=>e.json()).then(e=>{this.bookmarks=e,this.filteredBookmarks=e,this.parseURLParams()}).catch(e=>{throw console.error(e),e})},parseURLParams(){let e=new URLSearchParams(window.location.search).get("tag");e&&this.updateFilteredBookmarks(e)},updateFilteredBookmarks(e){this.filter=e,this.selectedTag=e,this.updateURLParams(),this.filterBookmarks()},filterBookmarks(){this.filteredBookmarks=this.bookmarks.filter(e=>this.isBookmarkMatch(e))},isBookmarkMatch(e){let{tags:t,title:s,link:i}=e,r=t.split(","),a=s.toLowerCase().includes(this.searchTerm.toLowerCase()),o=i.toLowerCase().includes(this.searchTerm.toLowerCase()),h=r.some(e=>e.trim()===this.filter.trim()),l=r.some(e=>e.trim()===this.selectedTag.trim());return this.filter&&this.selectedTag?(a||o)&&(h||l):this.filter?(a||o)&&h:this.selectedTag?(a||o)&&l:a||o},searchBookmarks(){""===this.searchTerm&&""===this.selectedTag?this.filteredBookmarks=this.bookmarks:this.filteredBookmarks=this.bookmarks.filter(e=>this.isBookmarkMatch(e))},resetFilter(){this.uniqueTags.forEach(e=>{e.isActive=!1}),this.selectedTag="",this.filter="",this.searchBookmarks(),this.updateURLParams()},updateURLParams(){let e=new URL(window.location.href);this.selectedTag?e.searchParams.set("tag",this.selectedTag):e.searchParams.delete("tag"),window.history.replaceState({},"",e)},setGridDisplay(){this.displayMode="grid"},setListDisplay(){this.displayMode="list"}}}).mount(".page"),t(),window.addEventListener("resize",function(){let s=this,i=arguments;clearTimeout(e),e=setTimeout(function(){t.apply(s,i)},250)});