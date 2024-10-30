
import { rejects } from "assert";
import fs from "fs";

export async function read(path: string): Promise<string> {
    return new Promise((resolve: (value: string | PromiseLike<string>) => void, reject: (value: string | PromiseLike<string>) => void) => {
        fs.readFile(path, 'utf8', (err: any, data: string) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        })
    })
}

export async function write(path: string, content: string): Promise<string> {
    return new Promise((resolve: (value: string | PromiseLike<string>) => void, reject: (value: string | PromiseLike<string>) => void) => {
        fs.writeFile(path, content, 'utf8', (err: any) => {
            if (err) {
                reject(err);
            }
            resolve('File has been writed!');
        })
    })
}