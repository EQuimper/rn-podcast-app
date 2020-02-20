import { action, observable, reaction } from 'mobx';
import RNFetchBlob from 'rn-fetch-blob';

import RootStore from './RootStore';

export class DownloadElement {
  public url: string;
  public id: string;

  @observable
  public progress: number = 0;

  constructor(id: string, url: string) {
    this.id = id;
    this.url = url;

    reaction(
      () => this.progress,
      progress => {
        console.log(`element downloading with id ${this.id}: ${progress}%`);
      },
    );
  }

  @action
  public setProgress = (written: number, total: number) => {
    this.progress = written / total;
  };
}

class DownloadManagerStore {
  private rootStore: RootStore;

  @observable
  public queue: DownloadElement[] = [];

  @observable
  public downloadElements: Map<string, DownloadElement> = new Map();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @action
  public addToQueue = (id: string, url: string) => {
    if (this.downloadElements.has(id)) {
      return;
    }

    const element = new DownloadElement(id, url);
    this.downloadElements.set(id, element);
    this.queue.push(element);

    this.startDownload(element);
  };

  private startDownload = (downloadElement: DownloadElement) => {
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', downloadElement.url)
      .uploadProgress(downloadElement.setProgress)
      .then(res => {
        console.log('The file is save to ', res.path());
      });
  };

  public getDownloadElementById(id: string) {
    return this.downloadElements.get(id);
  }
}

export default DownloadManagerStore;
