export type Color = 'white' | 'black';
export type Role = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn' | 'canon';
export type Key = '00' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '60' | '62' | '63' | '64' | '65' | '66' | '67' | '68' | '69' | '70' | '72' | '73' | '74' | '75' | '76' | '77' | '78' | '79' | '80' | '82' | '83' | '84' | '85' | '86' | '87' | '88' | '89';
export type File = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type Rank = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type FEN = string;
export type Pos = [number, number];
export interface Piece {
  role: Role;
  color: Color;
  promoted?: boolean;
}
export interface Drop {
  role: Role;
  key: Key;
}
export interface Pieces {
  [key: string]: Piece;
}
export interface PiecesDiff {
  [key: string]: Piece | null;
}

export type KeyPair = [Key, Key];

export type NumberPair = [number, number];

export type NumberQuad = [number, number, number, number];

export interface Dests {
  [key: string]: Key[]
}
export interface MaterialDiffSide {
  [role: string]: number;
}
export interface MaterialDiff {
  white: MaterialDiffSide;
  black: MaterialDiffSide;
}
export interface Elements {
  board: HTMLElement;
  ghost?: HTMLElement;
  svg?: SVGElement;
}
export interface Dom {
  elements: Elements,
  bounds: Memo<ClientRect>;
  redraw: () => void;
  redrawNow: (skipSvg?: boolean) => void;
  unbind?: Unbind;
  destroyed?: boolean;
  relative?: boolean; // don't compute bounds, use relative % to place pieces
}
export interface Exploding {
  stage: number;
  keys: Key[];
}

export interface MoveMetadata {
  premove: boolean;
  ctrlKey?: boolean;
  holdTime?: number;
  captured?: Piece;
  predrop?: boolean;
}
export interface SetPremoveMetadata {
  ctrlKey?: boolean;
}

export type WindowEvent = 'onscroll' | 'onresize';

export type MouchEvent = MouseEvent & TouchEvent;

export interface KeyedNode extends HTMLElement {
  cgKey: Key;
}
export interface PieceNode extends KeyedNode {
  cgPiece: string;
  cgAnimating?: boolean;
  cgFading?: boolean;
  cgDragging?: boolean;
}
export interface SquareNode extends KeyedNode { }

export interface Memo<A> { (): A; clear: () => void; }

export interface Timer {
  start: () => void;
  cancel: () => void;
  stop: () => number;
}

export type Redraw = () => void;
export type Unbind = () => void;
export type Timestamp = number;
export type Milliseconds = number;
export type KHz = number;

export const files: File[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
export const ranks: Rank[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
