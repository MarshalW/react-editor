'use strict'
var React = require('react');

module.exports = React.createClass({
	render: function () {
	    return (
	    	<div id="draggable" className="ui-widget-content" style={this.props.data.style}>
  				<p>Drag me around</p>
			</div>
	    );
  }
});