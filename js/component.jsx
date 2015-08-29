'use strict'
var React = require('react');
var PageStore=require('./pagestore.js');

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

		$(React.findDOMNode(this.refs.content)).on('blur keyup paste copy cut mouseup', function(){
			if(self.editMode=='edit'){
				self.save();
			}
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
	save:function(){
		var node=React.findDOMNode(this);
		var self=this;
		PageStore.saveComponent({
			style:$(node).attr('style'),
			content:self.getContent()
		}, this.props.pageIndex, this.props.componentIndex);
		// PageStore.printPages();
	},
	getContent:function(){
		var node=React.findDOMNode(this.refs.content);
		return {
			text:$(node).html()
		};
	},
	dragAndResize:function(){
		console.log('run drag and resize');
		this.editMode='dragAndResize';
		var node=React.findDOMNode(this);
		var self=this;
		$(node).draggable({ 
			disabled: false,
			stop:function(){
				self.save();
			}
		}).resizable({
			handles: 'n, s, e, w,se, nw, ne,sw',
			disabled: false,
			stop:function(){
				self.save();
			}
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

		$(node).removeAttr('contentEditable');
	},
	edit:function(){
		this.editMode='edit';
		var node=React.findDOMNode(this);
		var self=this;
		$(node).draggable({ disabled: true });

		$(node).one('dblclick',function(){ //从编辑模式退出到拖拽模式
			if(self.editMode=='edit'){
				self.dragAndResize();
				$(React.findDOMNode(self.refs.content)).blur();
			}
		});

		$(React.findDOMNode(this.refs.content)).attr('contentEditable',true);
	},
	lostFocus:function(){
		this.editMode='lostFocus';
		var node=React.findDOMNode(this);
		$(node).off('dblclick');
		if(this.resized){
			$(node).draggable({ disabled: true }).resizable({ disabled: true });	
		}
		$(React.findDOMNode(this.refs.content)).removeAttr('contentEditable');
	},
	render: function () {
		var textStyle={
			width:'100%',
			height:'100%',
			'background-color': '#CCE8CC'
		};
	    return (
	    	<div id="draggable" className="ui-widget-content" style={this.props.data.style}>
  				<div style={textStyle} ref='content'>Drag me around</div>
			</div>
	    );
  }
});