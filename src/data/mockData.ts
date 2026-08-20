/**
 * @file mockData.ts
 * Automatisch generierter und gesicherter Stand für GitHub.
 * Generiert am: 20.8.2026, 14:08:22
 * Gesichert mit GitHub 2FA & Versionskontrolle.
 */

import { Guest, Table, WeddingQuote, TaxiService } from '../types';

export const INITIAL_TABLES: Table[] = [
  {
    "id": "t-1",
    "name": "Tisch 1",
    "number": 1,
    "shape": "head",
    "seatsCount": 8,
    "seatRange": "1–8",
    "description": "",
    "tag": "",
    "x": 35,
    "y": 10,
    "topSeats": [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8
    ]
  },
  {
    "id": "t-2",
    "name": "Tisch 2",
    "number": 2,
    "shape": "head",
    "seatsCount": 6,
    "seatRange": "9–14",
    "description": "",
    "tag": "",
    "x": 65,
    "y": 10,
    "bottomSeats": [
      9,
      10,
      11,
      12,
      13,
      14
    ]
  },
  {
    "id": "t-3",
    "name": "Tisch 3",
    "number": 3,
    "shape": "rect",
    "seatsCount": 6,
    "seatRange": "15–20",
    "description": "",
    "tag": "",
    "x": 10,
    "y": 28,
    "leftSeats": [
      15,
      16,
      17
    ],
    "rightSeats": [
      18,
      19,
      20
    ]
  },
  {
    "id": "t-4",
    "name": "Tisch 4",
    "number": 4,
    "shape": "rect",
    "seatsCount": 6,
    "seatRange": "21–26",
    "description": "",
    "tag": "",
    "x": 28,
    "y": 28,
    "leftSeats": [
      21,
      22,
      23
    ],
    "rightSeats": [
      24,
      25,
      26
    ]
  },
  {
    "id": "t-5",
    "name": "Tisch 5",
    "number": 5,
    "shape": "rect",
    "seatsCount": 6,
    "seatRange": "27–32",
    "description": "",
    "tag": "",
    "x": 48,
    "y": 28,
    "leftSeats": [
      27,
      28,
      29
    ],
    "rightSeats": [
      30,
      31,
      32
    ]
  },
  {
    "id": "t-6",
    "name": "Tisch 6",
    "number": 6,
    "shape": "rect",
    "seatsCount": 7,
    "seatRange": "33–39",
    "description": "",
    "tag": "",
    "x": 68,
    "y": 28,
    "leftSeats": [
      33,
      34,
      35,
      36
    ],
    "rightSeats": [
      37,
      38,
      39
    ]
  },
  {
    "id": "t-7",
    "name": "Tisch 7",
    "number": 7,
    "shape": "rect",
    "seatsCount": 6,
    "seatRange": "40–45",
    "description": "",
    "tag": "",
    "x": 88,
    "y": 28,
    "leftSeats": [
      40,
      41,
      42
    ],
    "rightSeats": [
      43,
      44,
      45
    ]
  },
  {
    "id": "t-8",
    "name": "Tisch 8",
    "number": 8,
    "shape": "rect",
    "seatsCount": 6,
    "seatRange": "46–51",
    "description": "",
    "tag": "",
    "x": 10,
    "y": 48,
    "leftSeats": [
      46,
      47,
      48
    ],
    "rightSeats": [
      49,
      50,
      51
    ]
  },
  {
    "id": "t-9",
    "name": "Tisch 9",
    "number": 9,
    "shape": "rect",
    "seatsCount": 8,
    "seatRange": "52–59",
    "description": "",
    "tag": "",
    "x": 28,
    "y": 48,
    "leftSeats": [
      52,
      53,
      54,
      55
    ],
    "rightSeats": [
      56,
      57,
      58,
      59
    ]
  },
  {
    "id": "t-10",
    "name": "Tisch 10",
    "number": 10,
    "shape": "rect",
    "seatsCount": 7,
    "seatRange": "60–66",
    "description": "",
    "tag": "",
    "x": 48,
    "y": 48,
    "leftSeats": [
      60,
      61,
      62
    ],
    "rightSeats": [
      63,
      64,
      65,
      66
    ]
  },
  {
    "id": "t-11",
    "name": "Tisch 11",
    "number": 11,
    "shape": "rect",
    "seatsCount": 8,
    "seatRange": "67–74",
    "description": "",
    "tag": "",
    "x": 68,
    "y": 48,
    "leftSeats": [
      67,
      68,
      69,
      70
    ],
    "rightSeats": [
      71,
      72,
      73,
      74
    ]
  },
  {
    "id": "t-12",
    "name": "Tisch 12",
    "number": 12,
    "shape": "rect",
    "seatsCount": 8,
    "seatRange": "75–82",
    "description": "",
    "tag": "",
    "x": 88,
    "y": 48,
    "leftSeats": [
      75,
      76,
      77
    ],
    "rightSeats": [
      78,
      79,
      80,
      81,
      82
    ]
  },
  {
    "id": "t-13",
    "name": "Tisch 13",
    "number": 13,
    "shape": "rect",
    "seatsCount": 9,
    "seatRange": "83–91",
    "description": "",
    "tag": "",
    "x": 12,
    "y": 68,
    "leftSeats": [
      83,
      84,
      85,
      86,
      87
    ],
    "rightSeats": [
      88,
      89,
      90,
      91
    ]
  },
  {
    "id": "t-14",
    "name": "Tisch 14",
    "number": 14,
    "shape": "rect",
    "seatsCount": 8,
    "seatRange": "92–99",
    "description": "",
    "tag": "",
    "x": 36,
    "y": 68,
    "leftSeats": [
      92,
      93,
      94,
      95
    ],
    "rightSeats": [
      96,
      97,
      98,
      99
    ]
  },
  {
    "id": "t-15",
    "name": "Tisch 15",
    "number": 15,
    "shape": "rect",
    "seatsCount": 8,
    "seatRange": "100–107",
    "description": "",
    "tag": "",
    "x": 60,
    "y": 68,
    "leftSeats": [
      100,
      101,
      102,
      103
    ],
    "rightSeats": [
      104,
      105,
      106,
      107
    ]
  },
  {
    "id": "t-16",
    "name": "Tisch 16",
    "number": 16,
    "shape": "rect",
    "seatsCount": 11,
    "seatRange": "108–118",
    "description": "",
    "tag": "",
    "x": 84,
    "y": 68,
    "leftSeats": [
      108,
      109,
      110,
      111,
      112,
      113,
      114,
      115
    ],
    "rightSeats": [
      116,
      117,
      118
    ]
  },
  {
    "id": "t-17",
    "name": "Tisch 17",
    "number": 17,
    "shape": "rect",
    "seatsCount": 10,
    "seatRange": "119–128",
    "description": "",
    "tag": "",
    "x": 12,
    "y": 86,
    "leftSeats": [
      119,
      120,
      121,
      122,
      123
    ],
    "rightSeats": [
      124,
      125,
      126,
      127,
      128
    ]
  },
  {
    "id": "t-18",
    "name": "Tisch 18",
    "number": 18,
    "shape": "rect",
    "seatsCount": 9,
    "seatRange": "129–137",
    "description": "",
    "tag": "",
    "x": 36,
    "y": 86,
    "leftSeats": [
      129,
      130,
      131,
      132,
      133
    ],
    "rightSeats": [
      134,
      135,
      136,
      137
    ]
  },
  {
    "id": "t-19",
    "name": "Tisch 19",
    "number": 19,
    "shape": "rect",
    "seatsCount": 7,
    "seatRange": "138–144",
    "description": "",
    "tag": "",
    "x": 60,
    "y": 86,
    "leftSeats": [
      138,
      139,
      140,
      141
    ],
    "rightSeats": [
      142,
      143,
      144
    ]
  },
  {
    "id": "t-20",
    "name": "Tisch 20",
    "number": 20,
    "shape": "rect",
    "seatsCount": 10,
    "seatRange": "145–154",
    "description": "",
    "tag": "",
    "x": 84,
    "y": 86,
    "leftSeats": [
      145,
      146,
      147,
      148,
      149
    ],
    "rightSeats": [
      150,
      151,
      152,
      153,
      154
    ]
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    "id": "g-1",
    "name": "Anne",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 1,
    "globalSeat": 1,
    "role": "guest",
    "group": "Brautpaar & Familie"
  },
  {
    "id": "g-2",
    "name": "Felix",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 2,
    "globalSeat": 2,
    "role": "guest",
    "group": "Brautpaar & Familie"
  },
  {
    "id": "g-3",
    "name": "Dino",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 3,
    "globalSeat": 3,
    "role": "groom",
    "group": "Brautpaar",
    "notes": "Bräutigam"
  },
  {
    "id": "g-4",
    "name": "Anja",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 4,
    "globalSeat": 4,
    "role": "bride",
    "group": "Brautpaar",
    "notes": "Braut"
  },
  {
    "id": "g-5",
    "name": "Toni",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 5,
    "globalSeat": 5,
    "role": "guest",
    "group": "Brautpaar & Familie"
  },
  {
    "id": "g-6",
    "name": "Vito",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 6,
    "globalSeat": 6,
    "role": "guest",
    "group": "Brautpaar & Familie"
  },
  {
    "id": "g-7",
    "name": "Dani",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 7,
    "globalSeat": 7,
    "role": "guest",
    "group": "Brautpaar & Familie"
  },
  {
    "id": "g-8",
    "name": "Martin",
    "tableId": "t-1",
    "tableName": "Tisch 1",
    "seat": 8,
    "globalSeat": 8,
    "role": "guest",
    "group": "Brautpaar & Familie"
  },
  {
    "id": "g-9",
    "name": "Günther",
    "tableId": "t-2",
    "tableName": "Tisch 2",
    "seat": 1,
    "globalSeat": 9,
    "role": "family",
    "group": "Familie & Eltern"
  },
  {
    "id": "g-10",
    "name": "Erika",
    "tableId": "t-2",
    "tableName": "Tisch 2",
    "seat": 2,
    "globalSeat": 10,
    "role": "family",
    "group": "Familie & Eltern"
  },
  {
    "id": "g-11",
    "name": "Brigitte",
    "tableId": "t-2",
    "tableName": "Tisch 2",
    "seat": 3,
    "globalSeat": 11,
    "role": "family",
    "group": "Familie & Eltern"
  },
  {
    "id": "g-12",
    "name": "Peter",
    "tableId": "t-2",
    "tableName": "Tisch 2",
    "seat": 4,
    "globalSeat": 12,
    "role": "family",
    "group": "Familie & Eltern"
  },
  {
    "id": "g-13",
    "name": "Ingrid",
    "tableId": "t-2",
    "tableName": "Tisch 2",
    "seat": 5,
    "globalSeat": 13,
    "role": "family",
    "group": "Familie & Eltern"
  },
  {
    "id": "g-14",
    "name": "Roswitha",
    "tableId": "t-2",
    "tableName": "Tisch 2",
    "seat": 6,
    "globalSeat": 14,
    "role": "family",
    "group": "Familie & Eltern"
  },
  {
    "id": "g-15",
    "name": "Heike",
    "tableId": "t-3",
    "tableName": "Tisch 3",
    "seat": 1,
    "globalSeat": 15,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-16",
    "name": "Michael",
    "tableId": "t-3",
    "tableName": "Tisch 3",
    "seat": 2,
    "globalSeat": 16,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-17",
    "name": "Flo",
    "tableId": "t-3",
    "tableName": "Tisch 3",
    "seat": 3,
    "globalSeat": 17,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-18",
    "name": "Jutta",
    "tableId": "t-3",
    "tableName": "Tisch 3",
    "seat": 4,
    "globalSeat": 18,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-19",
    "name": "Christian",
    "tableId": "t-3",
    "tableName": "Tisch 3",
    "seat": 5,
    "globalSeat": 19,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-20",
    "name": "Malika",
    "tableId": "t-3",
    "tableName": "Tisch 3",
    "seat": 6,
    "globalSeat": 20,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-21",
    "name": "Luca",
    "tableId": "t-4",
    "tableName": "Tisch 4",
    "seat": 1,
    "globalSeat": 21,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-22",
    "name": "Sebastian",
    "tableId": "t-4",
    "tableName": "Tisch 4",
    "seat": 2,
    "globalSeat": 22,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-23",
    "name": "Melissa",
    "tableId": "t-4",
    "tableName": "Tisch 4",
    "seat": 3,
    "globalSeat": 23,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-24",
    "name": "Gusti",
    "tableId": "t-4",
    "tableName": "Tisch 4",
    "seat": 4,
    "globalSeat": 24,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-25",
    "name": "Celina",
    "tableId": "t-4",
    "tableName": "Tisch 4",
    "seat": 5,
    "globalSeat": 25,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-26",
    "name": "Noah",
    "tableId": "t-4",
    "tableName": "Tisch 4",
    "seat": 6,
    "globalSeat": 26,
    "role": "guest",
    "group": "Familie"
  },
  {
    "id": "g-27",
    "name": "Cosetta",
    "tableId": "t-5",
    "tableName": "Tisch 5",
    "seat": 1,
    "globalSeat": 27,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-28",
    "name": "Beppo",
    "tableId": "t-5",
    "tableName": "Tisch 5",
    "seat": 2,
    "globalSeat": 28,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-29",
    "name": "Giovanni",
    "tableId": "t-5",
    "tableName": "Tisch 5",
    "seat": 3,
    "globalSeat": 29,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-30",
    "name": "Laura",
    "tableId": "t-5",
    "tableName": "Tisch 5",
    "seat": 4,
    "globalSeat": 30,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-31",
    "name": "Patrick",
    "tableId": "t-5",
    "tableName": "Tisch 5",
    "seat": 5,
    "globalSeat": 31,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-32",
    "name": "Diana",
    "tableId": "t-5",
    "tableName": "Tisch 5",
    "seat": 6,
    "globalSeat": 32,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-33",
    "name": "Nadja",
    "tableId": "t-6",
    "tableName": "Tisch 6",
    "seat": 1,
    "globalSeat": 33,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-34",
    "name": "Gino",
    "tableId": "t-6",
    "tableName": "Tisch 6",
    "seat": 2,
    "globalSeat": 34,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-35",
    "name": "Enzo",
    "tableId": "t-6",
    "tableName": "Tisch 6",
    "seat": 3,
    "globalSeat": 35,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-36",
    "name": "Pauline",
    "tableId": "t-6",
    "tableName": "Tisch 6",
    "seat": 4,
    "globalSeat": 36,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-37",
    "name": "Luca",
    "tableId": "t-6",
    "tableName": "Tisch 6",
    "seat": 5,
    "globalSeat": 37,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-38",
    "name": "Timo",
    "tableId": "t-6",
    "tableName": "Tisch 6",
    "seat": 6,
    "globalSeat": 38,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-39",
    "name": "Julia",
    "tableId": "t-6",
    "tableName": "Tisch 6",
    "seat": 7,
    "globalSeat": 39,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-40",
    "name": "Sven",
    "tableId": "t-7",
    "tableName": "Tisch 7",
    "seat": 1,
    "globalSeat": 40,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-41",
    "name": "Phil",
    "tableId": "t-7",
    "tableName": "Tisch 7",
    "seat": 2,
    "globalSeat": 41,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-42",
    "name": "Samuel",
    "tableId": "t-7",
    "tableName": "Tisch 7",
    "seat": 3,
    "globalSeat": 42,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-43",
    "name": "Lars",
    "tableId": "t-7",
    "tableName": "Tisch 7",
    "seat": 4,
    "globalSeat": 43,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-44",
    "name": "Melanie",
    "tableId": "t-7",
    "tableName": "Tisch 7",
    "seat": 5,
    "globalSeat": 44,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-45",
    "name": "Michelle",
    "tableId": "t-7",
    "tableName": "Tisch 7",
    "seat": 6,
    "globalSeat": 45,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-46",
    "name": "Max",
    "tableId": "t-8",
    "tableName": "Tisch 8",
    "seat": 1,
    "globalSeat": 46,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-47",
    "name": "Lena",
    "tableId": "t-8",
    "tableName": "Tisch 8",
    "seat": 2,
    "globalSeat": 47,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-48",
    "name": "Bernd",
    "tableId": "t-8",
    "tableName": "Tisch 8",
    "seat": 3,
    "globalSeat": 48,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-49",
    "name": "Manu",
    "tableId": "t-8",
    "tableName": "Tisch 8",
    "seat": 4,
    "globalSeat": 49,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-50",
    "name": "Axel",
    "tableId": "t-8",
    "tableName": "Tisch 8",
    "seat": 5,
    "globalSeat": 50,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-51",
    "name": "Manuela",
    "tableId": "t-8",
    "tableName": "Tisch 8",
    "seat": 6,
    "globalSeat": 51,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-52",
    "name": "Max",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 1,
    "globalSeat": 52,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-53",
    "name": "Caro",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 2,
    "globalSeat": 53,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-54",
    "name": "Flo",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 3,
    "globalSeat": 54,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-55",
    "name": "Alisa",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 4,
    "globalSeat": 55,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-56",
    "name": "Laurin",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 5,
    "globalSeat": 56,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-57",
    "name": "Christian",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 6,
    "globalSeat": 57,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-58",
    "name": "Eli",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 7,
    "globalSeat": 58,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-59",
    "name": "Tami",
    "tableId": "t-9",
    "tableName": "Tisch 9",
    "seat": 8,
    "globalSeat": 59,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-60",
    "name": "Rene",
    "tableId": "t-10",
    "tableName": "Tisch 10",
    "seat": 1,
    "globalSeat": 60,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-61",
    "name": "Jenny",
    "tableId": "t-10",
    "tableName": "Tisch 10",
    "seat": 2,
    "globalSeat": 61,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-62",
    "name": "Alex",
    "tableId": "t-10",
    "tableName": "Tisch 10",
    "seat": 3,
    "globalSeat": 62,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-63",
    "name": "Elio",
    "tableId": "t-10",
    "tableName": "Tisch 10",
    "seat": 4,
    "globalSeat": 63,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-64",
    "name": "Toni",
    "tableId": "t-10",
    "tableName": "Tisch 10",
    "seat": 5,
    "globalSeat": 64,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-65",
    "name": "Vanessa",
    "tableId": "t-10",
    "tableName": "Tisch 10",
    "seat": 6,
    "globalSeat": 65,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-66",
    "name": "Max",
    "tableId": "t-10",
    "tableName": "Tisch 10",
    "seat": 7,
    "globalSeat": 66,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-67",
    "name": "Theo",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 1,
    "globalSeat": 67,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-68",
    "name": "Eva",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 2,
    "globalSeat": 68,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-69",
    "name": "Matze",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 3,
    "globalSeat": 69,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-70",
    "name": "Fred",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 4,
    "globalSeat": 70,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-71",
    "name": "Matti",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 5,
    "globalSeat": 71,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-72",
    "name": "Katrin",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 6,
    "globalSeat": 72,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-73",
    "name": "Rob",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 7,
    "globalSeat": 73,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-74",
    "name": "Jule",
    "tableId": "t-11",
    "tableName": "Tisch 11",
    "seat": 8,
    "globalSeat": 74,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-75",
    "name": "Dominique",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 1,
    "globalSeat": 75,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-76",
    "name": "Christoph",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 2,
    "globalSeat": 76,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-77",
    "name": "Fabi",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 3,
    "globalSeat": 77,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-78",
    "name": "Juri",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 4,
    "globalSeat": 78,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-79",
    "name": "Alba",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 5,
    "globalSeat": 79,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-80",
    "name": "Hannah",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 6,
    "globalSeat": 80,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-81",
    "name": "Georg",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 7,
    "globalSeat": 81,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-82",
    "name": "Patrick",
    "tableId": "t-12",
    "tableName": "Tisch 12",
    "seat": 8,
    "globalSeat": 82,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-83",
    "name": "Charlotte",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 1,
    "globalSeat": 83,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-84",
    "name": "Mathilde",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 2,
    "globalSeat": 84,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-85",
    "name": "Tom",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 3,
    "globalSeat": 85,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-86",
    "name": "Frauke",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 4,
    "globalSeat": 86,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-87",
    "name": "Isi",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 5,
    "globalSeat": 87,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-88",
    "name": "Sefa",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 6,
    "globalSeat": 88,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-89",
    "name": "Mehmet",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 7,
    "globalSeat": 89,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-90",
    "name": "Nilay",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 8,
    "globalSeat": 90,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-91",
    "name": "Ines",
    "tableId": "t-13",
    "tableName": "Tisch 13",
    "seat": 9,
    "globalSeat": 91,
    "role": "guest",
    "group": "Familie & Freunde"
  },
  {
    "id": "g-92",
    "name": "Jonas",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 1,
    "globalSeat": 92,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-93",
    "name": "Mira",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 2,
    "globalSeat": 93,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-94",
    "name": "Fabian",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 3,
    "globalSeat": 94,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-95",
    "name": "Julia",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 4,
    "globalSeat": 95,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-96",
    "name": "Sebastian",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 5,
    "globalSeat": 96,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-97",
    "name": "Matteo",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 6,
    "globalSeat": 97,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-98",
    "name": "Melanie",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 7,
    "globalSeat": 98,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-99",
    "name": "Dani",
    "tableId": "t-14",
    "tableName": "Tisch 14",
    "seat": 8,
    "globalSeat": 99,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-100",
    "name": "Marco",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 1,
    "globalSeat": 100,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-101",
    "name": "Marina",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 2,
    "globalSeat": 101,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-102",
    "name": "Michael",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 3,
    "globalSeat": 102,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-103",
    "name": "Miriam",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 4,
    "globalSeat": 103,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-104",
    "name": "Flo",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 5,
    "globalSeat": 104,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-105",
    "name": "Philipp",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 6,
    "globalSeat": 105,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-106",
    "name": "Marcel",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 7,
    "globalSeat": 106,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-107",
    "name": "Nele",
    "tableId": "t-15",
    "tableName": "Tisch 15",
    "seat": 8,
    "globalSeat": 107,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-108",
    "name": "Elena",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 1,
    "globalSeat": 108,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-109",
    "name": "Sebastian",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 2,
    "globalSeat": 109,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-110",
    "name": "Marie",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 3,
    "globalSeat": 110,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-111",
    "name": "Jo",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 4,
    "globalSeat": 111,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-112",
    "name": "Sandra",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 5,
    "globalSeat": 112,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-113",
    "name": "Georg",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 6,
    "globalSeat": 113,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-114",
    "name": "Anton",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 7,
    "globalSeat": 114,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-115",
    "name": "Theo",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 8,
    "globalSeat": 115,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-116",
    "name": "Ela",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 9,
    "globalSeat": 116,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-117",
    "name": "Stephan",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 10,
    "globalSeat": 117,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-118",
    "name": "Jonah",
    "tableId": "t-16",
    "tableName": "Tisch 16",
    "seat": 11,
    "globalSeat": 118,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-119",
    "name": "Lou",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 1,
    "globalSeat": 119,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-120",
    "name": "Ellie",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 2,
    "globalSeat": 120,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-121",
    "name": "Lennart",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 3,
    "globalSeat": 121,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-122",
    "name": "Britta",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 4,
    "globalSeat": 122,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-123",
    "name": "Christina",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 5,
    "globalSeat": 123,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-124",
    "name": "Christian",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 6,
    "globalSeat": 124,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-125",
    "name": "Lotta",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 7,
    "globalSeat": 125,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-126",
    "name": "Bastian",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 8,
    "globalSeat": 126,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-127",
    "name": "Julia",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 9,
    "globalSeat": 127,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-128",
    "name": "Liv",
    "tableId": "t-17",
    "tableName": "Tisch 17",
    "seat": 10,
    "globalSeat": 128,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-129",
    "name": "Fabi",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 1,
    "globalSeat": 129,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-130",
    "name": "Linus",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 2,
    "globalSeat": 130,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-131",
    "name": "Elias",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 3,
    "globalSeat": 131,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-132",
    "name": "Lisa",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 4,
    "globalSeat": 132,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-133",
    "name": "Annika",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 5,
    "globalSeat": 133,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-134",
    "name": "Theo",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 6,
    "globalSeat": 134,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-135",
    "name": "Timo",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 7,
    "globalSeat": 135,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-136",
    "name": "Dustin",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 8,
    "globalSeat": 136,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-137",
    "name": "Rainer",
    "tableId": "t-18",
    "tableName": "Tisch 18",
    "seat": 9,
    "globalSeat": 137,
    "role": "guest",
    "group": "Freunde"
  },
  {
    "id": "g-138",
    "name": "Verena",
    "tableId": "t-19",
    "tableName": "Tisch 19",
    "seat": 1,
    "globalSeat": 138,
    "role": "guest",
    "group": "Party"
  },
  {
    "id": "g-139",
    "name": "Caro",
    "tableId": "t-19",
    "tableName": "Tisch 19",
    "seat": 2,
    "globalSeat": 139,
    "role": "guest",
    "group": "Party"
  },
  {
    "id": "g-140",
    "name": "Phillip",
    "tableId": "t-19",
    "tableName": "Tisch 19",
    "seat": 3,
    "globalSeat": 140,
    "role": "guest",
    "group": "Party"
  },
  {
    "id": "g-141",
    "name": "Alex",
    "tableId": "t-19",
    "tableName": "Tisch 19",
    "seat": 4,
    "globalSeat": 141,
    "role": "guest",
    "group": "Party"
  },
  {
    "id": "g-142",
    "name": "Matthäus",
    "tableId": "t-19",
    "tableName": "Tisch 19",
    "seat": 5,
    "globalSeat": 142,
    "role": "guest",
    "group": "Party"
  },
  {
    "id": "g-143",
    "name": "Felix",
    "tableId": "t-19",
    "tableName": "Tisch 19",
    "seat": 6,
    "globalSeat": 143,
    "role": "guest",
    "group": "Party"
  },
  {
    "id": "g-144",
    "name": "Jonas",
    "tableId": "t-19",
    "tableName": "Tisch 19",
    "seat": 7,
    "globalSeat": 144,
    "role": "guest",
    "group": "Party"
  },
  {
    "id": "g-145",
    "name": "Anton",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 1,
    "globalSeat": 145,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-146",
    "name": "Clara",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 2,
    "globalSeat": 146,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-147",
    "name": "Frauke",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 3,
    "globalSeat": 147,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-148",
    "name": "Stefan",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 4,
    "globalSeat": 148,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-149",
    "name": "Sophia",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 5,
    "globalSeat": 149,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-150",
    "name": "Emil",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 6,
    "globalSeat": 150,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-151",
    "name": "Emma",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 7,
    "globalSeat": 151,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-152",
    "name": "Chrissi",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 8,
    "globalSeat": 152,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-153",
    "name": "David",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 9,
    "globalSeat": 153,
    "role": "guest",
    "group": "Feierfreunde"
  },
  {
    "id": "g-154",
    "name": "Gast 154",
    "tableId": "t-20",
    "tableName": "Tisch 20",
    "seat": 10,
    "globalSeat": 154,
    "role": "guest",
    "group": "Feierfreunde"
  }
];

export const WEDDING_QUOTES: WeddingQuote[] = [
  {
    "id": "q-1",
    "text": "Die Liebe allein versteht das Geheimnis, andere zu beschenken und dabei selbst reich zu werden.",
    "author": "Clemens Brentano",
    "category": "Liebe"
  },
  {
    "id": "q-2",
    "text": "Einen Menschen lieben heißt einwilligen, mit ihm alt zu werden.",
    "author": "Albert Camus",
    "category": "Liebe"
  },
  {
    "id": "q-3",
    "text": "Die Ehe ist und bleibt die wichtigste Entdeckungsreise, die der Mensch unternehmen kann.",
    "author": "Søren Kierkegaard",
    "category": "Eheleben"
  },
  {
    "id": "q-4",
    "text": "Wo Liebe ist, wird das Unmögliche möglich.",
    "author": "Buddha",
    "category": "Liebe"
  },
  {
    "id": "q-5",
    "text": "Auf die Liebe, das Lachen und das glückliche Leben bis ans Ende aller Tage! Hoch lebe unser Brautpaar Anja & Dino!",
    "author": "Trinkspruch",
    "category": "Trinkspruch"
  },
  {
    "id": "q-6",
    "text": "Das große Glück in der Liebe besteht darin, Ruhe in einem anderen Herzen zu finden.",
    "author": "Julie de Lespinasse",
    "category": "Liebe"
  },
  {
    "id": "q-7",
    "text": "Liebe besteht nicht darin, dass man einander ansieht, sondern dass man gemeinsam in dieselbe Richtung blickt.",
    "author": "Antoine de Saint-Exupéry",
    "category": "Eheleben"
  },
  {
    "id": "q-8",
    "text": "Glaube, Hoffnung, Liebe, diese drei; aber die Liebe ist die größte unter ihnen.",
    "author": "1. Korinther 13:13",
    "category": "Glückwunsch"
  }
];

export const TAXI_SERVICES: TaxiService[] = [
  {
    "id": "taxi-1",
    "name": "Taxi Tibljas",
    "phone": "+499281794111",
    "displayPhone": "+499281794111",
    "numbers": [
      {
        "phone": "+499281794111",
        "displayPhone": "+499281794111"
      }
    ]
  },
  {
    "id": "taxi-2",
    "name": "Taxi 8088",
    "phone": "+4992818088",
    "displayPhone": "+4992818088",
    "numbers": [
      {
        "phone": "+4992818088",
        "displayPhone": "+4992818088"
      }
    ]
  },
  {
    "id": "taxi-3",
    "name": "Taxi Frisch",
    "phone": "+4992814866",
    "displayPhone": "+4992814866",
    "numbers": [
      {
        "phone": "+4992814866",
        "displayPhone": "+4992814866"
      },
      {
        "phone": "+499281833010",
        "displayPhone": "+499281833010"
      }
    ]
  },
  {
    "id": "taxi-4",
    "name": "Taxi 3033 Hof",
    "phone": "+4992813033",
    "displayPhone": "+4992813033",
    "numbers": [
      {
        "phone": "+4992813033",
        "displayPhone": "+4992813033"
      }
    ]
  }
];

export const APP_LINKS = {
  "spotifyPlaylist": "https://open.spotify.com/playlist/0JUN3xAjBCaxL0UwXqlFO8?si=y9ZMWdueQ2WHWD7pmQVJwg&utm_source=whatsapp&pi=IAL6_fS3TUKX3&sci=spotify%3Acard-config%3A0VUG1Xza74adnjwokQU1Gm&nd=1&dlsi=8eb7f45a1f9a4831",
  "photoApp": "https://app.mymillionsnaps.de/f71210da-70bf-4078-ab79-992de5e2316e/pictures"
};
