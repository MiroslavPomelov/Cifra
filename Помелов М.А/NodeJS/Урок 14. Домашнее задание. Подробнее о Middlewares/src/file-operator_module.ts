import * as fs from 'fs';

export function readFilePromise(fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data: string) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

export function writeFilePromise(fileName: string, data: string): Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(fileName, data, 'utf8', (err) => {
                if (err) {
                    reject(err);
                }
                resolve('success');
            });
        } catch (error) {
            reject('Ошибка')
        }
    });
}