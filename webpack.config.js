const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: ['@babel/polyfill', './index.js'],
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 4200,
		watchFiles: ['src/*html']
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: true
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	],
	module: {
		rules: [
            {
				test: /\.(jpe?g|png|gif|svg)$/i,
			 	use: ["file-loader?name=img/[name].[ext]"]
			},
            {
                test: /\.svg$/,
                use: [
                  'svg-sprite-loader',
                  'svgo-loader'
                ]
            },
			{
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'less-loader']
			},
            {
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
                    {
					    loader: 'babel-loader',
					    options: {
						    presets: [
							    '@babel/preset-env'
						    ],
						    plugins: [
							    '@babel/plugin-proposal-class-properties'
						    ]
					    }
				    }
                ]
			}
		]
	}
}