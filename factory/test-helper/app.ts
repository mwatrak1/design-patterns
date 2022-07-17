class TestHelper {
  private cleanerHelper: XMLHelper
  constructor() {
    this.cleanerHelper = new XMLHelper();
  }
  private makeCleaner(): IDataCleaner {
    return this.cleanerHelper.makeCleaner();
  }

  setupTest() {
    const c = this.makeCleaner();
    c.cleanData();
  }
}

interface IDataCleaner {
  cleanData(): void;
}

class XMLHelper {
  makeCleaner() {
    return new XMLCleaner();
  }
}

class XMLCleaner implements IDataCleaner{
  cleanData(){
    console.log('Cleaning the data');
  }
}

// Appliction

const helper = new TestHelper();
helper.setupTest();
