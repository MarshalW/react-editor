'use strict'
var React = require('react');

module.exports = React.createClass({
	editMode:'lostFocus',
	resized:false,//用于第一次resize时设置
	componentDidMount:function(){
		var self=this;
		var node=React.findDOMNode(this);

		$(node).on('click',function(){
			if(self.editMode=='lostFocus'){
				self.dragAndResize();
			}
			return false;// 防止click canvas
		});

		this.props.dispatcher.register(function(payload){
			if(payload.eventName=='canvsLostFocus'){
				if(payload.target!=node){// 点击当前组件不应lost focus
					self.lostFocus();	
				}
			}
			return true;
		});
	},
	dragAndResize:function(){
		console.log('run drag and resize');
		this.editMode='dragAndResize';
		var node=React.findDOMNode(this);
		var self=this;
		$(node).draggable({ disabled: false }).resizable({
			handles: 'n, s, e, w,se, nw, ne,sw',
			disabled: false
		});
		this.resized=true;

		this.props.dispatcher.dispatch({ // 如果其他组件是焦点，通知它lost focus
			eventName:'canvsLostFocus',
			target:node
		});

		$(node).one('dblclick',function(){
			if(self.editMode=='dragAndResize'){
				self.edit();
			}
		});
	},
	edit:function(){
		this.editMode='edit';
		var node=React.findDOMNode(this);
		var self=this;
		$(node).draggable({ disabled: true });

		$(node).one('dblclick',function(){
			if(self.editMode=='edit'){
				self.dragAndResize();
			}
		});
	},
	lostFocus:function(){
		this.editMode='lostFocus';
		var node=React.findDOMNode(this);
		$(node).off('dblclick');
		if(this.resized){
			$(node).draggable({ disabled: true }).resizable({ disabled: true });	
		}
	},
	render: function () {
		var textStyle={
			width:'100%',
			height:'100%',
			'background-color': '#CCE8CC'
		};
	    return (
	    	<div id="draggable" className="ui-widget-content" style={this.props.data.style}>
  				<p style={textStyle} ref='content'>Drag me around</p>
			</div>
	    );
  }
});