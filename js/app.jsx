'use strict'
var React = require('react');
var Canvas=require('./canvas.jsx');
require("../css/style.css");

$(function(){
	// React.render(<Component />, $('body').get(0));
	React.render(<Canvas />, $('body').get(0));
});

	


