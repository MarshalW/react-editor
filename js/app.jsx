'use strict'
var React = require('react');
var $ = require('jquery');
var Component=require('./component.jsx');
require('jquery-ui');

require("../css/style.css");

$(document).ready(function(){
	React.render(<Component />, $('body').get(0));
});


