'use strict'
var React = require('react');
var Canvas=require('./canvas.jsx');
var Dispatcher = require('flux').Dispatcher;
var PageStore=require('./pagestore.js');
require("../css/style.css");

var data=PageStore.pages[0].components;

var AppDispatcher=new Dispatcher();
var pageIndex=0;

$(function(){
	React.render(<Canvas pageIndex={pageIndex} dispatcher={AppDispatcher}/>, $('body').get(0));
});

	


