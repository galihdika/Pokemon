const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV === "development";
module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: `${__dirname}/public/`,
		publicPath: '/public/',
		filename: 'bundle.js'
	},
	resolve: {
		modules: [__dirname, 'node_modules'],
		extensions: ['.js', '.jsx', '.json', '.svg', '.scss']
	},
	devServer: {
		hot: true,
		historyApiFallback: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({ filename: `${devMode ? '' : 'styles.css'}` })
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: '@svgr/webpack'
					},
					{
						loader: 'file-loader'
					}
				]
			}
		]
	}
};