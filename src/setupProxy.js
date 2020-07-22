const { createProxyMiddleware } =  require("http-proxy-middleware");

module.exports = (app) => {
    app.use("/api", createProxyMiddleware({
        target: "http://localhost:8080",
        secure: false,
        pathRewrite: {
            "^/api": "/api/v1"
        }
    }))
}