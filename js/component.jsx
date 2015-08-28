'use strict'
var React = require('react');

module.exports = React.createClass({
	dragInited:false,
	focusMe:false,
	componentDidMount:function(){
		var self=this;
		var node=React.findDOMNode(this);
		this.props.dispatcher.register(function(payload){
			// 取消焦点或者称为焦点（带drag和resize）
			if(payload.eventName=='canvs-click' && payload.target===node){
				self.dragInited=true;
				$(payload.target).draggable({ disabled: false }).resizable({
					handles: 'n, s, e, w,se, nw, ne,sw',
					disabled: false
				});
				self.focusMe=true;
			}else{
				if(self.dragInited){
					$(node).draggable({ disabled: true }).resizable({ disabled: true });	
				}
				self.focusMe=false;
			}
			return true;
		});

		// 焦点情况下的双击
		$(node).on('dblclick',function(){
			if(self.focusMe){
				console.log('call editor');
			}
		});
	},
	render: function () {
	    return (
	    	<div id="draggable" className="ui-widget-content" style={this.props.data.style}>
  				<p>Drag me around</p>
			</div>
	    );
  }
});