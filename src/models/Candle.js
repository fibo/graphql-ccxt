class Candle {
    constructor({ data }) {
        this.ts = data[0]
        this.ohlcv = [data[1], data[2], data[3], data[4], data[5]]
    }
}

module.exports = {
    Candle
}