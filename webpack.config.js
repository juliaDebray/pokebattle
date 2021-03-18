const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const SOURCES_PATH = path.resolve(__dirname, './src');

module.exports = {

    mode: 'development',

    entry: ['regenerator-runtime/runtime', path.resolve(__dirname, './src/index.js')],

    devServer: {
        overlay: true,
        hot: true,
    },

    devtool: 'inline-source-map',

    output: {
        chunkFilename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].map',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                include: SOURCES_PATH,
                use: ['html-loader'],
            },
            {
                test: /\.jsx?$/i,
                include: SOURCES_PATH,
                use: ['babel-loader'],
            },
            {
                test: /\.scss$/i,
                include: SOURCES_PATH,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),

        new ESLintPlugin(),

        new StyleLintPlugin({
            configFile: path.resolve(__dirname, './.stylelintrc.json'),
            context: SOURCES_PATH,
        }),

        new webpack.HotModuleReplacementPlugin({}),
    ]

};
