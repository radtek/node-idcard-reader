# 通用二代身份证读卡
----
在widnows客户端实现通过二代身份证机具读取二代身份证信息
- 使用通过dll驱动实现对多数机具的读取  
- 通过node-ffi实现访问dll接口。gyp需要编译为32位
- [通用dll下载地址](https://www.cnblogs.com/name-lh/archive/2006/01/28/324003.html)

## 安装依赖
`npm install node-gyp -g`
- gyp安装比较麻烦，可以先npm安装 windows-build-tools 模块来自动安装相关开发环境和工具

## 安装
`npm install idcard-reader`


## 使用
```js
const idcr = require('idcard-reader');
const settings = {
    dllTxt: 'c:/sdtapi.dll',
    dllImage: 'c:/wltrs.dll',   // 可空 空则不处理头像
    imgSaveDir: '',             // 头像图片生成保存目录 空则使用系统临时目录
};


idcr.init(settings).then((inited) => {
    if ( ! inited) {
        return;
    }
    // 返回所有可用机具列表数组
    const devices = idcr.find_device_list();

    if (devices.length) {
        // 使用第一个机具进行读取
        idcr.fetch_data(devices[0]).then(data => {
            console.log(data);
        });
    }
});

```

## 命令行调用
```js
// 全局安装
npm install idcard-reader -g
// 执行
idc-reader
```


## 读取数据结构
```
{
    base: {
        name: string;       // 姓名
        gender: number;     // 性别 1，2
        genderName: string; // 性别 男,女
        nation: string;     // 民族代码
        nationName: string; // 民族中文
        birth: string;      // 出生日期
        address: string;    // 住址
        idc: string;        // 身份证号
        regorg: string;     // 签发机关
        startdate: string;  // 有效期开始
        enddate: string;    // 有效期结束 日期或者"长期"
    }
    imagePath: string;      // 头像文件路径
    samid: string;          // 机具SAM序列号
}

```

## 注意事项
因保护设计，身份证成功读取后必须移出机具读取感应区或者取出插卡，否则下次连接硬件执行找卡会出现找卡失败情况


## License
[MIT](LICENSE)