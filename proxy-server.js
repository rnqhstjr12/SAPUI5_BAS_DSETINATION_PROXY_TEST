const http = require('http');
const httpProxy = require('http-proxy');
 
const proxy = httpProxy.createProxyServer({
    changeOrigin: true, // 목적지의 origin을 변경
    secure: false, // SSL/TLS 연결을 사용할지 여부
    rejectUnauthorized: false // 클라이언트가 서버로부터 받은 SSL 인증서의 유효성을 검사
});
 
const server = http.createServer((req, res) => {
    // 클라이언트로부터의 요청을 분석하여 적절한 route로 프록시 요청 전달
    if (req.url.startsWith('/Northwind/')) {
        // Northwind destination에 대한 경로 설정
        req.url = req.url.replace(/^\/Northwind/, '');
        proxy.web(req, res, { target: 'https://services.odata.org' });
    } else if (req.url.startsWith('/resources/') || req.url.startsWith('/test-resources/')) {
        // ui5 destination에 대한 경로 설정
        proxy.web(req, res, { target: 'https://ui5.sap.com' });
    } else {
        // 그 외의 요청은 html5-apps-repo-rt 서비스로 전달
        proxy.web(req, res, { target: 'http://localhost:8080' });
    }
});
 
server.listen(8880, () => {
    console.log('Proxy server is running on port 8880');
});