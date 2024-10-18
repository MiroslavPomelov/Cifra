const os = require('os');

exports.Machine = class Machine {
    getInfo() {
        return `Компоненты: ${os.platform} \r ОС: ${os.release} \r Место на диске: ${os.freemem}`;
    }
}