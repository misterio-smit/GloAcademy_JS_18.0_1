'use strict';

 class DomElement{
  constructor(selector, height, width, bg, fontSize){
    this.selector = selector; 
    this.height = height; 
    this.width = width; 
    this.bg = bg;
    this.fontSize = fontSize;
    }
    createElem (){
  let elem;
  if (this.selector.substr.contain(0, 1) === '.'){
    elem = document.createElement('div');
    elem.classList.add(this.selector.slise(1));
    document.body.append(elem);
  }else if(this.selector.substr(0, 1) === '#'){
    elem = document.createElement('id');
    elem.classList.add(this.selector.slise(1));
    document.body.append(elem);

  }
  elem.style.cssText =`height:${this.height}px; width: ${this.width}px; bg: ${this.bg}; font-size: ${this.fontSize}px`;
 }
  
 }
 

 let newElement = new DomElement('.block', 120, 120, 'white', 20); 
console.log(newElement);