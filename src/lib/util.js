/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2016/3/21
 * Time: 0:02
 */
'use strict';
let Vue = require("vue");

function getWatchKey(Vue,obj,options) {
	let el = obj.el;
	let expression = el.getAttribute((Vue.config.prefix?Vue.config.prefix:'v-') + 'model');
	if(expression){
		return expression;
	}else {
/*		let arg = obj.descriptor.arg;
		let attr = obj.descriptor.attr;
		return attr.substr(attr.indexOf(arg));*/
		return options.key;
	}
}

function getFieldKey(obj) {
	var vm = obj.vm;
	var el = obj.el;
	let filedName = el.getAttribute("name");
	let formName = vm.$get("formName");
	if(formName){
		return formName+"."+filedName;
	}else {
		return filedName;
	}
}

function formFieldInit(_vm,_key) {
	_vm.$set(_key,{
		"$invalid":false,
		"$valid":true,
		"$pristine":true,
		"$dirty":true,
		"$error":{}
	});
}

function updateValid(_vm,_key,_item,_value,_el,_operateElement) {
	_vm.$set(_key+".$error."+_item,!_value);

	let valid = true;
	for(let item in _vm.$get(_key+".$error")){
		if(_vm.$get(_key+".$error."+item) === true){
			valid = false;
			break;
		}
	}
	_vm.$set(_key+".$invalid",!valid);
	_vm.$set(_key+".$valid",valid);
	if(_operateElement){
		if(valid){
			Vue.util.removeClass(_el,"invalid");
			Vue.util.addClass(_el,"valid");
		}else {
			Vue.util.removeClass(_el,"valid");
			Vue.util.addClass(_el,"invalid");
		}
	}
}



module.exports = {
	getWatchKey:getWatchKey,
	getFieldKey:getFieldKey,
	formFieldInit:formFieldInit,
	updateValid:updateValid
}