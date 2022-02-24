// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/utils/carouselGenerator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselGenerator = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CarouselGenerator = /*#__PURE__*/_createClass(function CarouselGenerator(sliderId, slidesData) {
  var _this = this;

  var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  _classCallCheck(this, CarouselGenerator);

  _defineProperty(this, "renderSlides", function (slideCarousel, slideCSS) {
    _this.slideCSS = slideCSS;
    _this.slider = document.createElement('div');

    _this.slider.classList.add(slideCarousel); // this.slider.innerHTML = 'oioioioioioioioioi'


    _this.sliderContainer.appendChild(_this.slider);

    _this.slider = _this.sliderContainer.querySelector(".".concat(slideCarousel)); /////////////////// type of render based on html temple and data needs    

    _this.renderType == 1 && _this.renderType1();
    _this.renderType == 2 && _this.renderType2(); ///////////////////

    if (_this.slideChangeType === 'linear') {
      _this.slider.querySelectorAll('.place-card').forEach(function (slide, i) {
        var slideAmount = "".concat(i * _this.slideLinearValue, "%");
        slide.style.left = slideAmount;
      });
    } ///////////////////////


    if (_this.automatic) {
      setInterval(function () {
        _this.sliderActionInfinite(_this.sliderContainer);
      }, _this.interval);
    }
  });

  _defineProperty(this, "renderType1", function () {
    _this.slider.innerHTML = _this.slides.map(function (slide, index) {
      var id = slide.id,
          place = slide.place,
          title = slide.title,
          img = slide.img,
          alt = slide.alt;
      var position = "next";
      var hideSlide = '';

      if (_this.slideIndex == 0) {
        if (index == 0) position = "active";
        if (index == _this.slides.length - 1) position = "last";
      }

      if (_this.slideIndex > 0 && index == _this.slideIndex - 1) position = "last";
      if (_this.slideIndex > 0 && index == _this.slideIndex) position = "active";

      if (index >= _this.slidesDisplayNumber) {
        hideSlide = "hide-slide";
      }

      return "\n             <article class=\"".concat(!_this.hasBtn ? "onSlide" : '', " ").concat(_this.slideCSS, " ").concat(position, " ").concat(hideSlide, "\" data-id=\"").concat(id, "\">\n                <p class=\"country-name\">").concat(place, "</p>\n                <img src=\"").concat(img, "\" alt=\"").concat(alt, "\" class=\"country-map\">\n                <h2 class=\"country-title\">").concat(title, "</h2>\n                <div class=\"underline\"></div>\n                <a href=\"#gallery\"><p class=\"gallery-card\"><i class=\"far fa-images gallery-card-icon\"></i>Gallery</p></a>\n                <a href=\"#journal\"><p class=\"journal-card\" ><i class=\"fas fa-book diary-card-icon\"></i>Diary</p></a>\n            </article>\n            ");
    }).join('');
  });

  _defineProperty(this, "renderType2", function () {
    var tempItem;
    Object.values(_this.slides).forEach(function (item) {
      var render = function render() {
        _this.slider.innerHTML = tempItem.gallery.map(function (slide, index) {
          var img = slide.img,
              imgDate = slide.imgDate,
              imgPlace = slide.imgPlace,
              alt = slide.alt;
          var position = "next";
          var hideSlide = '';

          if (_this.slideIndex == 0) {
            if (index == 0) position = "active";
            if (index == item.gallery.length - 1) position = "last";
          }

          if (_this.slideIndex > 0 && index == _this.slideIndex - 1) position = "last";
          if (_this.slideIndex > 0 && index == _this.slideIndex) position = "active";

          if (_this.slidesDisplayNumber > 0 && index == _this.slidesDisplayNumber) {
            hideSlide = "hide-slide";
          }

          return "\n                <article class=\" slide ".concat(!_this.hasBtn && "onSlide", " ").concat(_this.slideCSS, " ").concat(position, " ").concat(hideSlide, "\">\n                <img src=\"").concat(img, "\" class=\"img-slide \" alt=\"").concat(alt, "\"></img>\n                <span class=\"photo-number\">").concat(index + 1, "/").concat(item.gallery.length, "</span>\n                <span class=\"photo-place\">").concat(imgPlace, "</span>\n                </article>\n                ");
        }).join('');
      };

      if (item.id == _this.slideGroupId && _this.slideGeneralDataMap === false) {
        tempItem = item;
        render();
        return;
      }

      if (_this.slideGeneralDataMap === true) {
        tempItem = item;
        render();
        return;
      }
    });
  });

  _defineProperty(this, "slideChangeOnClick", function () {
    _this.changeType = "onClick"; //action change on slide is default: IMPORTANT slides must have a "slide" class

    var changerClass = "onSlide"; // if action change is on btns sets 'slide-btn' as default: IMPORTANT btns must have a "slide-btn" class

    _toConsumableArray(_this.sliderContainer.children).forEach(function (children) {
      if (children.classList.contains('slide-btn')) {
        _this.hasBtn = true;
        changerClass = "slide-btn";
      }
    }); //add eventListener to slides or btn


    _this.slidesDom = _toConsumableArray(_this.sliderContainer.getElementsByClassName("".concat(changerClass)));

    _this.slidesDom.forEach(function (slide) {
      slide.addEventListener('click', function (e) {
        // call slide action based on type of change:
        if (_this.slideChangeType === "infinite") {
          _this.sliderActionInfinite(e.target);
        }

        if (_this.slideChangeType === "linear") {
          _this.sliderActionLinear(e.target);
        }
      });
    });
  });

  _defineProperty(this, "slideChangeOnScroll", function () {
    _this.changeType = "onScroll"; //action change on slide is default: IMPORTANT slides must have a "onSlide" class

    var changerClass = "onSlide";
    _this.slidesDom = _toConsumableArray(_this.sliderContainer.getElementsByClassName("".concat(changerClass)));

    _this.slider.addEventListener('wheel', function (e) {
      // call slide action based on type of change:
      if (_this.slideChangeType === "infinite") {
        _this.sliderActionInfinite(e);
      }

      if (_this.slideChangeType === "linear") {
        _this.sliderActionLinear(e);
      }
    });
  });

  _defineProperty(this, "sliderActionInfinite", function (target) {
    var condition;

    if (_this.changeType === "onClick") {
      var onClickCondition = target.classList.contains('prev-btn');
      condition = onClickCondition;
    }

    if (_this.changeType === "onScroll") {
      var onScrollCondition = target.deltaY > 0;
      condition = onScrollCondition;
    } //left-right diretion change


    if (condition) {
      var active = _this.slider.querySelector('.active');

      var last = _this.slider.querySelector('.last');

      var next = last.previousElementSibling;

      if (!next) {
        next = _this.slider.lastElementChild;
      }

      active.classList.remove(['active']);
      active.classList.add(['next']);
      last.classList.remove(['last']);
      last.classList.add(['active']);
      next.classList.remove(['next']);
      next.classList.add(['last']);
    } // single direction change / if "next-btn" right-left change
    else {
      var _active = _this.slider.querySelector('.active');

      var _last = _this.slider.querySelector('.last');

      var _next = _active.nextElementSibling;

      if (!_next) {
        _next = _this.slider.firstElementChild;
      }

      _active.classList.remove(['active']);

      _active.classList.add(['last']);

      _last.classList.remove(['last']);

      _last.classList.add(['next']);

      _next.classList.remove(['next']);

      _next.classList.add(['active']);
    }
  });

  _defineProperty(this, "sliderActionLinear", function (e) {
    var numberOfSlidesToShow = _this.slidesDisplayNumber;

    if (e.parentElement.classList.contains('next-btn')) {
      _this.counter++;

      if (_this.counter >= 1 && _this.counter < _this.slides.length - numberOfSlidesToShow) {
        console.log(e.parentElement);
        e.parentElement.disabled = false;
        _this.slidesDom[0].disabled = false;
      } else {
        e.parentElement.disabled = true;
        _this.slidesDom[0].disabled = false;
      }
    }

    if (e.parentElement.classList.contains('prev-btn')) {
      _this.counter--;

      if (_this.counter >= 1 && _this.counter < _this.slides.length - numberOfSlidesToShow) {
        console.log(e.parentElement);
        e.parentElement.disabled = false;
        _this.slidesDom[1].disabled = false;
      } else {
        e.parentElement.disabled = true;
        _this.slidesDom[1].disabled = false;
      }
    }

    _this.slider.querySelectorAll('.place-card').forEach(function (slide, index) {
      if (index > numberOfSlidesToShow - 1 + _this.counter || index < _this.counter) {
        slide.classList.add("hide-slide");
      } else {
        slide.classList.remove("hide-slide");
      }

      slide.style.transform = "translateX(-".concat(_this.counter * _this.slidesLinearTranslation, "%)  ");
      slide.addEventListener('mouseover', function () {
        slide.style.transform = "translateX(-".concat(_this.counter * _this.slidesLinearTranslation, "%) scale(1.025)");
      });
      slide.addEventListener('mouseout', function () {
        slide.style.transform = "translateX(-".concat(_this.counter * _this.slidesLinearTranslation, "%) scale(1)  ");
      });
    });
  });

  this.sliderContainer = document.getElementById(sliderId);
  this.slides = slidesData;
  this.slidesDom; // created when slidesChangeOnClick || slidesChangeOnScroll are called

  this.slidesDisplayNumber = 1;
  this.slideIndex = 0;
  this.slideGroupId;
  this.slider; // create at renderSlides() - inner Container

  this.slideCSS; // passed in renderSlides()

  this.slideGeneralDataMap = true; // default

  this.slidesDisplayNumber = 1; // number of slides displayed on carousel per time : can be 1; 2; 3; 4; 5

  this.slideLinearValue = 100; // default

  this.slidesLinearTranslation = 100; //default value for single slide displayed | two = 104.2 | three = 103.25 | four = 106.5

  this.changeType; // set by type of change: "onClick" || "onScroll"

  this.slideChangeType = "infinite"; // default || "linear"

  this.hasBtn = false;
  this.sliderAction;
  this.counter = 0;
  this.interval = interval;
  this.automatic = interval === 0 ? false : true;
  this.renderType;
} //render slides without next buttons: change occur by click on image
//new possible ways for slide actions: ie. linear carousel
// for futher code...
); //*************************************************************************//
//*************************************************************************//
//*************************************************************************//
//*************************************************************************//
//*************************************************************************//

/*
////// copy of both carousel types: before merge attemp : delete if merge is usesfull
 class PhotoCarouselGenerator {
    constructor(sliderId, slidesData, interval = 0){
        this.sliderContainer = document.getElementById(sliderId)
        this.slides = slidesData
        this.slideCarousel;
        this.slidesDom; // created when slidesChangeOnClick || slidesChangeOnScroll are called
        this.slidesDisplayNumber = 1
        this.slideIndex = 0
        this.slideGroupId = 0
        this.slideGeneralDataMap = true
        this.slider // create at renderSlides() - inner Container
        this.slideCSS // passed in renderSlides()
        
        this.interval = interval
        this.automatic = this.interval == 0 ? false : true
        
        this.changeType // set by type of change: "onClick" || "onScroll"
        this.slideChangeType = "infinite" // default || "linear"
        this.slideLinearValue = 100; // default
        this.hasBtn = false
        this.sliderAction;

        this.counter = 0    
        //if no interval or ZERO is passed the automatic change is disable
        this.automatic = (interval == 0) ? false: true
    }
    //render slides without next buttons: change occurs by click on image
    renderSlides = (slideCarousel, slideCSS) =>{
        this.slideCSS = slideCSS
        this.slideCarousel = 
        this.slider = document.createElement('div')
        this.slider.classList.add(slideCarousel)
        this.sliderContainer.appendChild(this.slider)

        this.slider = this.sliderContainer.querySelector(`.${slideCarousel}`)
        

        Object.values(this.slides).forEach(item=>{
            
            let tempItem = item
            
            if(item.id == this.slideGroupId && !this.slideGeneralDataMap ){
                tempItem = item 
                console.log('from restrict map')
            }
            this.slider.innerHTML = item.gallery.map((slide,index) =>{
            const {img, imgDate, imgPlace, alt} = slide;
            let position = "next"
            let hideSlide = ''
            if(this.slideIndex == 0){
                if(index == 0) position = "active"
                if(index == item.gallery.length-1) position = "last"
            }
            
            if(this.slideIndex > 0 && index == this.slideIndex-1) position = "last"
            if(this.slideIndex > 0 && index == this.slideIndex) position = "active"
            
            if(this.slidesDisplayNumber > 1 && index == this.slidesDisplayNumber){
                hideSlide = "hide-slide"
            }

            return `
             <article class=" slide ${!this.hasBtn && "onSlide"} ${this.slideCSS} ${position} ${hideSlide}">
            <img src="${slide.img}" class="img-slide " alt="${alt}"></img>
            <span class="photo-number">${index+1}</span>
            </article>
            `
        }).join('')
            // }
        })
        
        
///////////////////
        if(this.slideChangeType === 'linear'){
            this.slider.querySelectorAll('.place-card').forEach((slide,i)=>{
                let slideAmount = `${i*this.slideLinearValue}%` 
                slide.style.left = slideAmount
                
            })
        }
///////////////////////
        if(this.automatic){
            // console.log(this.automatic);
            setInterval(()=>{
                this.sliderActionInfinite(this.sliderContainer)
            },this.interval)
        }
}
    
    slideChangeOnClick = () =>{
        this.changeType = "onClick"
        //action change on slide is default: IMPORTANT slides must have a "slide" class
        let changerClass = "onSlide";
        
        // if action change is on btns sets 'slide-btn' as default: IMPORTANT btns must have a "slide-btn" class
        [...this.sliderContainer.children].forEach(children =>{
            if(children.classList.contains('slide-btn')){
                this.hasBtn = true
                changerClass = "slide-btn"
            }
        });

        //add eventListener to slides or btn
        this.slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]
        
            this.slidesDom.forEach(slide=>{
                slide.addEventListener('click', (e)=>{
             // call slide action based on type of change:
                if(this.slideChangeType === "infinite"){
                this.sliderActionInfinite(e.target)
                }
                if(this.slideChangeType === "linear"){
                this.sliderActionLinear(e.target)
                }
                
            })
        })
    }

    //slide change on scroll
    slideChangeOnScroll = ()=>{
        this.changeType = "onScroll"
        //action change on slide is default: IMPORTANT slides must have a "onSlide" class
        let changerClass = "onSlide";

        this.slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]

            this.slider.addEventListener('wheel', (e)=>{
                
                // call slide action based on type of change:
                if(this.slideChangeType === "infinite"){
                this.sliderActionInfinite(e)
                }
                if(this.slideChangeType === "linear"){
                this.sliderActionLinear(e)
                }
        })
    }
    
/////////////////
sliderActionInfinite = (target) =>{
        let condition;
        
        if(this.changeType === "onClick"){
            let onClickCondition = target.classList.contains('prev-btn');
            condition = onClickCondition    
        }
        if(this.changeType === "onScroll"){
            let onScrollCondition = target.deltaY > 0;
            condition = onScrollCondition    
        }
                
        //left-right diretion change
        if(condition){
            // console.log(condition);
            // console.log(target.deltaY);
            let active = this.slider.querySelector('.active')
            let last = this.slider.querySelector('.last')
            let next = last.previousElementSibling
            
            if(!next){
                next = this.slider.lastElementChild
            }
        
            active.classList.remove(['active'])
            active.classList.add(['next'])
        
            last.classList.remove(['last'])
            last.classList.add(['active'])
            
            next.classList.remove(['next'])
            next.classList.add(['last'])
        }
        // single direction change / if "next-btn" right-left change
        else{

            let active = this.slider.querySelector('.active')
            let last = this.slider.querySelector('.last')
            let next = active.nextElementSibling
            
            if(!next){
                next = this.slider.firstElementChild
            }
        
            active.classList.remove(['active'])
            active.classList.add(['last'])
        
            last.classList.remove(['last'])
            last.classList.add(['next'])
            
            next.classList.remove(['next'])
            next.classList.add(['active'])
        }
    }
    //new possible ways for slide actions: ie. linear carousel
    // for futher code...
    
    sliderActionLinear = (e)=>{
        // console.log('from line');
        let numberOfSlidesToShow = this.slides.length/2
        
        // add css classes for fading effect


        if(e.parentElement.classList.contains('next-btn')){
            this.counter++
            this.counter < numberOfSlidesToShow && this.counter >= 0 ? e.parentElement.disabled = false : e.parentElement.disabled = true
            this.slidesDom[0].disabled = false
            if(this.counter > 4) this.counter = 5
        } 
        if(e.parentElement.classList.contains('prev-btn')) {
            this.counter--

            this.counter < numberOfSlidesToShow && this.counter >= 0? e.parentElement.disabled = false : e.parentElement.disabled = true
            this.slidesDom[1].disabled = false
            if(this.counter < 0) this.counter = 0
        }
        
        this.slider.querySelectorAll('.place-card').forEach((slide, index)=>{

            if(index > (numberOfSlidesToShow-1 + this.counter) || index < this.counter){
                console.log(numberOfSlidesToShow-1 + this.counter, "counter =", this.counter);
                
                slide.classList.add("hide-slide")
            }
           
            else{
                slide.classList.remove("hide-slide")
            }
            // slide.style.transform = `translateX(-${(this.counter*103.5)}%) `0k
           slide.style.transform = `translateX(-${(this.counter*108.5)}%)  `

           slide.addEventListener('mouseover', ()=>{
             slide.style.transform = `translateX(-${(this.counter*108.5)}%) scale(1.1)  `   
            })
           slide.addEventListener('mouseout', ()=>{
             slide.style.transform = `translateX(-${(this.counter*108.5)}%) scale(1)  `   
            })
        })
    }
}


class CardCarouselGenerator {
    constructor(sliderId, slidesData, interval=0){
        this.sliderContainer = document.getElementById(sliderId)
        this.slides = slidesData

        this.slidesDom; // created when slidesChangeOnClick || slidesChangeOnScroll are called
        this.slidesDisplayNumber = 1
        this.slideIndex = 0
        this.slideGroupId = 0
        this.slider // create at renderSlides() - inner Container
        this.slideCSS // passed in renderSlides()
        
        
        this.slidesDisplayNumber = 1 // number of slides displayed on carousel per time : can be 1; 2; 3; 4; 5
        this.slideLinearValue = 100; // default
        this.changeType // set by type of change: "onClick" || "onScroll"
        this.slideChangeType = "infinite" // default || "linear"
        this.hasBtn = false
        this.sliderAction;
        
        this.counter = 0    
        this.interval = interval
        this.automatic = interval === 0? false : true
      
    }
    //render slides without next buttons: change occur by click on image
    renderSlides = (slideCarousel, slideCSS) =>{
        this.slideCSS = slideCSS
        this.slider = document.createElement('div')
        this.slider.classList.add(slideCarousel)
        this.sliderContainer.appendChild(this.slider)

        this.slider = this.sliderContainer.querySelector(`.${slideCarousel}`)
        
        this.slider.innerHTML = this.slides.map((slide,index) =>{
            
            let position = "next"
            let hideSlide = ''

            if(this.slideIndex == 0){
                if(index == 0) position = "active"
                if(index == this.slides.length-1) position = "last"
            }
            
            if(this.slideIndex > 0 && index == this.slideIndex-1) position = "last"
            if(this.slideIndex > 0 && index == this.slideIndex) position = "active"

            // IMPORTANTE: numero de slides precisa ser passado dinamicamente:
            //encontrar um modo, para numero de slides impar 
            if(this.slidesDisplayNumber > 1 && index == this.slidesDisplayNumber){
                hideSlide = "hide-slide"
            }

            return `
             <article class="${!this.hasBtn? "onSlide": ''} ${this.slideCSS} ${position} ${hideSlide}" data-id="${slide.id}">
                <p class="country-name">${slide.place}</p>
                <h2 class="country-title">${slide.title}</h2>
                <div class="underline"></div>
                <a href="#gallery"><p class="gallery-card"><i class="far fa-images gallery-card-icon"></i>Gallery</p></a>
                <a href="#journal"><p class="journal-card" ><i class="fas fa-book diary-card-icon"></i>Diary</p></a>
            </article>
            `
        }).join('')
        
///////////////////
        if(this.slideChangeType === 'linear'){
            this.slider.querySelectorAll('.place-card').forEach((slide,i)=>{
                let slideAmount = `${i*this.slideLinearValue}%` 
                slide.style.left = slideAmount
                
            })
        }
///////////////////////
        if(this.automatic){
            console.log(this.automatic);
            setInterval(()=>{
                this.sliderAction(this.sliderContainer)
            },this.interval)
        }
}
    
    slideChangeOnClick = () =>{
        this.changeType = "onClick"
        //action change on slide is default: IMPORTANT slides must have a "slide" class
        let changerClass = "onSlide";
        
        // if action change is on btns sets 'slide-btn' as default: IMPORTANT btns must have a "slide-btn" class
        [...this.sliderContainer.children].forEach(children =>{
            if(children.classList.contains('slide-btn')){
                this.hasBtn = true
                changerClass = "slide-btn"
            }
        });

        //add eventListener to slides or btn
        this.slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]
        
            this.slidesDom.forEach(slide=>{
                slide.addEventListener('click', (e)=>{
             // call slide action based on type of change:
                if(this.slideChangeType === "infinite"){
                this.sliderActionInfinite(e.target)
                }
                if(this.slideChangeType === "linear"){
                this.sliderActionLinear(e.target)
                }
                
            })
        })
    }

    //slide change on scroll
    slideChangeOnScroll = ()=>{
        this.changeType = "onScroll"
        //action change on slide is default: IMPORTANT slides must have a "onSlide" class
        let changerClass = "onSlide";

        this.slidesDom = [...this.sliderContainer.getElementsByClassName(`${changerClass}`)]

            this.slider.addEventListener('wheel', (e)=>{
            // call slide action based on type of change:
            if(this.slideChangeType === "infinite"){
            this.sliderActionInfinite(e)
            }
            if(this.slideChangeType === "linear"){
            this.sliderActionLinear(e)
            }
        })
    }
    
/////////////////
sliderActionInfinite = (target) =>{
        console.log('from cicular');
        let condition;
        
        if(this.changeType === "onClick"){
            let onClickCondition = target.classList.contains('prev-btn');
            condition = onClickCondition    
        }
        if(this.changeType === "onScroll"){
            let onScrollCondition = target.deltaY > 0;
            condition = onScrollCondition    
        }
                
        //left-right diretion change
        if(condition){
            console.log(target.deltaY);
            let active = this.slider.querySelector('.active')
            let last = this.slider.querySelector('.last')
            let next = last.previousElementSibling
            
            if(!next){
                next = this.slider.lastElementChild
            }
        
            active.classList.remove(['active'])
            active.classList.add(['next'])
        
            last.classList.remove(['last'])
            last.classList.add(['active'])
            
            next.classList.remove(['next'])
            next.classList.add(['last'])
        }
        // single direction change / if "next-btn" right-left change
        else{
            let active = this.slider.querySelector('.active')
            let last = this.slider.querySelector('.last')
            let next = active.nextElementSibling
            
            if(!next){
                next = this.slider.firstElementChild
            }
        
            active.classList.remove(['active'])
            active.classList.add(['last'])
        
            last.classList.remove(['last'])
            last.classList.add(['next'])
            
            next.classList.remove(['next'])
            next.classList.add(['active'])
        }
    }
    //new possible ways for slide actions: ie. linear carousel
    // for futher code...
    
    sliderActionLinear = (e)=>{
        console.log(this.counter);

        // IMPORTANTE: numero de slides precisa ser passado dinamicamente:
        //encontrar um modo, para numero de slides impar 
        let numberOfSlidesToShow = this.slidesDisplayNumber
        
        // add css classes for fading effect
        // console.log(numberOfSlidesToShow);

        if(e.parentElement.classList.contains('next-btn')){
            this.counter++

            this.counter <= numberOfSlidesToShow && this.counter > 0 ? e.parentElement.disabled = false : e.parentElement.disabled = true
            this.slidesDom[0].disabled = false
            if(this.counter > 4) this.counter = 5
        } 
        if(e.parentElement.classList.contains('prev-btn')) {
            this.counter--

            this.counter <= numberOfSlidesToShow && this.counter >= 0? e.parentElement.disabled = false : e.parentElement.disabled = true
            this.slidesDom[1].disabled = false
            if(this.counter < 0) this.counter = 0
        }
        
        this.slider.querySelectorAll('.place-card').forEach((slide, index)=>{
            // console.log(index);
            if(index > (numberOfSlidesToShow-1 + this.counter) || index < this.counter){
                // console.log(numberOfSlidesToShow-1 + this.counter, "counter =", this.counter);
                
                slide.classList.add("hide-slide")
            }
           
            else{
                slide.classList.remove("hide-slide")
            }
            // slide.style.transform = `translateX(-${(this.counter*103.5)}%) `0k
           slide.style.transform = `translateX(-${(this.counter*108.5)}%)  `

           slide.addEventListener('mouseover', ()=>{
             slide.style.transform = `translateX(-${(this.counter*108.5)}%) scale(1.025)  `   
            })
           slide.addEventListener('mouseout', ()=>{
             slide.style.transform = `translateX(-${(this.counter*108.5)}%) scale(1)  `   
            })
        })

    }
}
*/


exports.CarouselGenerator = CarouselGenerator;
},{}],"js/infoToRender/placesCard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placesCardsData = exports.photosHero2 = exports.photosHero1 = exports.galleryImages = exports.dataTravel = void 0;
var placesCardsData = [{
  gallery: {
    img: "./images/DSC_0195.JPG",
    place: "MÉXICO",
    title: "Tοda jornada tem um começo!",
    placeMap: "./images/maps/mexico-map.png"
  }
}, {
  gallery: {},
  img: "./images/DSC_0185.JPG",
  place: "CENTRAL AMERICA",
  title: "On the road to the Jungle",
  placeMap: "./images/maps/central-america-map.png"
}, {
  gallery: {
    img: "./images/DSC_0196.JPG",
    place: "COLOMBIA",
    title: "Almost like Home",
    placeMap: "./images/maps/colombia-map.png"
  }
}, {
  gallery: {
    img: "./images/DSC_0200.JPG",
    place: "ECUADOR",
    title: "Game changer",
    placeMap: "./images/maps/ecuador-map.png"
  }
}, {
  gallery: {
    img: "./images/DSC_0195.JPG",
    place: "MÉXICO",
    title: "Tοda jornada tem um começo!",
    placeMap: "./images/maps/mexico-map.png"
  }
}, {
  gallery: {
    img: "./images/DSC_0185.JPG",
    place: "CENTRAL AMERICA",
    title: "On the road to the Jungle",
    placeMap: "./images/maps/mexico-map.png"
  }
}, {
  gallery: {
    img: "./images/DSC_0196.JPG",
    place: "COLOMBIA",
    title: "Almost like Home",
    placeMap: "./images/maps/mexico-map.png"
  }
}, {
  gallery: {
    img: "./images/DSC_0200.JPG",
    place: "ECUADOR",
    title: "Game changer",
    placeMap: "./images/maps/mexico-map.png"
  }
}];
exports.placesCardsData = placesCardsData;
var photosHero1 = [{
  id: 0,
  gallery: [{
    img: "./images/carousel-1/carousel-1.JPG",
    imgPlace: "Uyuni Salar - Bolivia",
    imgDate: "10/17/2007",
    alt: "portrail image, man in Uyuni Salar - Bolivia"
  }, {
    img: "./images/carousel-1/carousel-2.JPG",
    imgPlace: "Atitlan Lake - Peru",
    imgDate: "10/17/2007",
    alt: "Portrail image, Woman and Atitlan Lake as background - Peru"
  }, {
    img: "./images/carousel-1/carousel-3.JPG",
    imgPlace: "Atitlan Lake - Peru",
    imgDate: "10/17/2007",
    alt: "Woman biking and Atitlan Lake as background - Peru"
  }, {
    img: "./images/carousel-1/carousel-4.JPG",
    imgPlace: "Atitlan Lake - Peru",
    imgDate: "10/17/2007",
    alt: "Woman biking and Atitlan Lake as background - Peru"
  }]
}];
exports.photosHero1 = photosHero1;
var photosHero2 = [{
  id: 0,
  gallery: [{
    img: "./images/carousel-1/carousel-1.JPG",
    imgPlace: "Uyuni Salar - Bolivia",
    imgDate: "10/17/2007",
    alt: "portrail image, man in Uyuni Salar - Bolivia"
  }, {
    img: "./images/carousel-1/carousel-2.JPG",
    imgPlace: "Atitlan Lake - Peru",
    imgDate: "10/17/2007",
    alt: "Portrail image, Woman and Atitlan Lake as background - Peru"
  }, {
    img: "./images/carousel-1/carousel-3.JPG",
    imgPlace: "Atitlan Lake - Peru",
    imgDate: "10/17/2007",
    alt: "Woman biking and Atitlan Lake as background - Peru"
  }, {
    img: "./images/carousel-1/carousel-4.JPG",
    imgPlace: "Atitlan Lake - Peru",
    imgDate: "10/17/2007",
    alt: "Woman biking and Atitlan Lake as background - Peru"
  }]
}];
exports.photosHero2 = photosHero2;
var galleryImages = [{
  img: "./images/DSC_0029.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0185.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0029.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0185.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0029.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0185.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0029.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0185.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0029.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0185.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}, {
  img: "./images/DSC_0029.JPG"
}, {
  img: "./images/DSC_0083 (2).JPG"
}];
exports.galleryImages = galleryImages;
var dataTravel = [{
  id: 0,
  place: "México",
  title: "Every journey has a beggining",
  img: "./images/maps/mexico-map.png",
  alt: "mexico map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City 1",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City 2",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Going and going -------1111111111111",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "2222222222222222222222222222",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "333333333333333333333333333",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "4444444444444444444444444",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "5555555555555555555555555",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "6666666666666666",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 1,
  place: "Central America",
  title: "On the road to the Jungle",
  img: "./images/maps/central-america-map.png",
  alt: "central america map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Guatemala City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Honduras",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Panama",
    imgDate: "11/15/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Nicaragua",
    imgDate: "12/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Keep going and go",
    place: "Border to Antigua",
    date: "10/12 - 10/21/2007",
    distance: '800km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 2,
  place: "Colombia",
  title: "Almost like Home",
  img: "./images/maps/colombia-map.png",
  alt: "colombia map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Cali City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Bus hide to relif",
    place: "Ancient Tumbs in the middle of nowhere!",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 3,
  place: "Ecuador",
  title: "Game changer",
  img: "./images/maps/ecuador-map.png",
  alt: "ecuador map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Quito City 01",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City 02",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City 03",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City 04",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City 05",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City 06",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City 07",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City 08",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City 09",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Foods and goods",
    place: "Quito to Abancay",
    date: "10/12 - 10/21/2007",
    distance: '500km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 4,
  place: "Peru",
  title: "Desert and Snow, sea and mountains",
  img: "./images/maps/peru-map.png",
  alt: "peru map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 5,
  place: "Bolivia",
  title: "The Height Way Road",
  img: "./images/maps/bolivia-map.png",
  alt: "bolivia map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Guatemala City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Honduras",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Panama",
    imgDate: "11/15/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Nicaragua",
    imgDate: "12/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Keep going and go",
    place: "Border to Antigua",
    date: "10/12 - 10/21/2007",
    distance: '800km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 6,
  place: "Argentina",
  title: "The whole way down",
  img: "./images/maps/argentina-map.png",
  alt: "argentina map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Cordoba City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Buenos Aires",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Argentina 9",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Why are we dislike argentinians?",
    place: "Northen Argentina: Another country in a country!",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 7,
  place: "Uruguay",
  title: "Almost Home",
  img: "./images/maps/uruguay-map.png",
  alt: "uruguay map",
  gallery: [{
    img: "./images/DSC_0029.JPG",
    imgPlace: "Montevideo City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0029.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0185.JPG",
    imgPlace: "Mexico City",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "La Plata River",
    place: "Buenos Aires to Montevideo",
    date: "10/12 - 10/21/2007",
    distance: '35km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}, {
  id: 8,
  place: "Brazil",
  title: "Home sweat home",
  img: "./images/maps/brazil-map.png",
  alt: "brazil map",
  gallery: [{
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Brazilian-Uruguayan border",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico ",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico ",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico ",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Brazil 5 ",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico ",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Mexico ",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Brazil 8 ",
    imgDate: "10/17/2007"
  }, {
    img: "./images/DSC_0083 (2).JPG",
    imgPlace: "Brazilian-Uruguayan border",
    imgDate: "10/17/2007"
  }],
  journal: [{
    id: 1,
    title: "Going home",
    place: "Rio Grande do Sul to Santa Catarina",
    date: "10/12 - 10/21/2007",
    distance: '35km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }, {
    id: 1,
    title: "Going and going",
    place: "México city to Laquilhaca",
    date: "10/12 - 10/21/2007",
    distance: '200km',
    img: "./images/DSC_0029.JPG",
    alt: "person biking along the road to Laquilhaca",
    text: "<span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices tincidunt arcu non sodales. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae. Amet venenatis urna cursus eget nunc scelerisque viverra mauris. Amet consectetur adipiscing elit ut aliquam purus sit amet luctus. Dignissim cras tincidunt lobortis feugiat vivamus at augue eget. Et malesuada fames ac turpis egestas sed tempus urna. Mi quis hendrerit dolor magna eget est lorem ipsum dolor. Vitae sapien pellentesque habitant morbi tristique senectus. Ut porttitor leo a diam sollicitudin tempor id eu nisl. Vitae tortor condimentum lacinia quis vel. Risus in hendrerit gravida rutrum.Tincidunt ornare massa eget egestas. Neque egestas congue quisque egestas diam in. Bibendum est ultricies integer quis. Augue interdum velit euismod in pellentesque massa placerat duis. Duis at tellus at urna condimentum mattis pellentesque id nibh.</span><span> Sed felis eget velit aliquet. Aliquam nulla facilisi cras fermentum odio. Id nibh tortor id aliquet lectus proin. Sit amet commodo nulla facilisi nullam vehicula ipsum. Orci dapibus ultrices in iaculis nunc sed augue. Blandit turpis cursus in hac habitasse platea dictumst quisque sagittis. Ante in nibh mauris cursus mattis molestie. At augue eget arcu dictum varius. Sit amet volutpat consequat mauris. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Viverra adipiscing at in tellus integer feugiat. </span><span> Diam in arcu cursus euismod. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Faucibus et molestie ac feugiat sed lectus vestibulum mattis. Cursus turpis massa tincidunt dui ut ornare. Quam vulputate dignissim suspendisse in est ante in nibh. Turpis egestas sed tempus urna et pharetra. Blandit turpis cursus in hac habitasse. Quisque non tellus orci ac auctor augue mauris augue neque. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque. Nunc aliquet bibendum enim facilisis gravida neque convallis a cras. Tincidunt praesent semper feugiat nibh. Vulputate ut pharetra sit amet aliquam. Vestibulum morbi blandit cursus risus at ultrices mi. Ac turpis egestas maecenas pharetra convallis posuere morbi leo urna. Posuere lorem ipsum dolor sit amet. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Ut porttitor leo a diam sollicitudin tempor id eu nisl.<br>Viverra justo nec ultrices dui sapien eget. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Tincidunt id aliquet risus feugiat in ante. Morbi tristique senectus et netus et malesuada fames. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Urna cursus eget nunc scelerisque viverra mauris in aliquam sem. Est sit amet facilisis magna etiam. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida.</span><span> Consequat interdum varius sit amet mattis vulputate. Ornare quam viverra orci sagittis eu volutpat odio. Feugiat pretium nibh ipsum consequat nisl vel pretium lectus. Amet risus nullam eget felis. Quis varius quam quisque id. Senectus et netus et malesuada fames ac turpis egestas. Praesent tristique magna sit amet. Turpis egestas pretium aenean pharetra magna ac. Sem viverra aliquet eget sit amet tellus cras adipiscing. Volutpat diam ut venenatis tellus in metus vulputate. Non tellus orci ac auctor augue mauris augue.Amet justo donec enim diam. Vulputate dignissim suspendisse in est ante. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Massa ultricies mi quis hendrerit dolor. Laoreet id donec ultrices tincidunt. Convallis tellus id interdum velit laoreet id donec. Cras semper auctor neque vitae tempus quam. Vitae et leo duis ut diam quam nulla porttitor. Nullam non nisi est sit amet facilisis magna etiam tempor. Ut faucibus pulvinar elementum integer enim neque. Urna neque viverra justo nec ultrices dui sapien eget mi.</span>"
  }]
}];
exports.dataTravel = dataTravel;
},{}],"js/fullCarousel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullCarousel = fullCarousel;
exports.galleryClickEvent = void 0;

var _carouselGenerator = require("./utils/carouselGenerator.js");

var _placesCard = require("./infoToRender/placesCard.js");

// import { PhotoCarouselGenerator } from "./utils/carouselGenerator.js";
var galleryClickEvent = function galleryClickEvent(e, time) {
  //generate Carousel full images
  // const galleryFullCarousel = new PhotoCarouselGenerator('gallery-full-carousel-wrapper', dataTravel)
  var galleryFullCarousel = new _carouselGenerator.CarouselGenerator('gallery-full-carousel-wrapper', _placesCard.dataTravel, time);
  galleryFullCarousel.slideGeneralDataMap = false; // const playSlider = document.querySelector('#play-gallery-btn')
  // playSlider.addEventListener('click',()=>{
  //     console.log('jjjjjjjjjj');
  //     // galleryFullCarousel.interval = 1000
  //     // galleryFullCarousel.automatic = true
  //     galleryClickEvent(e, 5000)
  // })
  // console.log(galleryFullCarousel.interval);
  // set type of render function

  galleryFullCarousel.renderType = 2; //set change type

  galleryFullCarousel.slideChangeType = "infinite"; // console.log(galleryFullCarousel.slides)
  //after image click

  if (e.target) {
    galleryFullCarousel.slideIndex = e.target.getAttribute('data-image-id');
    galleryFullCarousel.slideGroupId = e.target.getAttribute('data-place-id'); //remove class to hide-carousel: it is added below, after click "close-btn", to create a close effect 

    galleryFullCarousel.sliderContainer.classList.remove('hide-carousel'); //bring carousel container to front of gallery

    galleryFullCarousel.sliderContainer.classList.add('show-carousel'); //set position on window for carousel based on gallery position: to cover full width and height

    var sliderPosition = document.querySelector('.main-wrapper').getBoundingClientRect().top;
    galleryFullCarousel.sliderContainer.style.top = "".concat(sliderPosition * -1, "px"); //render carousel into container

    galleryFullCarousel.renderSlides('gallery-full-carousel', 'full-carousel-image'); //set type of changing

    galleryFullCarousel.slideChangeOnScroll(); //stop window scrolling in order to get the carousel in place and avoid conflict betwen scrolling change type

    document.body.classList.add('stop-scrolling'); // document.querySelector('#scroll-snap-wrapper').classList.add('stop-scrolling')
    //add event listener to close btn

    var closeGalleryBtn = document.querySelector('#close-gallery-btn');
    closeGalleryBtn.addEventListener('click', function (e) {
      //recover window scrolling normal behaviour
      document.body.classList.remove('stop-scrolling'); //remove carousel and set carousel container back under gallery   

      galleryFullCarousel.sliderContainer.classList.add('hide-carousel');
      setTimeout(function () {
        galleryFullCarousel.sliderContainer.classList.remove('show-carousel'); // document.querySelector('#scroll-snap-wrapper').classList.remove('stop-scrolling')

        galleryFullCarousel.slider.remove();
      }, 1000);
    });
  }
};

exports.galleryClickEvent = galleryClickEvent;

function fullCarousel(rootElementId) {
  var removeEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var gallery = document.getElementById("".concat(rootElementId));
  gallery.addEventListener('click', galleryClickEvent); // console.log('from carousel');
  // console.log(removeEvent);
  // if(removeEvent == true){
  //     gallery.removeEventListener('click', galleryClickEvent)
  //     console.log('ddddddddddd',gallery.removeEventListener('click', galleryClickEvent));
  // } 
}
},{"./utils/carouselGenerator.js":"js/utils/carouselGenerator.js","./infoToRender/placesCard.js":"js/infoToRender/placesCard.js"}],"js/renderTimeline.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTimeline = renderTimeline;

function renderTimeline(data) {
  var timelineWrapper = document.querySelector('#timeline');
  timelineWrapper.innerHTML = data.map(function (item, index) {
    var place = item.place,
        date = item.date;
    return "\n        <li class=\"waypoint\">\n            <div class=\"timeline-circle\">\n                <p class=\"circle-number\">".concat(index + 1, "</p>\n            </div>\n            <div class=\"timeline-panel\">\n                <h1 class=\"timeline-panel-title\">").concat(place, "</h1>\n                <p class=\"timeline-panel-date\">").concat(date, "</p>\n            </div>\n        </li>\n        ");
  }).join('');
}
},{}],"js/renderJournal.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderJournal = renderJournal;

var _placesCard = require("./infoToRender/placesCard.js");

var dataId;

function renderJournal() {
  var dataToRenderId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var pageToRender = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var journalWrapper = document.getElementById('journal-wrapper');
  var journalPages = document.getElementById('journal-pages');
  dataId = dataToRenderId;
  var pagination;
  journalPages.innerHTML = '';
  Object.values(_placesCard.dataTravel).forEach(function (item) {
    if (item.id == dataToRenderId) {
      // pagination = item.journal.length;
      // console.log(typeof item.journal.length)
      pagination = Math.ceil(item.journal.length / 2); // console.log(pagination);

      if (pagination > 1) {
        for (var i = 0; i < pagination; i++) {
          // console.log(i, 'form loop');
          journalPages.innerHTML += "<a href=\"#journal\"><span data-page=\"".concat(i + 1, "\">").concat(i + 1, "</span></a>");
        }
      }

      journalWrapper.innerHTML = item.journal.map(function (diary, index) {
        var title = diary.title,
            place = diary.place,
            date = diary.date,
            distance = diary.distance,
            img = diary.img,
            text = diary.text,
            alt = diary.alt;
        pagination = diary.length;

        if (index >= pageToRender * 2 && index <= pageToRender * 2 + 1) {
          return "\n                    <article class=\"journal-text-wrapper\" data-id=".concat(index, " >\n                    <h3 class=\"journal-title\">").concat(title, "</h3>\n                    <div class=\"journal-info\">\n                    <p class=\"journal-data\">").concat(date, "</p>  \n                    <p class=\"journal-location\">").concat(place, "</p>  \n                    <p class=\"journal-distance\">").concat(distance, "</p>  \n                    </div>\n                    <p class=\"journal-text\"><img class=\"journal-image\" src=\"").concat(img, "\" alt=\"").concat(alt, "\">").concat(text, "</p>\n                    </article>\n                    ");
        }
      }).join('');
    }
  });
}

var journalPages = document.getElementById('journal-pages');
journalPages.addEventListener('click', function (e) {
  if (e.target.getAttribute("data-page")) {
    // console.log(e.target.dataset.page);
    var page = parseInt(e.target.dataset.page) - 1;
    renderJournal(dataId, page); // console.log(dataId);
  }
});
/**

 journalWrapper.innerHTML = item.journal.map((diary, index) =>{
                const {title, place, date, distance, img, text, alt} = diary
                pagination = diary.length
                if(index >= pageToRender && index < pageToRender +2){
                    console.log(pageToRender, (pageToRender) + 1);
                    return `
                    <article class="journal-text-wrapper" data-id=${index} >
                    <h3 class="journal-title">${title}</h3>
                    <div class="journal-info">
                    <p class="journal-data">${date}</p>  
                    <p class="journal-location">${place}</p>  
                    <p class="journal-distance">${distance}</p>  
                    </div>
                    <p class="journal-text"><img class="journal-image" src="${img}" alt="${alt}">${text}</p>
                    </article>
                    ` 
                }
            }).join('')

*/
},{"./infoToRender/placesCard.js":"js/infoToRender/placesCard.js"}],"js/renderGallery.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderGallery = renderGallery;

var _placesCard = require("./infoToRender/placesCard.js");

function renderGallery() {
  var dataToRenderId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var gallery = document.querySelector('#gallery');
  Object.values(_placesCard.dataTravel).forEach(function (item) {
    if (item.id == dataToRenderId) {
      gallery.innerHTML = item.gallery.map(function (place, index) {
        var img = place.img,
            imgPlace = place.imgPlace,
            imgDate = place.imgDate,
            alt = place.alt;
        return "\n                   <article class=\"gallery-image\">\n                    <img src=\"".concat(img, "\" data-image-id=\"").concat(index, "\" data-place-id=\"").concat(item.id, "\" alt=\"").concat(alt, "\">\n                    <div class=\"image-info-wrapper\"\n                    <p class=\"photo-place\">").concat(imgPlace, "</p>\n                    <p class=\"photo-number\">").concat(index + 1, "/").concat(item.gallery.length, "</p>\n                    </div>\n                    </article>\n                   ");
      }).join('');
    }
  }); // gallery.innerHTML = dataTravel.map((image, index)=>{
  //     return ` <article class="gallery-image">
  //     <img src="${image.img}" data-image-id="${index}" alt="">
  //             </article>`
  //         }).join('')
}
},{"./infoToRender/placesCard.js":"js/infoToRender/placesCard.js"}],"js/infoToRender/timelineInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timelineInfo = void 0;
var timelineInfo = [{
  "place": "Londres",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Mexico",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Guatemala",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "El Savador",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Honduras",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Nicaragua",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Costa Rica",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Panama",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Ecuador",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Colombia",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Peru",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Bolivia",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Argentina",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Uruguay",
  "date": "From 10/10/2004 to 09/11/2006"
}, {
  "place": "Brazil",
  "date": "From 10/10/2004 to 09/11/2006"
}];
exports.timelineInfo = timelineInfo;
},{}],"js/utils/typingEffect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typingEffect = typingEffect;
exports.typingEffectReverse = typingEffectReverse;
var charIndex1 = 0;
var charIndex2 = 0;
var charIndex3 = 0;
var isTimeforRevertTyping = false;

function typingEffect() {
  var text1 = ['Once Upon a Dream Called', 'Latin America...'];
  var text2 = 'Latin America...';
  var speed = 100;
  var mainTitlePartOne = document.getElementById("main-title-1");
  var mainTitlePartTwo = document.getElementById("main-title-2"); // mainTitlePartOne.textContent = ''
  // mainTitlePartTwo.textContent = ''

  if (charIndex1 < text1[0].length) {
    mainTitlePartOne.textContent += text1[0].charAt(charIndex1);
    charIndex1++;
    setTimeout(typingEffect, speed);
  } //starts tryping second text after the first one is done


  if (charIndex1 === text1[0].length && charIndex2 < text1[1].length) {
    // charIndex1 = 0
    setTimeout(function () {
      mainTitlePartTwo.textContent += text1[1].charAt(charIndex2);
      charIndex2++;
      setTimeout(typingEffect, speed);
    }, speed);
  } //starts reversetryping
  // if(charIndex2 === text1[1].length){
  //     setTimeout(typingEffectReverse,3000)
  //     charIndex2++
  //     console.log('yes');
  // }

}

function typingWriter() {
  if (charIndex1 < text1[0].length) {
    document.getElementById("main-title-1").innerHTML += text1[0].charAt(charIndex1);
    charIndex1++;
    setTimeout(typingEffect, speed);
  }
}

var counter = 0;

function typingEffectReverse() {
  var text1 = 'Once Upon a Dream Called';
  var text2 = ['Latin America...', 'Bike Trip...', "World Traveling..."]; // let text2 = 'Latin America...'; 

  var speed = 300;

  if (charIndex3 <= text2[0].length && counter === 0) {
    document.getElementById("main-title-2").innerHTML = text2[0].slice(0, text2[0].length - charIndex3);
    charIndex3++;
    setTimeout(typingEffectReverse, speed);
  }

  if (charIndex3 === text2[0].length && counter === 0) {
    counter++;
    charIndex3 = 0;
  }
}
/*
const text1 = 'Once Upon a Dream Called'; 
const text2 = 'Latin America...'; 
const speed = 300; 
export function typingEffect(){

    if (charIndex1 < text1.length) {
      document.getElementById("main-title-1").innerHTML += text1.charAt(charIndex1);
      charIndex1++;
      setTimeout(typingEffect, speed);
    }
    //starts tryping second text after the first one is done
    if(charIndex1 === text1.length && charIndex2 < text2.length){
        document.getElementById("main-title-2").innerHTML += text2.charAt(charIndex2);
      charIndex2++;
      setTimeout(typingEffect, speed);
    }
    // charIndex1 =0
    // charIndex2 =0
    if(charIndex2 === text2.length){
        setTimeout(typingEffectReverse,3000)
        charIndex2++
        console.log('yes');
        
        
    }
   

    
}

export function typingEffectReverse(){
    const text1 = 'Once Upon a Dream Called'; 
    let text2 = 'Latin America...'; 
    let text2 = 'Latin America...'; 
    const speed = 300; 

    if (charIndex3 <= text2.length) {
        
      document.getElementById("main-title-2").innerHTML = text2.slice(0, text2.length-charIndex3)
      charIndex3++;
      setTimeout(typingEffectReverse, speed);
    }
    
    
}




*/
},{}],"js/utils/getFullYear.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullYear = getFullYear;

function getFullYear() {
  document.querySelector('#current-year').textContent = new Date().getFullYear();
}
},{}],"js/utils/backToTopBtn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backToTopBtn = backToTopBtn;

function backToTopBtn() {
  var backToTopBtn = document.createElement('button');
  backToTopBtn.setAttribute('id', 'back-to-top-btn');
  backToTopBtn.innerHTML = "<a href=\"#places-cards\"><i class=\"fa-solid fa-circle-arrow-up\"></i></a>";
  backToTopBtn.disabled = true;
  document.body.appendChild(backToTopBtn);
  var iconBtn = backToTopBtn.querySelector('i');
  window.addEventListener('scroll', function (e) {
    if (window.scrollY > window.innerHeight * 1.1) {
      backToTopBtn.disabled = false;
      backToTopBtn.classList.add('show-back-btn');
    } else {
      backToTopBtn.disabled = true;
      backToTopBtn.classList.remove('show-back-btn');
    }
  });
}
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _carouselGenerator = require("./utils/carouselGenerator.js");

var _fullCarousel = require("./fullCarousel.js");

var _renderTimeline = require("./renderTimeline.js");

var _renderJournal = require("./renderJournal.js");

var _renderGallery = require("./renderGallery.js");

var _placesCard = require("./infoToRender/placesCard.js");

var _timelineInfo = require("./infoToRender/timelineInfo.js");

var _typingEffect = require("./utils/typingEffect.js");

var _getFullYear = require("./utils/getFullYear.js");

var _backToTopBtn = require("./utils/backToTopBtn.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

// ===== CAROUSEL HERO (left side)===== //
// const carouselHero1 = new CarouselGenerator('hero-slider-1-wrapper', photosHero1, 10000)
// // carouselHero1.slideGeneralDataMap = true
// carouselHero1.sliderAction = 'onSlide'
// carouselHero1.renderType = 2
// carouselHero1.slideChangeType = 'infinite'
// carouselHero1.slideChangeOnClick()
// carouselHero1.renderSlides('hero-slider', 'hero-slide-1')
// ===== CAROUSEL HERO (rigth side)===== //
var carouselHero2 = new _carouselGenerator.CarouselGenerator('hero-slider-2-wrapper', _placesCard.photosHero2, 7000);
carouselHero2.sliderAction = 'onSlide';
carouselHero2.renderType = 2;
carouselHero2.slideChangeType = 'infinite';
carouselHero2.slideChangeOnClick();
carouselHero2.renderSlides('hero-slider', 'hero-slide-1'); // ===== CAROUSEL PLACES CARDS ===== //

var carouselPlacesCard = new _carouselGenerator.CarouselGenerator('places-card-carousel', _placesCard.dataTravel);
carouselPlacesCard.renderType = 1;
carouselPlacesCard.slideChangeOnClick();
carouselPlacesCard.slideChangeType = 'linear'; //////////////////////////////////////////

var gallery = document.getElementById('gallery');
var hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');

if (hasfullCarousel.indexOf('full-slide') == -1) {
  gallery.removeEventListener('click', _fullCarousel.galleryClickEvent);
} else {
  gallery.addEventListener('click', _fullCarousel.galleryClickEvent);
}

window.addEventListener('resize', function () {
  screenSize();
});
screenSize();

function screenSize() {
  var cardsWrapper = document.querySelector('.places-wrapper');
  var size = window.getComputedStyle(document.body, '::after').getPropertyValue('content'); // console.log(cardsWrapper);
  // const gallery = document.getElementById('gallery')

  hasfullCarousel = window.getComputedStyle(gallery, "::after").getPropertyValue('content');

  if (hasfullCarousel.indexOf('full-slide') == -1) {
    gallery.removeEventListener('click', _fullCarousel.galleryClickEvent); // console.log('full slide resize yyyyyyyyyyy');
    // let removeEvent = true
    // fullCarousel('gallery', removeEvent)
  } else {
    gallery.addEventListener('click', _fullCarousel.galleryClickEvent); // console.log('else esle yyyyyyyyy');
  }

  if (size.indexOf("size-1-screen") != -1) {
    cardsWrapper && cardsWrapper.remove(); // 1 slides per time

    carouselPlacesCard.slidesLinearTranslation = 100;
    carouselPlacesCard.slidesDisplayNumber = 1;
    carouselPlacesCard.renderSlides('places-wrapper', 'place-card'); // let removeEvent = true
    // fullCarousel('gallery', removeEvent)
  }

  if (size.indexOf("size-2-screen") != -1) {
    // console.log(size);
    cardsWrapper && cardsWrapper.remove(); // 2 slides per time

    carouselPlacesCard.slidesLinearTranslation = 104.2;
    carouselPlacesCard.slidesDisplayNumber = 2;
    carouselPlacesCard.slideLinearValue = 50;
    carouselPlacesCard.renderSlides('places-wrapper', 'place-card');
    var removeEvent = false; // fullCarousel('gallery')
  }

  if (size.indexOf("size-3-screen") != -1) {
    cardsWrapper && cardsWrapper.remove(); // 3 slides per time

    carouselPlacesCard.slidesLinearTranslation = 103.25;
    carouselPlacesCard.slideLinearValue = 33;
    carouselPlacesCard.slidesDisplayNumber = 3;
    carouselPlacesCard.renderSlides('places-wrapper', 'place-card'); // let removeEvent = false
    // fullCarousel('gallery', removeEvent)
  }

  if (size.indexOf("size-4-screen") != -1) {
    cardsWrapper && cardsWrapper.remove(); // 4 slides per time

    carouselPlacesCard.slidesLinearTranslation = 106.5;
    carouselPlacesCard.slideLinearValue = 25;
    carouselPlacesCard.slidesDisplayNumber = 4;
    carouselPlacesCard.renderSlides('places-wrapper', 'place-card'); // let removeEvent = false
    // fullCarousel('gallery', removeEvent)
  }
} //===== RENDER IMAGES GALLERY after card selection / as default, the images related with the first card are rendered 


(0, _renderGallery.renderGallery)();
(0, _renderJournal.renderJournal)();
var carouselPlacesCards = carouselPlacesCard.slider.children;

_toConsumableArray(carouselPlacesCards).forEach(function (slide) {
  slide.addEventListener('click', function (e) {
    if (e.target.classList.contains('journal-card') || e.target.classList.contains('gallery-card')) {
      (0, _renderJournal.renderJournal)(slide.dataset.id);
      (0, _renderGallery.renderGallery)(slide.dataset.id);
    }
  });
}); // ===== CAROUSEL FULL IMAGES - image gallery ===== //


(0, _fullCarousel.fullCarousel)('gallery'); // =====   ABOUT - ROUTE - TIMETABLE - CONTACT - sections ===== //

var scrollYSections = document.querySelectorAll('.scroll-y-section');
var contactSection = document.querySelector('.contact-wrapper');
var travelRouteBtn = document.querySelector('.bussola-btn');
var travelCloseBtn = document.querySelector('.travel-close-btn');
var travelRouteTimelineBtn = document.querySelector('.timeline-open-small-screen');
var timelineBtn = document.querySelector('.timeline-btn');
var timelineCloseBtn = document.querySelector('.timeline-close-btn');
var aboutBtn = document.querySelector('.about-btn');
var aboutCloseBtn = document.querySelector('.about-close-btn');
var contactBtn = document.querySelector('.contact-btn');
var contactCloseBtn = document.querySelector('.contact-close-btn');
aboutBtn.addEventListener('click', function (e) {
  scrollYSections[0].style.left = '0'; //*** hide the document body Y scroll bar, avoiding user to scroll beyond current section  

  document.body.classList.add('hide-scroll-bar');
  aboutCloseBtn.addEventListener('click', function (e) {
    scrollYSections[0].style.left = '100vw'; // add back Y scroll to whole document body    

    document.body.classList.remove('hide-scroll-bar');
  });
});
travelRouteBtn.addEventListener('click', function (e) {
  // scrollYSections[1].style.left = '0'
  scrollYSections[1].classList.add('hide-timeline');
  scrollYSections[2].classList.add('show-timeline'); // small screen width = 100vw; big screen width = -94vw 
  // scrollYSections[2].style.left = '-94vw' // wide screen
  //*** hide the document body Y scroll bar, avoiding user to scroll beyond current section

  document.body.classList.add('hide-scroll-bar'); //********* By default the Y scroll bar is hidden. Add it when the slide translation is over. It is necessary to avoid the unpleasant presence of the Y scroll bar while the slide is moving
  // get the time for the transition effect

  var time = window.getComputedStyle(scrollYSections[1]).getPropertyValue('transition');
  time = parseInt(time.split(' ')[1].split('s')[0]); // add a class to show the Y scroll bar after transition effect is over

  setTimeout(function () {
    scrollYSections[1].classList.remove('hide-scroll-bar');
  }, time * 1000);
});
travelCloseBtn.addEventListener('click', function (e) {
  scrollYSections[1].classList.remove('hide-timeline');
  scrollYSections[1].style.left = '-100vw';
  scrollYSections[2].classList.remove('show-timeline'); // scrollYSections[2].style.left = '-100vw'
  // add back Y scroll to whole document body    

  document.body.classList.remove('hide-scroll-bar'); // hide Y scroll bar to current section

  scrollYSections[1].classList.add('hide-scroll-bar');
});
travelRouteTimelineBtn.addEventListener('click', function () {
  console.log('bnt');
  scrollYSections[2].classList.add('show-timeline-small-screen');
  scrollYSections[2].classList.remove('show-timeline'); // scrollYSections[2].classList.add('show-timeline')

  timelineBtn.classList.add('hide-timeline-btn');
  timelineCloseBtn.classList.add('show-timeline-btn');
  document.body.classList.add('hide-scroll-bar');
});
timelineBtn.addEventListener('click', function (e) {
  scrollYSections[2].classList.add('hide-timeline'); // scrollYSections[2].style.left = '0'
  //*** hide the document body Y scroll bar, avoiding user to scroll beyond current section

  document.body.classList.add('hide-scroll-bar'); //********* By default the Y scroll bar is hidden. Add it when the slide translation is over. It is necessary to avoid the unpleasant presence of the Y scroll bar while the slide is moving
  // get the time for the transition effect

  var time = window.getComputedStyle(scrollYSections[2]).getPropertyValue('transition');
  time = parseInt(time.split(' ')[1].split('s')[0]); // add a class to show the Y scroll bar after transition effect is over

  setTimeout(function () {
    scrollYSections[1].classList.remove('hide-scroll-bar'); //hide open btn and show close btn

    timelineBtn.classList.add('hide-timeline-btn');
    timelineCloseBtn.classList.add('show-timeline-btn');
  }, time * 1000);
});
timelineCloseBtn.addEventListener('click', function (e) {
  console.log('close btn'); // scrollYSections[2].style.left = '-94vw';
  // scrollYSections[2].style.left = '-94vw';

  scrollYSections[2].classList.remove('show-timeline-small-screen');
  scrollYSections[2].classList.remove('hide-timeline'); // add back Y scroll to whole document body    

  document.body.classList.remove('hide-scroll-bar'); // hide Y scroll bar to current section

  scrollYSections[2].classList.add('hide-scroll-bar'); //show open btn and hide close btn

  timelineBtn.classList.remove('hide-timeline-btn');
  timelineCloseBtn.classList.remove('show-timeline-btn');
});
contactBtn.addEventListener('click', function (e) {
  contactSection.classList.add('show-contact-section');
  document.body.classList.add('hide-scroll-bar');
  setTimeout(function () {
    contactSection.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  }, 1000);
  contactCloseBtn.addEventListener('click', function () {
    document.body.classList.remove('hide-scroll-bar');
    contactSection.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    setTimeout(function () {
      contactSection.classList.remove('show-contact-section');
    }, 500);
  });
}); //************** TIMELINE ***************/

(0, _renderTimeline.renderTimeline)(_timelineInfo.timelineInfo); ////////////// UTILS
// typingEffect()

(0, _backToTopBtn.backToTopBtn)();
(0, _getFullYear.getFullYear)();
},{"./utils/carouselGenerator.js":"js/utils/carouselGenerator.js","./fullCarousel.js":"js/fullCarousel.js","./renderTimeline.js":"js/renderTimeline.js","./renderJournal.js":"js/renderJournal.js","./renderGallery.js":"js/renderGallery.js","./infoToRender/placesCard.js":"js/infoToRender/placesCard.js","./infoToRender/timelineInfo.js":"js/infoToRender/timelineInfo.js","./utils/typingEffect.js":"js/utils/typingEffect.js","./utils/getFullYear.js":"js/utils/getFullYear.js","./utils/backToTopBtn.js":"js/utils/backToTopBtn.js"}],"C:/Users/Notebook/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60049" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Notebook/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map