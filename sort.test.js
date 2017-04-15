const sort = require('./sort')
const expect = require('chai').expect
const Mock = require('mockjs')

describe('>>answer<<', function () {
    let data, result, answer
    const log = false //是否打印数据
    for (let key in sort) {
        //测试每个排序方法
        console.log('\n' + key)
        for (let i = 0; i < 3; i++) {
            //每个排序方法测三次
            data = getData(10000, 100)
            if(log) console.log('data\t', data.join(','))

            console.time('a')
            answer = getAnswer(data)
            console.timeEnd('a')
            if(log) console.log('answer\t', answer.join(','))

            console.time(i)
            result = (sort[key])(data)
            console.timeEnd(i)
            
            if(log) console.log('result\t', result.join(','))
            
            it(key, function () {
                expect(result).to.eql(answer)
            })
        }
    }
})

/**
 * 产生测试数据
 * @param {number} len 数组长度 
 * @param {number} max 随机数范围
 */
function getData(len, max) {
    const data = []
    for (let i = 0; i < len; i++) {
        data.push(Math.floor(max * Math.random()))
    }
    return data
}

/**
 * 使用原生排序方法计算结果
 * @param {number[]} arr 
 */
function getAnswer(arr) {
    return arr.concat([]).sort((a, b) => a - b)
}
