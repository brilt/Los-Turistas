module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/Los-Turistas/" : "/",
};
module.exports = {
  devServer: {
    proxy: "https://web-service-380302.uc.r.appspot.com",
  },
};
