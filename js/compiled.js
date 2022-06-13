var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.createTemplateTagFirstArg=function(a){return a.raw=a};$jscomp.createTemplateTagFirstArgWithRaw=function(a,b){a.raw=b;return a};$jscomp.arrayIteratorImpl=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};$jscomp.arrayIterator=function(a){return{next:$jscomp.arrayIteratorImpl(a)}};$jscomp.makeIterator=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):$jscomp.arrayIterator(a)};
function displayContainerNotification(a,b){a=void 0===a?"Error al cargar productos":a;b=void 0===b?"initApp()":b;var c=document.getElementsByClassName("products-container")[0];console.log(c);c.innerHTML='<div class="notification error"><h3 style="text-align: center">'+a+'</h3>\n    <div class="btn-container"><button class="btn" onclick="'+b+'">Reintentar</button></div>\n    </div>'}
function displayFloatingNotification(a,b){a=void 0===a?"Notificaci\u00f3n":a;b=void 0===b?"info":b;notificationId="noti-"+new Date;document.getElementById("notification-container").innerHTML='<div class="notification floating-notification '+b+'" id="'+notificationId+'">\n        <h3 style="text-align: center">'+a+"</h3>\n    </div>";var c=document.getElementById(notificationId);setTimeout(function(){c.classList.add("hid-notification")},4E3)};function sortProducts(a){switch(a){case "nameAsc":orderByNameAsc();break;case "nameDesc":orderByNameDesc();break;case "priceAsc":orderByPriceAsc();break;case "priceDesc":orderByPriceDesc();break;default:getProducts(!0)}}function orderByNameAsc(){var a=JSON.parse(window.sessionStorage.getItem("productsStore")).sort(function(b,c){return b.name<c.name?-1:1});window.sessionStorage.setItem("productsStore",JSON.stringify(a));showProducts()}
function orderByNameDesc(){var a=JSON.parse(window.sessionStorage.getItem("productsStore")).sort(function(b,c){return b.name>c.name?-1:1});window.sessionStorage.setItem("productsStore",JSON.stringify(a));showProducts()}function orderByPriceAsc(){var a=JSON.parse(window.sessionStorage.getItem("productsStore")).sort(function(b,c){return b.price<c.price?-1:1});window.sessionStorage.setItem("productsStore",JSON.stringify(a));showProducts()}
function orderByPriceDesc(){var a=JSON.parse(window.sessionStorage.getItem("productsStore")).sort(function(b,c){return b.price>c.price?-1:1});window.sessionStorage.setItem("productsStore",JSON.stringify(a));showProducts()}function resetSorter(){document.getElementById("sorter-select").value="none"};var cartItems=[],totalCost=0,totalSavedMoney=0;function initCart(){var a=window.localStorage.getItem("cartItems");a&&(cartItems=JSON.parse(a));updateCartInfo()}
function updateCartInfo(){Array.from(totalCartDisplayers).forEach(function(b){b.innerHTML=cartItems.length;b.classList.add("animate");setTimeout(function(){b.classList.remove("animate")},600)});var a=cartItems.map(function(b,c){0<parseFloat(b.discount,10)?b.renderDiscount='<span class="discount">- %'+b.discount+"</span>":b.renderDiscount="";var e=JSON.parse(window.sessionStorage.getItem("categoriesStore"));b.categoryName="Sin categor\u00eda";e&&e.map(function(d){d.id==b.category&&(b.categoryName=
d.name)});b.url_image||(b.url_image="./img/no-image.svg");updateItemSubtotal(c);return'<tr>\n      <td class="product-delete"><button class="btn" onclick="deleteCartItem('+c+')"><i class="fas fa-trash"></i></button></td>\n      <td class="product-name">\n          '+b.name+' </br> &nbsp;<span class="category">'+b.categoryName+"</span> "+b.renderDiscount+'\n      </td>\n      <td><img src="'+b.url_image+'" alt="" /></td>\n      <td class="product-quantity">\n          <input min="1" max="100" type="number" name="'+
b.id+'" onfocus="() => {\n            setTimeout(function(){ that.selectionStart = that.selectionEnd = 10000; }, 0);\n          }"\n          class="cart-item-quantity" value="'+b.quantity+'" id="quantity-'+b.id+'" />\n      </td>\n      <td>$ '+b.price.toFixed(2)+'</td>\n      <td class="product-subtotal" name="'+b.id+'">$ '+b.subtotal.toFixed(2)+"</td>\n  </tr>"});document.getElementsByClassName("cart-items-container")[0].innerHTML=a.length?""+a.join(""):'<p style="text-align: center; width: 100%">Sin productos</p>';
updateTotals();listenCartItems();saveCartData()}
function addToCart(a,b,c){b=void 0===b?1:b;axios.get(BACKEND_URL+"/products/"+a,{mode:"no-cors",headers:{"Access-Control-Allow-Origin":"*"}}).then(function(e){e=e.data;e.quantity=parseFloat(b);isAdded=isProductAdded(a);0<=isAdded?(e.quantity=parseFloat(b,20)+parseFloat(cartItems[isAdded].quantity),cartItems[isAdded]=e):cartItems.push(e);displayFloatingNotification("\u00a1Producto agregado!","success");updateCartInfo()})["catch"](function(e){displayFloatingNotification("Error al agregar producto al carrito","error")})}
var addProductsToCart=function(a){var b=document.getElementById("request-quantity-"+a);addToCart(a,b.value)},isProductAdded=function(a){var b=-1;cartItems.map(function(c,e){c.id==a&&(b=e)});return b},totalCartDisplayers=document.getElementsByClassName("request-quantity-number");function saveCartData(){window.localStorage.setItem("cartItems",JSON.stringify(cartItems))}
function listenCartItems(){var a=document.getElementsByClassName("cart-item-quantity");if(a.length){a=$jscomp.makeIterator(a);for(var b=a.next();!b.done;b=a.next())b.value.addEventListener("input",function(c){updateCartItemQuantity(c.target.name,c.target.value)})}}function updateCartItemQuantity(a,b){cartItems.map(function(c,e){if(c.id==a){if(!b){b=0;var d=document.getElementById("quantity-"+a);d.value=b;d.focus()}c.quantity=parseInt(b,10);updateItemSubtotal(e);saveCartData()}})}
function updateItemSubtotal(a){var b=cartItems[a];b&&(b.savedMoney=parseFloat(b.price,10)*(parseFloat(b.discount,10)/100)*parseInt(b.quantity,10),b.subtotal=parseFloat(b.price,10)*parseFloat(b.quantity,10)-b.savedMoney,a=document.getElementsByClassName("product-subtotal"),Array.from(a).forEach(function(c){c.attributes.name.value==b.id&&(c.innerHTML="$ "+b.subtotal.toFixed(2))}),updateTotals())}
function updateTotals(){totalSavedMoney=totalCost=0;cartItems.map(function(a){0<a.subtotal&&(totalCost+=a.subtotal);0<a.savedMoney&&(totalSavedMoney+=a.savedMoney)});document.getElementsByClassName("total-cost")[0].innerHTML=totalCost.toFixed(2);document.getElementsByClassName("saved-money")[0].innerHTML=totalSavedMoney.toFixed(2)}function deleteCartItem(a){cartItems.splice(a,1);updateCartInfo()}
function pay(){var a=document.getElementsByClassName("cart-notification")[0];cartTableContainer=document.getElementsByClassName("cart-products")[0];cartActionsContainer=document.getElementsByClassName("cart-actions")[0];0<cartItems.length?(a.innerHTML='<lottie-player src="/img/lf30_editor_3nidetka.json" background="transparent" speed="0.7" style="width: 400px; max-width: 80vw; margin: auto" 1 autoplay></lottie-player>\n        <div class="notification"><h3 style="text-align: center">!Compra realizada exitosamente!</h3></div>\n        ',
cartItems=[],updateCartInfo(),cartTableContainer.style.display="none",cartActionsContainer.style.display="none"):a.innerHTML='<div class="notification"><h3 style="text-align: center">A\u00f1ada productos para realizar su compra</h3></div>';setTimeout(function(){a.innerHTML="";cartTableContainer.style.display="block";cartActionsContainer.style.display="flex";closeModalRequest();anchorLink()},4200)};function showCategories(a){a=a.map(function(b,c){return'<li class="category">\n            <a href="#" class="category-name category-'+b.id+'" onclick="filterByCategory('+b.id+')"> '+b.name+"</a>\n            </li>"});document.getElementsByClassName("list-categories")[0].innerHTML=a.join("")}
function getCategories(a){a=void 0===a?!1:a;axios.get(BACKEND_URL+"/categories",{mode:"no-cors",headers:{"Access-Control-Allow-Origin":"*"}}).then(function(b){a&&getProducts(!0);showCategories(b.data);b=JSON.stringify(b.data);window.sessionStorage.setItem("categoriesStore",b)})["catch"](function(b){displayFloatingNotification("Error al obtener categor\u00edas","error")})}function initCategories(){getCategories(!0)};var categoryActive=!1;
function filterByCategory(a){var b=document.getElementsByClassName("category-name");b=$jscomp.makeIterator(b);for(var c=b.next();!c.done;c=b.next())if(c=c.value,c.classList.contains("category-"+a)){var e=c.innerHTML.toUpperCase();c.classList.add("active");categoryActive=!0}else c.classList.remove("active");startProductsLoading();axios.get(BACKEND_URL+"/products/category/"+a,{mode:"no-cors",headers:{"Access-Control-Allow-Origin":"*"}}).then(function(d){var f=JSON.stringify(d.data);window.sessionStorage.setItem("productsStore",
f);showProducts();f=document.getElementsByClassName("filter-reset-container")[0];var g=document.getElementById("filter-results");f.classList.remove("hidden");g.innerHTML="Productos de "+e+': <br> <span style="font-size: 1rem">'+d.data.length+" productos encontrados</span>"})["catch"](function(d){console.error(d);displayContainerNotification("Error al filtrar por categor\u00eda "+e,"filterByCategory("+a+")")})["finally"](function(){endProductsLoading()})}
function resetCategories(){var a=document.getElementsByClassName("category-name");a=$jscomp.makeIterator(a);for(var b=a.next();!b.done;b=a.next())b.value.classList.remove("active"),categoryActive=!1};var displayProductsLimit=12;
function showProducts(a){a=void 0===a?!1:a;var b=JSON.parse(window.sessionStorage.getItem("productsStore")),c=JSON.parse(window.sessionStorage.getItem("categoriesStore"));displayProductsLimit=a?displayProductsLimit+12:12;a=document.getElementsByClassName("total-products-displayed")[0];a.innerHTML="Mostrando "+displayProductsLimit+" productos de "+b.length;var e=document.getElementsByClassName("btn-view-more")[0];displayProductsLimit>=b.length?(e.style.display="none",a.innerHTML="Mostrando "+b.length+
" productos de "+b.length):e.style.display="block";a=b.slice(0,displayProductsLimit).map(function(d,f){0<d.discount?(d.on_sale=!0,d.display_discount='\n      <div class="discount">\n        <p class="percentage">% '+d.discount+'</p>\n        <span class="">De descuento</span>\n      </div>\n      '):d.display_discount="";d.url_image||(d.url_image="./img/no-image.svg");d.category_name="Sin categor\u00eda";c.forEach(function(g){d.category==g.id&&(d.category_name=g.name)});return'\n    <div class="card card-product">\n    '+
d.display_discount+'\n    <div class="product-img-container">\n    <img src="'+d.url_image+'" alt="'+d.name+'" />\n    </div>\n    <div class="product-description-container">\n    <div class="product-title">\n        <h3>'+d.name+'</h3>\n        <span class="product-label product-label-category"\n        >'+d.category_name+'</span\n        >\n    </div>\n\n    <div class="product-price-container">\n        <span class="product-price">$ '+d.price.toFixed(2)+'</span>\n        <div class="btn-container">\n            <input type="number" min="1" max="100" id="request-quantity-'+
d.id+'" name="request-quantity-'+d.id+'"  class="request-quantity" value="1">\n            <button onclick="addProductsToCart('+d.id+')" class="btn btn-request-product"\n            ><i class="fa fa-cart-plus"></i></button>\n        </div>\n    </div>\n    </div>\n    </div>'});e=document.getElementsByClassName("products-container")[0];b.length?e.innerHTML=""+a.join(""):document.getElementById("input-products-filter").value.length?e.innerHTML="":e.innerHTML="No existen productos"}
function getProducts(a){a=void 0===a?!1:a;startProductsLoading();axios.get(BACKEND_URL+"/products",{mode:"no-cors",headers:{"Access-Control-Allow-Origin":"*"}}).then(function(b){b=JSON.stringify(b.data);window.sessionStorage.setItem("productsStore",b);showProducts();if(a){b=document.getElementsByClassName("filter-reset-container")[0];var c=document.getElementById("filter-results");b.classList.add("hidden");c.innerHTML="";resetSorter();resetCategories()}})["catch"](function(b){console.error(b);displayContainerNotification("Error al obtener productos",
btnAction="getProducts(true)")})["finally"](function(){endProductsLoading()})}function initProducts(){getCategories(!0)}function endProductsLoading(){var a=document.getElementsByClassName("products-container")[0];a.style.filter="opacity(1)";a.style.transform="scale(1)"}
function startProductsLoading(){document.getElementsByClassName("filter-reset-container")[0].classList.add("hidden");document.getElementsByClassName("products-container")[0].innerHTML='\n        <div class="loader-container" style="background-color: transparent; position: relative">\n            <div class="loader" data-aos="zoom-in" style="transition: all ease-in-out 0.4s 0.12s"></div>\n        </div>\n        \n    '}
function getOfferLoop(){setInterval(function(){axios.get(BACKEND_URL+"/offer",{mode:"no-cors",headers:{"Access-Control-Allow-Origin":"*"}}).then(function(a){var b=document.getElementsByClassName("banner-content")[0];a=a.data;a.url_image||(a.url_image="/img/logo-prueba.jpg");b.innerHTML=' <div class="banner-description">\n                 <h4>'+a.name+' con <span class="banner-discount">'+a.discount+'%</span> de descuento</h4>\n             </div>\n             <div class="img">\n                 <img src="'+
a.url_image+'" alt="" srcset="" />\n             </div> '})["catch"](function(a){console.error(a);displayFloatingNotification("Reconectando...","success")})["finally"](function(){})},7E3)};function anchorLink(a){a&&a.preventDefault();window.scrollTo({top:0,behavior:"smooth"})};document.addEventListener("touchstart",handleTouchStart,!1);document.addEventListener("touchmove",handleTouchMove,!1);var xDown=null,yDown=null;function openMenu(a){a&&a.preventDefault();if(document.querySelectorAll(".modal-closed")[0])return document.getElementsByClassName("menu")[0].style.right="0",0}function closeMenu(a){a&&a.preventDefault();document.getElementsByClassName("menu")[0].style.right="-100vw";return 0}function getTouches(a){return a.touches||a.originalEvent.touches}
function handleTouchStart(a){a=getTouches(a)[0];xDown=a.clientX;yDown=a.clientY}function handleTouchMove(a){if(xDown&&yDown){var b=xDown-a.touches[0].clientX;Math.abs(b)>Math.abs(yDown-a.touches[0].clientY)&&(0<b?openMenu():closeMenu());yDown=xDown=null}};var openModalRequestBtn=document.querySelectorAll(".open-modal-request-btn"),closeModalRequestBtn=document.querySelectorAll(".close-modal-request-btn")[0],modalRequestContainer=document.querySelectorAll(".modal-request-container")[0],modalContent=document.querySelectorAll("#modal-request-content")[0];function openModalRequest(){modalContent.classList.toggle("modal-closed");modalRequestContainer.classList.toggle("closed")}
function closeModalRequest(){modalContent.classList.toggle("modal-closed");setTimeout(function(){modalRequestContainer.classList.toggle("closed")},100)}openModalRequestBtn.forEach(function(a){a.addEventListener("click",function(b){b.preventDefault();openModalRequest()})});closeModalRequestBtn.addEventListener("click",function(a){a.preventDefault();closeModalRequest()});window.addEventListener("click",function(a){a.target==modalRequestContainer&&closeModalRequest()});function showFilteredProducts(a,b,c){b=void 0===b?"":b;c=void 0===c?!1:c;window.sessionStorage.setItem("productsStore",JSON.stringify(a));var e=a.length?a.slice(0,5).map(function(d,f){d.url_image||(d.url_image="./img/no-image.svg");return'<div class="quick-result-item prevent-hidden">\n            <div class="item-img prevent-hidden">\n            <img src="'+d.url_image+'" alt="'+d.name+'" class= q"prevent-hidden" />\n            </div>\n            <div class="item-info prevent-hidden">\n            <h4 class="item-name prevent-hidden">\n            '+
d.name+'\n            </h4>\n            <span class="item-category prevent-hi dden">Categor\u00eda</span>\n            </div>\n            <div class="item-price prevent-hidden">\n            <span class="prevent-hidden">$ '+d.price+'</span>\n            <button onclick="addToCart('+d.id+')" class="btn-add-results prevent-hidden">+</button>\n            </div>\n            </div>'}).join(""):'<span class="prevent-hidden" style="padding: 1rem 0; font-size: .8rem">(No se encontraron resultados)</span>';
document.getElementsByClassName("quick-results")[0].innerHTML="\n             "+e;c&&(document.getElementsByClassName("quick-results")[0].classList.add("hidden"),b.length?(showProducts(),resetCategories(),c=document.getElementsByClassName("filter-reset-container")[0],e=document.getElementById("filter-results"),c.classList.remove("hidden"),e.innerHTML='Resultados de:"'+b+'" <br> <span style="font-size: 1rem">'+a.length+" productos encontrados</span>"):getProducts(!0))}
var getFilteredProducts=function(a){a=void 0===a?!1:a;var b=document.getElementById("input-products-filter").value;a&&startProductsLoading();axios.post(BACKEND_URL+"/products/search?s="+b,{},{mode:"no-cors",headers:{"Access-Control-Allow-Origin":"*"}}).then(function(c){a?showFilteredProducts(c.data,b,!0):showFilteredProducts(c.data,b)})["catch"](function(c){console.error(c);document.getElementsByClassName("quick-results")[0].innerHTML='<span class="prevent-hidden" style="padding: 1rem 0; font-size: .8rem; color: dark-orange">(No se pudo obtener los productos del servidor)</span>'})["finally"](function(){})};
function initInteractionFilters(){var a=document.getElementById("input-products-filter"),b=document.getElementsByClassName("quick-results")[0];document.getElementsByTagName("body")[0].addEventListener("click",function(c){c.target.classList.contains("prevent-hidden")&&1<a.value.length?b.classList.remove("hidden"):(b.classList.add("hidden"),b.innerHTML="")});a.addEventListener("focusin",function(c){2<c.target.value.length?(b.classList.remove("hidden"),getFilteredProducts()):b.classList.add("hidden")});
a.addEventListener("input",function(c){"deleteContentBackward"===c.inputType&&""==c.target.value&&(categoryActive||getProducts(!0));2<c.target.value.length?(b.classList.remove("hidden"),getFilteredProducts()):(b.innerHTML="",b.classList.add("hidden"))});a.addEventListener("keyup",function(c){"Enter"==c.key&&getFilteredProducts(!0)})};var BACKEND_URL="https://desafiobsale.herokuapp.com";window.onload=function(){initApp();initProducts()};function initApp(){initInteractionFilters();initCart();connectToBackend();endLoading()}
function connectToBackend(){axios.get(BACKEND_URL+"/",{mode:"no-cors",headers:{"Access-Control-Allow-Origin":"*"}}).then(function(a){displayFloatingNotification("Conexi\u00f3n establecida","success");getOfferLoop()})["catch"](function(a){console.error(a);displayFloatingNotification("Reintentando Iniciar applicaci\u00f3n...","success");connectToBackend()})["finally"](function(){})}
function endLoading(){var a=document.getElementById("loader-container");a.style.visibility="hidden";a.style.opacity="0"}function startLoading(){var a=document.getElementById("loader-container");a.style.visibility="visible";a.style.opacity="1"};