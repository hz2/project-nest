
import { Field, ObjectType } from '@nestjs/graphql';
// import file from "@/db/phone.db";

const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname, '../db/phone.db')

const buf = fs.readFileSync(file)
const indexOffset = buf.readInt32LE(4, 4)
const size = (buf.length - indexOffset) / 9
const opMap = [
    '异常',
    '移动', // 1
    '联通', // 2
    '电信', // 3
    '电信虚拟运营商', // 4
    '联通虚拟运营商', // 5
    '移动虚拟运营商' // 6
]

function formatResult(phone, opType, content) {
    var arr = (content || '||||').split('|')
    return {
        phone: phone,
        op: opMap[opType],
        province: arr[0],
        city: arr[1],
        zipcode: arr[2],
        areacode: arr[3]?.replace('\u0000', ' ')
    }
}

function find(phoneOrigin) {
    var phone = parseInt((phoneOrigin + '').substr(0, 7))
    var left = 0
    var right = size - 1
    while (left <= right) {
        var pos = ((right + left) / 2) | 0
        var index = buf.readInt32LE(indexOffset + pos * 9, 4)
        if (index < phone) {
            if (left === pos) {
                return formatResult(phoneOrigin, 0, null)
            }
            left = pos
        } else if (index > phone) {
            if (right === pos) {
                return formatResult(phoneOrigin, 0, null)
            }
            right = pos
        } else {
            // match 
            var infoOffset = buf.readInt32LE(indexOffset + pos * 9 + 4, 4)
            var phoneType = buf.readInt8(indexOffset + pos * 9 + 8, 1)
            var content = buf.slice(infoOffset, infoOffset + 100)
            var endIdx = 0
            while (endIdx < 100 && content[endIdx] !== '\n') {
                endIdx++
            }
            return formatResult(phoneOrigin, phoneType, content.toString('utf8', 0, endIdx))
        }
    }
}

export const Phone = find

@ObjectType({ description: 'phone ' })
export class CPhone {
    @Field(type => String)
    phone: string;

    @Field()
    op: string;

    @Field()
    province: string;

    @Field()
    city: string;

    @Field()
    zipcode: string;

    @Field()
    areacode: string;
}


