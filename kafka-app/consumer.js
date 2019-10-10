const fs = require('fs')
// const ip = require('ip')

//const { Kafka, logLevel } = require('../index')

//const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
    logLevel: logLevel.INFO,
    brokers: [`localhost:9092`],
    clientId: 'example-consumer',
})

const topic = 'topic-test'
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic })
    await consumer.run({
        // eachBatch: async ({ batch }) => {
        //   console.log(batch)
        // },
        eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
    },
})
}