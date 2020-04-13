const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader', //creates style nodes from js strings
					'css-loader', //translates css into commonjs
					'sass-loader', //compiles css to sass
				],
			},
			/*{
				test: /\.(png|jpe?g|gif|mp3)$/i,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},*/
			{
                test: /\.(png|svg|jpg|gif|mp3)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options:{
                            fallback: "file-loader",
                            name: "[name][md5:hash].[ext]",
                            outputPath: 'assets/',
                            publicPath: '/assets/'
                        }
                    }
                ]
            },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
			test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			}
		],
	},
	output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'index.js',
        library: 'react-calculator-jt',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	],
	resolve: {
        alias:{
            'assets': path.resolve(__dirname, 'assets')
        }
    }
};