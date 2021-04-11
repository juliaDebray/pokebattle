const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const SOURCES_PATH = path.resolve(__dirname, './src');

module.exports = {

    mode: 'production',

    entry: ['regenerator-runtime/runtime', path.resolve(__dirname, './src/index.js')],

    output: {
        chunkFilename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].map',
        path: path.resolve(__dirname, './'),
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

        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/images'), to: path.resolve(__dirname, './images') },
            ],
        }),
    ],

};
