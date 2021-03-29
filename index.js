const Core = require('@alicloud/pop-core');

const client = new Core({
    accessKeyId: '<accessKeyId>',
    accessKeySecret: '<accessKeySecret>',
    endpoint: 'https://alidns.cn-hangzhou.aliyuncs.com',
    apiVersion: '2015-01-09'
});

const requestOption = {
    method: 'POST'
};

const key = {
    '<secretKey1>': {RR: '<RR1>', RecordId: '<RecordId1>'},
    '<secretKey2>': {RR: '<RR2>', RecordId: '<RecordId2>'}
}

exports.handler = async (req, res, context) => {
    try {
        if ("key" in req.queries && req.queries.key in key) {
            if ((await client.request('DescribeDomainRecordInfo', {"RecordId": key[req.queries.key].RecordId}, requestOption)).Value !== req.clientIP) {
                const params = {
                    "Type": "A",
                    "Value": req.clientIP,
                    "RR": key[req.queries.key].RR,
                    "RecordId": key[req.queries.key].RecordId
                }
                await client.request('UpdateDomainRecord', params, requestOption);
                res.send("OK");
            } else {
                res.send("Dup");
            }
        } else {
            res.send("ERROR");
        }
    } catch (e) {
        res.send("Exception");
    }
}
