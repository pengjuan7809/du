var Toast={};
Toast.install=function(Vue,options){
	//Vue.prototype.$msgmsg='hello world';
// 初始化参数	
	let opt={
		defaultType:'bottom',
		duration:'2500'
	}
// 覆盖初始化参数--- 合并参数与实例 两种方法 一种是循环如下覆盖，一种是assign来覆盖 如下
	// for(let property in options){
	// 	opt[property]=options[property];
	// }
	Object.assign(opt,options);
// 添加实例方法 Vue.prototype
	Vue.prototype.$toast=(tips,type)=>{		
		if(type){
			opt.defaultType=type;
		}
		// 如果toast还在，则不再执行
		if (document.getElementsByClassName('vue-toast').length) {
			return;
		}
		// 创建vue构造器
		let toastTpl=Vue.extend({
			template:'<div class="vue-toast toast-'+opt.defaultType+'">'+tips+'</div>'
		});
		// el: 提供一个在页面上已经存在的DOM元素作为Vue实例的挂载目标。可以是css选择器，也可以是HTMLElement实例
		// 在实例挂载之后，可以通过$vm.$el访问
		// 如果这个选项在实例化时候有用到，实例将立即进入编译过程。否则，需要显示调用vm.$mount()手动开启编译
		// 提供的元素只能作为挂载点。所有的挂载元素会被vue生成dom替换。因此不能挂载在顶级元素（html，body）上
		let $vm=new toastTpl({
			el:document.createElement('div')
		})
		let tpl = $vm.$mount().$el
	//	let tpl=$vm.$mount.$el;
		// 实例化vue实例
		// 使用$mount来手动开启编译，用$el来访问元素，并插入到body中
		//let tpl = new toastTpl().$mount().$el;
		console.log(tpl);
		document.body.appendChild(tpl);
		setTimeout(function(){
			document.body.removeChild(tpl);
		},opt.duration)
	}

	['bottom','center','top'].forEach(type=>{
		Vue.prototype.$toast[type]=(tips)=>{
			return Vue.prototype.$toast(tips,type)
		}
	})
}
// 导出两种方法 取其中之一 如下
// module.exports=Toast; 
export default Toast;