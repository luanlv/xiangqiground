import * as cg from './types';

export const colors: cg.Color[] = ['white', 'black'];

export const invRanks: cg.Rank[] = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

export const invFiles: cg.Rank[] = [8, 7, 6, 5, 4, 3, 2, 1, 0];

export const allKeys: cg.Key[] = Array.prototype.concat(...cg.files.map(c => cg.ranks.map(r => c + '' + r)));

export const pos2key = (pos: cg.Pos) => allKeys[10 * pos[0] + pos[1]];

export const key2pos = (k: cg.Key) => [k.charCodeAt(0) - 48, k.charCodeAt(1) - 48] as cg.Pos;

// console.log('allkey:', {
//     allkeys: allKeys
// })
// console.log({
//     keyToPost: key2pos('46')
// })
// console.log({
//     char: "00".charCodeAt(0),
//     post2key: pos2key([0,9])
// })

export function memo<A>(f: () => A): cg.Memo<A> {
  let v: A | undefined;
  const ret: any = () => {
    if (v === undefined) v = f();
    return v;
  };
  ret.clear = () => { v = undefined; };
  return ret;
}

export const timer: () => cg.Timer = () => {
  let startAt: number | undefined;
  return {
    start() { startAt = Date.now(); },
    cancel() { startAt = undefined; },
    stop() {
      if (!startAt) return 0;
      const time = Date.now() - startAt;
      startAt = undefined;
      return time;
    }
  };
}

export const opposite = (c: cg.Color) => c === 'white' ? 'black' : 'white';

export function containsX<X>(xs: X[] | undefined, x: X): boolean {
  return xs !== undefined && xs.indexOf(x) !== -1;
}

export const distanceSq: (pos1: cg.Pos, pos2: cg.Pos) => number = (pos1, pos2) => {
  return Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2);
}

export const samePiece: (p1: cg.Piece, p2: cg.Piece) => boolean = (p1, p2) =>
  p1.role === p2.role && p1.color === p2.color;

export const computeIsTrident = () => window.navigator.userAgent.indexOf('Trident/') > -1;

const posToTranslateBase: (pos: cg.Pos, asWhite: boolean, xFactor: number, yFactor: number) => cg.NumberPair =
(pos, asWhite, xFactor, yFactor) =>
{
  // console.log("posToTranslateBase",
  //     {
  //         pos: pos,
  //         asWhite: asWhite,
  //         xFactor: xFactor,
  //         yFactor: yFactor,
  //     })
  return [
    (asWhite ? pos[0]: 9 - pos[0]  - 1) * xFactor,
    (asWhite ? 10 - pos[1] - 1: pos[1] - 1) * yFactor
  ];
}
export const posToTranslateAbs = (bounds: ClientRect) => {
    // console.log(
    //     "posToTranslateAbs",
    //     {
    //         bounds: bounds
    //     }
    // )
  const xFactor = bounds.width / 9,
  yFactor = bounds.height / 10;
  return (pos: cg.Pos, asWhite: boolean) => posToTranslateBase(pos, asWhite, xFactor, yFactor);
};

export const posToTranslateRel: (pos: cg.Pos, asWhite: boolean) => cg.NumberPair =
  (pos, asWhite) => {
      // console.log(
      //     "posToTranslateRel",
      //     {
      //         pos: pos,
      //         asWhite: asWhite
      //     }
      // )
  return posToTranslateBase(pos, asWhite, 12.5, 12.5);
}

export const translateAbs = (el: HTMLElement, pos: cg.Pos) => {
    // console.log(
    //     "translateAbs",
    //     {
    //         el: el,
    //         pos: pos
    //     }
    // )
  el.style.transform = `translate(${pos[0]}px,${pos[1]}px)`;
}

export const translateRel = (el: HTMLElement, percents: cg.NumberPair) => {
  // console.log(
  //     "translateRel",
  //     {
  //         el: el,
  //         percents: percents
  //     }
  // )
  el.style.left = percents[0] + '%';
  el.style.top = percents[1] + '%';
}

export const setVisible = (el: HTMLElement, v: boolean) => {
  el.style.visibility = v ? 'visible' : 'hidden';
}

// touchend has no position!
export const eventPosition: (e: cg.MouchEvent) => cg.NumberPair | undefined = e => {
  if (e.clientX || e.clientX === 0) return [e.clientX, e.clientY];
  if (e.touches && e.targetTouches[0]) return [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  return undefined;
}

export const isRightButton = (e: MouseEvent) => e.buttons === 2 || e.button === 2;

export const createEl = (tagName: string, className?: string) => {
  const el = document.createElement(tagName);
  if (className) el.className = className;
  return el;
}

export const raf = (window.requestAnimationFrame || window.setTimeout).bind(window);