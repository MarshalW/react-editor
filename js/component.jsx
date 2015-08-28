'use strict'
var React = require('react');

module.exports = React.createClass({
	dragInited:false,
	focusMe:false,
	editMode:false,
	canvasClickAction:function(payload){
		var node=React.findDOMNode(this);
		var contentNode=React.findDOMNode(this.refs.content);
		if(payload.target===node || $.contains(node, payload.target)){
			if(!this.focusMe){
				$(node).draggable({ disabled: false }).resizable({
					handles: 'n, s, e, w,se, nw, ne,sw',
					disabled: false
				});

				$(contentNode).attr('contenteditable',true);
				$(node).draggable({ disabled: true })
				this.focusMe=true;

			}else{ // 不是第一次点击
				// alert(this.refs.content);
				if(this.editMode){
					$(node).one('dblclick',function(){
						alert('dblclick');
					});
				}

				
		
			}
			
			this.dragInited=true;
		}else{
			if(this.dragInited){
				$(node).draggable({ disabled: true }).resizable({ disabled: true });	
				$(contentNode).removeAttr('contenteditable');
			}
			this.focusMe=false;
		}
	},
	componentDidMount:function(){
		var self=this;
		var node=React.findDOMNode(this);

		this.props.dispatcher.register(function(payload){
			if(payload.eventName=='canvs-click'){
				self.canvasClickAction(payload);
			}
			return true;
		});
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