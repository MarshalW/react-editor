'use strict'
var React = require('react');
var Canvas=require('./canvas.jsx');
var Dispatcher = require('flux').Dispatcher;
require("../css/style.css");

var data=[
	{
		style:{
			position:"absolute",
			left:'200px',
			top:'10px',
			width:'200px',
			height:'100px'
		}
	},
	{
		style:{
			position:"absolute",
			left:'100px',
			top:'280px',
			width:'150px',
			height:'80px'
		}
	}
];

var AppDispatcher=new Dispatcher();

$(function(){
	React.render(<Canvas data={data} dispatcher={AppDispatcher}/>, $('body').get(0));
});

	


