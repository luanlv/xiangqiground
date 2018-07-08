import { pos2key, invRanks } from './util'
import * as cg from './types'

export const initial: cg.FEN = 'cnbqkqbnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P1/1C5C1/9/RNBQKQBNR';

const roles: { [letter: string]: cg.Role } = { p: 'pawn', r: 'rook', n: 'knight', b: 'bishop', q: 'queen', k: 'king' , c: 'canon'};

const letters = { pawn: 'p', rook: 'r', knight: 'n', bishop: 'b', queen: 'q', king: 'k' , canon: 'c'};


export function read(fen: cg.FEN): cg.Pieces {
  if (fen === 'start') fen = initial;
  const pieces: cg.Pieces = {};
  let row: number = 9;
  let col: number = 0;
  for (const c of fen) {
    switch (c) {
        case ' ':
            return pieces;
        case '/':
            --row;
            if (row < 0) return pieces;
            col = 0;
            break;
        case '~':
            pieces[pos2key([col, row])].promoted = true;
            break;
        default:
            const nb = c.charCodeAt(0);
            if (nb <= 57) {
                col += nb - 48;
            } else {
              const role = c.toLowerCase();
              pieces[pos2key([col, row])] = {
                role: roles[role],
                color: (c === role ? 'black' : 'white') as cg.Color
              };
              ++col;
            }
    }
  }
  return pieces;
}

export function write(pieces: cg.Pieces): cg.FEN {

    // console.log(
    //     "pieces",
    //     {
    //         pieces: pieces
    //     }
    // )

  let piece: cg.Piece, letter: string;


  return invRanks.map(y => cg.files.map(x => {
      piece = pieces[pos2key([x, y])];
      if (piece) {
        letter = letters[piece.role];
        return piece.color === 'white' ? letter.toUpperCase() : letter;
      } else return '1';
    }).join('')
  ).join('/').replace(/1{2,}/g, s => s.length.toString());
}
