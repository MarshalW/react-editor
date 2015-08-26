module.exports = {
    entry: "./js/app.jsx",
    output: {
        path: __dirname,
        filename: "./js/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader?insertPragma=React.DOM&harmony'},
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};