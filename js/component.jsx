var React = require('react');
var $ = require('jquery');
require('jquery-ui');

module.exports = React.createClass({
	componentDidMount:function(){
		var node=React.findDOMNode(this.refs.draggable);
		$(node).draggable();
	},
	render: function () {
	    return (
	    	<div id="draggable" className="ui-widget-content" ref="draggable">
  				<p>Drag me around</p>
			</div>
	    );
  }
});