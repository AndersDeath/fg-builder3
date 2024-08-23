import fs from 'fs-extra';

export function fsTest(path: string) {
    const some = fs.readFileSync(path, 'utf8');
    return some
}