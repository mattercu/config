console.log(`spotify-json-2025.06.20`);
let url = $request.url;
let headers = $request.headers;

// console.log(`原始url:${url}`);

if (url.includes('com:443')) {
    url = url.replace(/com:443/g, 'com');
}

// Giữ nguyên các tham số quan trọng, chỉ thay đổi platform
if (url.includes('platform=iphone')) {
    url = url.replace(/platform=iphone/g, 'platform=ipad');
    console.log(`替换platform:${url}`);
} else {
    console.log('无需处理');
}

// Thêm các header bypass phổ biến
let newHeaders = {
    ...headers,
    'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15',
    'X-Spotify-Platform': 'iPad',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
};

$done({
    url,
    headers: newHeaders
});
