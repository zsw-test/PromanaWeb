var AipFaceClient = require("baidu-aip-sdk").face;

// 设置APPID/AK/SK
var APP_ID = "15809152";
var API_KEY = "dFxqUzN7nC2yZiZMxFB9wrbu";
var SECRET_KEY = "xIWMmr5yCLGMRtUkbuPBHEe4bhA9uukI";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
var HttpClient = require("baidu-aip-sdk").HttpClient;

// 设置request库的一些参数，例如代理服务地址，超时时间等
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestOptions({timeout: 5000});

// 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
// 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
// request参数请参考 https://github.com/request/request#requestoptions-callback
HttpClient.setRequestInterceptor(function(requestOptions) {
    // 查看参数
    console.log(requestOptions)
    // 修改参数
    requestOptions.timeout = 5000;
    // 返回参数
    return requestOptions;
});


var image = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180925%2Fd28dafe1a1e4421f9d2d4eb72eb17c9a.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619606472&t=57c275d67307ffc1a98f40d38d15f549";

var imageType = "URL";

// 如果有可选参数
var options = {};
options["face_field"] = "age";
options["max_face_num"] = "2";
options["face_type"] = "LIVE";
options["liveness_control"] = "LOW";

// 带参数调用人脸检测

export function detect() {
    client.detect(image, imageType, options).then(function(result) {
        console.log(JSON.stringify(result));
    }).catch(function(err) {
        // 如果发生网络错误
        console.log(err);
    });
}
  