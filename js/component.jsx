var React = require('react');

module.exports = React.createClass({
	componentDidMount:function(){
		var node=React.findDOMNode(this.refs.draggable);
		$(node).draggable().resizable({
  			handles: 'n, s, e, w,se, nw, ne,sw'
		});
	},
	render: function () {
	    return (
	    	<div id="draggable" className="ui-widget-content" ref="draggable">
  				<p>Drag me around</p>
			</div>
	    );
  }
});