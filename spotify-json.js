console.log(`spotify-json-2025.06.20-enhanced`);
let url = $request.url;
// console.log(`原始url:${url}`);

// ===== FIX 1: Xử lý port 443 =====
if (url.includes('com:443')) {
    url = url.replace(/com:443/g, 'com');
    console.log('Đã xóa port 443');
}

// ===== FIX 2: Thay đổi platform để tải đủ dữ liệu =====
if (url.includes('platform=iphone')) {
    url = url.replace(/platform=iphone/g, 'platform=ipad');
    console.log(`Đã thay đổi platform thành iPad`);
} else if (url.includes('platform=android')) {
    url = url.replace(/platform=android/g, 'platform=ipad');
    console.log(`Đã thay đổi platform thành iPad`);
} else {
    console.log('Platform đã được hỗ trợ hoặc không cần thay đổi');
}

// ===== FIX 3: Xóa các tham số gây nhảy bài =====
// Xóa fragment, offset, limit không cần thiết
const skipParamPatterns = [
    /[?&]fragment=[^&]*/g,
    /[?&]offset=[^&]*/g,
    /[?&]limit=[^&]*/g,
    /[?&]seed=[^&]*/g,
    /[?&]market=[^&]*/g
];

if (url.includes('/artistview/v1/artist') || 
    url.includes('/album-entity-view/v2/album') ||
    url.includes('/artist-override-v1/') ||
    url.includes('/playlist-v2/')) {
    
    skipParamPatterns.forEach(pattern => {
        if (pattern.test(url)) {
            url = url.replace(pattern, '');
            console.log(`Đã xóa tham số: ${pattern}`);
        }
    });
}

// ===== FIX 4: Xóa dấu & thừa =====
url = url.replace(/[?&]+/g, (match, offset) => {
    return offset === url.indexOf(match) ? '?' : '&';
});

// ===== FIX 5: Xử lý các endpoint gây lỗi nhảy bài =====
// Bỏ qua các tham số tracking/ad
url = url.replace(/[?&](utoken|tokens|ad_id|tracking_id)=[^&]*/g, '');

// ===== FIX 6: Chuẩn hóa URL cuối =====
// Xóa & thừa ở cuối
url = url.replace(/[?&]$/, '');

console.log(`URL cuối cùng: ${url}`);

$done({
    url: url
});
