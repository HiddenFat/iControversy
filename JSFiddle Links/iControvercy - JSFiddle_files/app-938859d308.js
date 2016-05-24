(function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}},s=function(t,e){function s(){this.constructor=t}for(var r in e)n.call(e,r)&&(t[r]=e[r]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},n={}.hasOwnProperty;t=function(){function t(){}return t.prototype.forEach=function(t,e,s){var n,r;for(null==s&&(s=this),n=0,r=[];n<t.length;)e.call(s,t[n],n,t),r.push(n++);return r},t.prototype.pushMessage=function(t,e){return null==e&&(e={}),window.parent.postMessage([t,e],"*")},t.prototype.addEvent=function(t,e,s,n){return null==n&&(n=!1),t.addEventListener(e,s,n)},t.prototype.setStyles=function(t,e){var s,n;n=[];for(s in e)n.push(t.style[s]=e[s]);return n},t}(),this.App=function(t){function n(t){this.applyTranslations=e(this.applyTranslations,this),this.moveScreenTo=e(this.moveScreenTo,this),this.setDetailsHeight=e(this.setDetailsHeight,this),this.setListHeight=e(this.setListHeight,this),this.markReadItems=e(this.markReadItems,this),this.countUnreadItems=e(this.countUnreadItems,this),this.getCurrentIds=e(this.getCurrentIds,this),this.setReadIds=e(this.setReadIds,this),this.getStorageKey=e(this.getStorageKey,this),this.setupDefaults=e(this.setupDefaults,this),this.options=t,this.elements={logItems:document.querySelectorAll(".logItem"),backLinks:document.querySelectorAll(".back"),logListCont:document.querySelector(".logListCont"),logDetailsItem:document.querySelectorAll(".logDetailsItem"),innercont:document.querySelector(".innercont"),title:document.querySelector("h3"),readMore:document.querySelector(".link a")},this.storageKey,this.currentCount,this.readIds,this.setupDefaults()}return s(n,t),n.prototype.setupDefaults=function(){var t,e,s,n;for(this.forEach(this.elements.logItems,function(t){return function(e,s,n){return t.addEvent(e,"click",function(n){return n.stopPropagation(),n.preventDefault(),t.moveScreenTo(-300),t.setDetailsHeight(s),t.currentCount>=0&&!e.dataset.read&&t.readIds.indexOf(e.dataset.id)<0&&(t.currentCount=t.currentCount-1,t.setReadIds(e.dataset.id),t.markReadItems()),t.pushMessage("setBadge",{counter:t.currentCount,softHide:!0})})}}(this)),n=this.elements.backLinks,t=0,e=n.length;e>t;t++)s=n[t],this.addEvent(s,"click",function(t){return function(e){return e.stopPropagation(),e.preventDefault(),t.moveScreenTo(0),t.setListHeight()}}(this));return this.setListHeight(),this.elements.logItems.length>0?this.addEvent(window,"message",function(t){return function(e){var s,n;return n=e.data[0],s=e.data[1],"restore"===n&&(t.moveScreenTo(0),t.setListHeight()),"ready"===n?(t.storageKey=s.host,t.currentCount=t.countUnreadItems(),t.readIds=t.getReadIds(),t.markReadItems(),s.options.translations&&t.applyTranslations(s.options.translations),t.pushMessage("widgetReady",{counter:t.currentCount,softHide:!0,options:t.options})):void 0}}(this)):void 0},n.prototype.getStorageKey=function(){var t;return t=this.storageKey.replace(/\./gi,"_"),"HW_readItems["+t+"]"},n.prototype.setReadIds=function(t){var e;return this.readIds.push(t),e=this.readIds.join(","),window.localStorage.setItem(this.getStorageKey(),e)},n.prototype.getReadIds=function(){var t;return t=window.localStorage[this.getStorageKey()],t=t?null!=t?t.split(","):void 0:[]},n.prototype.getCurrentIds=function(){var t;return t=Array.prototype.slice.call(this.elements.logItems),t.map(function(t){return t.dataset.id})},n.prototype.countUnreadItems=function(){var t,e,s,n,r,o,i;for(e=0,n=this.getReadIds(),t=this.getCurrentIds(),s=t.map(function(t){return n.indexOf(t)>=0}),o=0,i=s.length;i>o;o++)r=s[o],r||(e+=1);return e},n.prototype.markReadItems=function(){var t,e,s,n,r,o;if(this.getReadIds().length>0){for(r=this.getReadIds(),o=[],s=0,n=r.length;n>s;s++)t=r[s],t?(e=document.querySelector("*[data-id='"+t+"']"),o.push(null!=e?e.dataset.read=!0:void 0)):o.push(void 0);return o}},n.prototype.setListHeight=function(){return this.pushMessage("setHeight",{height:this.elements.logListCont.offsetHeight})},n.prototype.setDetailsHeight=function(t){var e,s,n,r;for(r=this.elements.logDetailsItem,s=0,n=r.length;n>s;s++)e=r[s],this.setStyles(e,{display:"none"});return this.setStyles(this.elements.logDetailsItem[t],{display:"block"}),this.pushMessage("setHeight",{height:this.elements.logDetailsItem[t].offsetHeight})},n.prototype.moveScreenTo=function(t){return this.setStyles(this.elements.innercont,{left:t+"px"})},n.prototype.applyTranslations=function(t){var e,s,n,r;if(null!=t.title&&(this.elements.title.textContent=t.title),null!=t.labels){s=t.labels;for(e in s)r=s[e],this.forEach(document.querySelectorAll(".label."+e),function(t){return t.textContent=r})}return null!=t.readMore&&null!=(n=this.elements.readMore)?n.textContent=t.readMore:void 0},n}(t)}).call(this);