'use strict'
var React = require('react');
var Component=require('./component.jsx');

module.exports = React.createClass({
	componentDidMount:function(){
		var node=React.findDOMNode(this);
		$(node).children().each(function(){
			$(this).draggable().resizable({
				handles: 'n, s, e, w,se, nw, ne,sw'
			});
		});
	},
	render: function () {

		var componentNodes=this.props.data.map(
			function(component){
				return (
					<Component data={component} />
				);
			}
		);

	    return (
	    	<div>
	    		{componentNodes}
	    	</div>
	    );
  }
});