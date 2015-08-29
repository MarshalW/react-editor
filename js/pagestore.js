var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

module.exports=assign({}, EventEmitter.prototype, {
	pages:[
		{
			components:[
				{
					style:{
						position:"absolute",
						left:'200px',
						top:'10px',
						width:'200px',
						height:'100px'
					},
					content:{
						text:'Drag me around'
					}
				},
				{
					style:{	
						position:"absolute",
						left:'100px',
						top:'280px',
						width:'150px',
						height:'80px'
					},
					content:{
						text:'Drag me around'
					}
				},
			]
		}
	],
	saveComponent:function(compoent,pageIndex,componentIndex){
		var page=this.pages[pageIndex];
		page.components[componentIndex]=compoent;
	},
	printPages:function(){
		console.log(JSON.stringify(this.pages));
	}
});