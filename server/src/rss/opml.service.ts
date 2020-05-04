import * as fs from "fs";
const fsAsync = fs.promises;
import * as path from "path";

import { Injectable } from '@nestjs/common';
 
@Injectable()
export class OpmlService {

  /**
   * Parse an opml file
   */
  public async getOpmlFile(): Promise<Buffer> {
    return fsAsync.readFile(path.resolve(__dirname, '../../assets/youtube_subscription_manager.xml'));
  }
}