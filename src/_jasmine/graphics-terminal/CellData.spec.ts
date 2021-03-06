import { CellData } from '../../graphics-terminal/CellData';
import { getIndex } from '../../utils';

describe('CellData Units: ', () => {
  
  const width: number = 80;
  const height: number = 25;
  let cellData: CellData;

  beforeEach(() => {
    cellData = new CellData(width, height);
  });

  it('constructor unit', () => {
    expect(cellData.getWidth()).toEqual(width);
    expect(cellData.getHeight()).toEqual(height);
    // @ts-ignore
    expect(cellData.data.length).toEqual(cellData.numberOfCells());
    // @ts-ignore
    expect(cellData.changed.length).toEqual(cellData.numberOfCells());
  });

  it('init values unit', () => {
    for (let i = 0; i < cellData.numberOfCells(); i++) {
      expect(cellData.getCell(i)).toEqual(0);
    }
    for (let i = 0; i < cellData.numberOfCells(); i++) {
      expect(cellData.hasBeenChanged(i)).toEqual(true);
    }
  });

  it('doneChange unit', () => {
    let randoms = [];
    for (let i = 0; i < 20; i++) {
      randoms.push({
        col: Math.floor(Math.random() * width),
        row: Math.floor(Math.random() * height),
      });
    }
    for (let i = 0; i < randoms.length; i++) {
      cellData.doneChange(getIndex(randoms[i].col, randoms[i].row, cellData));
    }
    for (let i = 0; i < randoms.length; i++) {
      expect(cellData.hasBeenChanged(getIndex(randoms[i].col, randoms[i].row, cellData))).toEqual(false);
    }
  });

  it('setCell unit', () => {
    let randoms = [];
    for (let i = 0; i < 20; i++) {
      randoms.push({
        col: Math.floor(Math.random() * width),
        row: Math.floor(Math.random() * height),
      });
    }
    for (let i = 0; i < randoms.length; i++) {
      cellData.setCell(1, getIndex(randoms[i].col, randoms[i].row, cellData));
    }
    for (let i = 0; i < randoms.length; i++) {
      expect(cellData.getCell(getIndex(randoms[i].col, randoms[i].row, cellData))).toEqual(1);
    }
  });

});