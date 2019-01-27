const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const config = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,

                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.global.sss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'sugarss',
                            plugins: [
                                require('postcss-easy-import')({ extensions: ['.sss'] }),
                                require('postcss-nested'),
                            ],
                        }    
                    },
                  ],
            },
            {
                test: /^((?!\.global).)*sss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]--[hash:base64:5]',
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            parser: 'sugarss',
                            plugins: [
                                require('postcss-easy-import')({ extensions: ['.sss'] }),
                                require('postcss-nested'),
                            ],
                        }    
                    },
                  ],
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'images'
                    },
                  },
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            symbolId: filePath => path.basename(filePath).slice(0, -4),
                            spriteFilename: () => `svg-sprite/sprite.svg`
                        }
                    },
                  'svgo-loader',
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            filename: path.join(__dirname, 'build/index.html'),
            alwaysWriteToDisk: true
          }),
          new HtmlWebpackHarddiskPlugin(),
          new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
          }),
          new SpriteLoaderPlugin(),
    ],

    resolve: {
        modules: [
            path.resolve(__dirname, 'src'),
            'node_modules',
        ]
    },

    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, 'build'),
        proxy: {
            '/api': 'http://localhost:4000'
        },
        historyApiFallback: true,
    }
}

module.exports = config;