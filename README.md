# aliyun-ddns
## 简介
部署在aliyun-fc上，用于使用动态公网IP的服务器自动更新阿里云托管域名的记录。
## 用法
1.修改index.js中的配置  
    \<accessKeyId>和\<accessKeySecret>替换成自己账号的，建议创建一个只有DNS管理权限的子账号；  
    \<secretKey1>和\<secretKey2>是自己配置key，用于验证和指定dns记录，建议至少用64字节的随机值来确保安全性；  
    \<RR1>和\<RR2>是对应的主机记录/域名前缀，也就是完整域名去掉后缀;  
    \<RecordId1>和\<RecordId2>是解析记录在阿里云的编号，可以在阿里云控制台解析设置的页面代码中搜索data-row-key查到，也可以选择需要查询的主机记录点击启用，通过控制台在resume.json请求的body中查看。  
2.在代码目录下执行npm install。  
3.在阿里云函数计算控制台创建服务（如果没有创建过），需要在服务配置中打开“允许函数访问公网”。  
4.新建HTTP函数，配置如下：  
      函数入口 index.handler  
      运行环境 Node.JS.12.X  
      函数执行内存 128MB  
      超时时间 5  
      单实例并发度 2  
5.上传代码目录到这个函数下  
6.在服务器的crontab中配置* * * * * curl \<触发器路径>?key=\<secretKey1>   
## 注意
部分运营商的dns强制配置了较长的ttl时间，会导致更新不及时。遇到这种情况可以配置成公共dns。
