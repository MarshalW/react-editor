'use strict'
var React = require('react');
var PageStore=require('./pagestore.js');
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
		var pageIndex=this.props.pageIndex;
		var componentIndex=0;
		var componentNodes=PageStore.pages[pageIndex].components.map(
			function(component){
				var index=componentIndex;
				componentIndex++;
				return (
					<Component data={component} pageIndex={pageIndex} componentIndex={index} dispatcher={self.props.dispatcher}/>
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