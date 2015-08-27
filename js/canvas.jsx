'use strict'
var React = require('react');
var Component=require('./component.jsx');

module.exports = React.createClass({
	componentDidMount:function(){
		var node=React.findDOMNode(this);
		$(node).children().each(function(){
			$(this).css({position:"absolute"});
			$(this).draggable().resizable({
				handles: 'n, s, e, w,se, nw, ne,sw'
			});
		});
	},
	render: function () {
	    return (
	    	<div>
	    		<Component />
	    		<Component />
	    	</div>
	    );
  }
});