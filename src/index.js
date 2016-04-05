/**
 * Created by Bane.Shi.
 * Copyright MoenSun
 * User: Bane.Shi
 * Date: 2016/3/25
 * Time: 23:13
 */
'use strict';
let util = require("./lib/util");
let validates = require("./lib/validates");

module.exports = install;

function install(Vue,options) {
	Vue.directive('ms-form',{
		id: 'ms-form',
		priority: 10001,
		bind:function () {
			let vm = this.vm;
			let el = this.el;
			let formName = el.getAttribute("name");
			vm.$set("formName",formName);
			vm.$set(formName,{
				"$valid":true,
				"$invalid":false
			});
			vm.$watch(formName,function (newValue,oldValue) {
				let valid = true;
				for(let index in newValue){
					if( newValue[index]["$invalid"] != undefined &&  newValue[index]["$invalid"] ){
						valid = false;
						break;
					}
				}
				newValue.$invalid = !valid;
				newValue.$valid = valid;
			},{
				deep: true
			});


		}
	});

	Vue.directive('ms-required',function (options) {
		var vm = this.vm;
		var el = this.el;

		var _watchKey = util.getWatchKey(Vue,this,options);
		let _fieldKey = util.getFieldKey(this);
		var vmScope = this._scope ? this._scope : vm;

		util.formFieldInit(vmScope,_fieldKey);
		vmScope.$watch(_watchKey,function (newVal, oldVal) {
			let result = validates.required(newVal);
			util.updateValid(vmScope,_fieldKey,"required",result,el,oldVal);
		},{
			immediate: true
		});
	});

	Vue.directive('ms-max',function (options) {
		var vm = this.vm;
		var el = this.el;

		var _watchKey = util.getWatchKey(Vue,this,options);
		let _fieldKey = util.getFieldKey(this);
		var vmScope = this._scope ? this._scope : vm;

		util.formFieldInit(vmScope,_fieldKey);
		vmScope.$watch(_watchKey,function (newVal, oldVal) {
			let result = validates.max(newVal,options.max);
			util.updateValid(vmScope,_fieldKey,"max",result,el,true);
		},{
			immediate: true
		});
	});

	Vue.directive('ms-min',function (options) {
		var vm = this.vm;
		var el = this.el;

		var _watchKey = util.getWatchKey(Vue,this,options);
		let _fieldKey = util.getFieldKey(this);
		var vmScope = this._scope ? this._scope : vm;

		util.formFieldInit(vmScope,_fieldKey);
		vmScope.$watch(_watchKey,function (newVal, oldVal) {
			let result = validates.min(newVal,options.min);
			util.updateValid(vmScope,_fieldKey,"min",result,el,true);
		},{
			immediate: true
		});
	});

	Vue.directive('ms-max-length',function (options) {
		var vm = this.vm;
		var el = this.el;

		var _watchKey = util.getWatchKey(Vue,this,options);
		let _fieldKey = util.getFieldKey(this);
		var vmScope = this._scope ? this._scope : vm;

		util.formFieldInit(vmScope,_fieldKey);
		vmScope.$watch(_watchKey,function (newVal, oldVal) {
			let result = validates.maxLength(newVal,options.maxLength);
			util.updateValid(vmScope,_fieldKey,"maxLength",result,el,true);
		},{
			immediate: true
		});
	});


	Vue.directive('ms-min-length',function (options) {
		var vm = this.vm;
		var el = this.el;

		var _watchKey = util.getWatchKey(Vue,this,options);
		let _fieldKey = util.getFieldKey(this);
		var vmScope = this._scope ? this._scope : vm;

		util.formFieldInit(vmScope,_fieldKey);
		vmScope.$watch(_watchKey,function (newVal, oldVal) {
			let result = validates.minLength(newVal,options.minLength);
			util.updateValid(vmScope,_fieldKey,"minLength",result,el,true);
		},{
			immediate: true
		});
	});

	Vue.directive('ms-pattern',function (options) {
		var vm = this.vm;
		var el = this.el;

		var _watchKey = util.getWatchKey(Vue,this,options);
		let _fieldKey = util.getFieldKey(this);
		var vmScope = this._scope ? this._scope : vm;

		util.formFieldInit(vmScope,_fieldKey);
		vmScope.$watch(_watchKey,function (newVal, oldVal) {
			let result = validates.pattern(newVal,options.pattern);
			util.updateValid(vmScope,_fieldKey,"pattern",result,el,true);
		},{
			immediate: true
		});
	});


	Vue.directive('ms-disabled',{
		update:function (newValue,oldValue) {
			var vm = this.vm;
			var el = this.el;
			if(newValue){
				el.setAttribute("disabled", "disabled");
			}else {
				el.removeAttribute("disabled");
			}
		}
	});
}