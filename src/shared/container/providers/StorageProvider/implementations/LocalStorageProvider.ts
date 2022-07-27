import fs from 'fs';
import { resolve } from 'path';
import updload from '../../../../../config/updload';

import { IStorageProvider } from '../IStorageProvider';

class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(updload.tmpFolder, file),
      resolve(`${updload.tmpFolder}/${folder}`, file),
    );

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    const filename = resolve(`${updload.tmpFolder}/${folder}`, file);

    try {
      await fs.promises.stat(filename);
    } catch {
      return;
    }
    await fs.promises.unlink(filename);
  }
}

export { LocalStorageProvider };
