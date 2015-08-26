'use strict'
var React = require('react');
var $ = require('jquery');
var Component=require('./component.jsx');

require("../css/style.css");

$(document).ready(function(){
	$('body').append('<div id="hello"></div>');
	React.render(<Component/>, $('#hello').get(0));
});


