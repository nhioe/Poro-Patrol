import type { Configuration } from "webpack"

const { rules } = require("./webpack.rules")
const { plugins } = require("./webpack.plugins")

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
})

export const rendererConfig: Configuration = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp|mp3)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][hash][ext][query]",
        },
      },
    ],
  },
  devtool: "source-map",
  plugins: plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
}

