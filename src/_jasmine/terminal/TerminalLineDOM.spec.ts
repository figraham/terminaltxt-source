import { TerminalLineDOM } from '../../terminal/TerminalLineDOM';
import 'jasmine-dom-custom-matchers';

describe('TerminalCellDOM Units: ', () => {

  beforeAll(() => {
    // @ts-ignore
    jasmine.addMatchers(DOMCustomMatchers);
  });
  
  const testMax: number = 25;
  let dom: TerminalLineDOM;

  it('default constructor unit', () => {
    dom = new TerminalLineDOM();

    expect(dom.maxLines).toEqual(-1);
    expect(dom.lines.length).toEqual(1);
  });

  it('default add line unit', () => {
    dom = new TerminalLineDOM();
    for (let i = 0; i < 100; i++) {
      dom.addLine();
    }
    expect(dom.lines.length).toEqual(101);
  });

  it('full constructor unit', () => {
    const randomDiv: HTMLDivElement = document.createElement('div');
    dom = new TerminalLineDOM(testMax, randomDiv);

    expect(dom.maxLines).toEqual(testMax);
    expect(dom.lines.length).toEqual(1);
    expect(dom.pre).toBeChildOf(randomDiv);
    for (let i = 0; i < dom.lines.length; i++) {
      expect(dom.lines[i]).toBeChildOf(dom.display);
    }
  });

  it('removeLine unit', () => {
    dom = new TerminalLineDOM(testMax);

    for (let i = 0; i < 100; i++) {
      dom.addLine();
    }
    expect(dom.lines.length).toEqual(testMax);

    dom.removeFirstLine();
    expect(dom.lines.length).toEqual(testMax - 1);
  });

  it('setCurrentLine unit', () => {
    dom = new TerminalLineDOM();

    dom.setCurrentLine('hello there');
    expect(dom.lines[dom.lines.length - 1].innerText).toEqual('hello there');

    for (let i = 0; i < 100; i++) {
      dom.addLine();
    }

    dom.setCurrentLine('hello there');
    expect(dom.lines[dom.lines.length - 1].innerText).toEqual('hello there');
    dom.setCurrentLine(' and something else');
    expect(dom.lines[dom.lines.length - 1].innerText).toEqual(' and something else');
  });

  it('appendCurrentLine unit', () => {
    dom = new TerminalLineDOM();

    dom.appendCurrentLine('hello there');
    dom.appendCurrentLine(' and something else');
    expect(dom.lines[dom.lines.length - 1].innerText).toEqual('hello there and something else');

    for (let i = 0; i < 100; i++) {
      dom.addLine();
    }

    dom.appendCurrentLine('hello there');
    dom.appendCurrentLine(' and something else');
    expect(dom.lines[dom.lines.length - 1].innerText).toEqual('hello there and something else');
  });

  it('addLine unit', () => {
    dom = new TerminalLineDOM();
    dom.addLine('hello there');
    expect(dom.lines[dom.lines.length - 1].innerText).toEqual('hello there');
    expect(dom.lines.length).toEqual(2);
  });

  it('dom unit', () => {
    dom = new TerminalLineDOM();

    let innerParts = dom.display.innerHTML.split(/(<(?:span|span .*?)>[^<>]*?<\/span>)/);
    innerParts = innerParts.filter(value => value === 'span' ? false : value);
    expect(innerParts.length).toEqual(1);

    for (let i = 0; i < 100; i++) {
      dom.addLine();
    }

    innerParts = dom.display.innerHTML.split(/(<(?:span|span .*?)>[^<>]*?<\/span>)/);
    innerParts = innerParts.filter(value => value === 'span' ? false : value);
    expect(innerParts.length).toEqual(201);
  });

});