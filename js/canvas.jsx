'use strict'
var React = require('react');

var Component=require('./component.jsx');

module.exports = React.createClass({
	foucusComponent:null,
	componentDidMount:function(){
		var node=React.findDOMNode(this);
		var self=this;

		// 发送消息
		$(node).on('click',function(event){
			self.props.dispatcher.dispatch({
				eventName:'canvsLostFocus',
				target:event.target
			});
		});
	},
	render: function () {
		var self=this;
		var componentNodes=this.props.data.map(
			function(component){
				return (
					<Component data={component} dispatcher={self.props.dispatcher}/>
				);
			}
		);

	    return (
	    	<div className='canvas' dispatcher={this.props.dispatcher}>
	    		{componentNodes}
	    	</div>
	    );
  }
});