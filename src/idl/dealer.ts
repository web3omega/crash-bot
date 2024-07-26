export type Dealer = {
  version: "0.1.1";
  name: "dealer";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "room";
          isMut: true;
          isSigner: false;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        },
        {
          name: "roomNumber";
          type: "u16";
        },
        {
          name: "maxPlayers";
          type: "u16";
        },
        {
          name: "minPlayers";
          type: "u16";
        }
      ];
    },
    {
      name: "join";
      accounts: [
        {
          name: "room";
          isMut: true;
          isSigner: false;
        },
        {
          name: "house";
          isMut: true;
          isSigner: false;
        },
        {
          name: "fee";
          isMut: true;
          isSigner: false;
        },
        {
          name: "coldHouse";
          isMut: true;
          isSigner: false;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: false;
        },
        {
          name: "player";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        },
        {
          name: "roomNumber";
          type: "u16";
        },
        {
          name: "amount";
          type: "u64";
        },
        {
          name: "round";
          type: "u64";
        },
        {
          name: "custom";
          type: {
            option: "string";
          };
        }
      ];
    },
    {
      name: "claim";
      accounts: [
        {
          name: "rewardAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "player";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        }
      ];
    },
    {
      name: "activation";
      accounts: [
        {
          name: "room";
          isMut: true;
          isSigner: false;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        },
        {
          name: "roomNumber";
          type: "u16";
        },
        {
          name: "active";
          type: "bool";
        }
      ];
    },
    {
      name: "noMoreBets";
      accounts: [
        {
          name: "room";
          isMut: true;
          isSigner: false;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        },
        {
          name: "roomNumber";
          type: "u16";
        },
        {
          name: "round";
          type: "u64";
        }
      ];
    },
    {
      name: "distroRewards";
      accounts: [
        {
          name: "room";
          isMut: true;
          isSigner: false;
        },
        {
          name: "rewardAccount";
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: "house";
          isMut: true;
          isSigner: false;
        },
        {
          name: "player";
          isMut: true;
          isSigner: false;
          isOptional: true;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: true;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        },
        {
          name: "roomNumber";
          type: "u16";
        },
        {
          name: "round";
          type: "u64";
        },
        {
          name: "reward";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawFee";
      accounts: [
        {
          name: "receiver";
          isMut: true;
          isSigner: false;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: true;
        },
        {
          name: "fee";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        },
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawHouse";
      accounts: [
        {
          name: "receiver";
          isMut: true;
          isSigner: false;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: true;
        },
        {
          name: "house";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "amount";
          type: "u64";
        }
      ];
    },
    {
      name: "withdrawPlayer";
      accounts: [
        {
          name: "receiver";
          isMut: true;
          isSigner: false;
        },
        {
          name: "boss";
          isMut: true;
          isSigner: true;
        },
        {
          name: "rewardAccount";
          isMut: true;
          isSigner: false;
        },
        {
          name: "player";
          isMut: true;
          isSigner: false;
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        }
      ];
      args: [
        {
          name: "gameNumber";
          type: "u16";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "gameRoom";
      type: {
        kind: "struct";
        fields: [
          {
            name: "roomNumber";
            type: "u16";
          },
          {
            name: "gameNumber";
            type: "u16";
          },
          {
            name: "minPlayers";
            type: "u16";
          },
          {
            name: "maxPlayers";
            type: "u16";
          },
          {
            name: "playerCount";
            type: "u16";
          },
          {
            name: "playersPendingProcessing";
            type: "u16";
          },
          {
            name: "currentRound";
            type: "u64";
          },
          {
            name: "currentGameStatus";
            type: {
              defined: "GameState";
            };
          },
          {
            name: "active";
            type: "bool";
          },
          {
            name: "players";
            type: {
              vec: {
                defined: "Player";
              };
            };
          }
        ];
      };
    }
  ];
  types: [
    {
      name: "Player";
      type: {
        kind: "struct";
        fields: [
          {
            name: "pubkey";
            type: "publicKey";
          },
          {
            name: "lamports";
            type: "u64";
          },
          {
            name: "choice";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "GameState";
      type: {
        kind: "enum";
        variants: [
          {
            name: "Idle";
          },
          {
            name: "BetsOpen";
          },
          {
            name: "NoMoreBets";
          },
          {
            name: "GameFinished";
          }
        ];
      };
    }
  ];
  errors: [
    {
      code: 6000;
      name: "NotBoss";
      msg: "This account is not the boss, you degen!";
    },
    {
      code: 6001;
      name: "TableNotActive";
      msg: "This room is not active!";
    },
    {
      code: 6002;
      name: "TableFull";
      msg: "This room is full!";
    },
    {
      code: 6003;
      name: "SpotNotAvailable";
      msg: "This spot is not available!";
    },
    {
      code: 6004;
      name: "IncorrectSpotNumber";
      msg: "Incorrect spot number";
    },
    {
      code: 6005;
      name: "IncorrectGameSetting";
      msg: "Incorrect setting";
    },
    {
      code: 6006;
      name: "NotCold";
      msg: "Incorrect cold house wallet";
    },
    {
      code: 6007;
      name: "PlayerAlreadyExists";
      msg: "Player already exists";
    },
    {
      code: 6008;
      name: "AlreadyRewarded";
      msg: "This player is already rewarded";
    },
    {
      code: 6009;
      name: "WrongRoundId";
      msg: "Wrong round ID";
    },
    {
      code: 6010;
      name: "WrongGameState";
      msg: "Wrong game state";
    },
    {
      code: 6011;
      name: "InsufficientBalance";
      msg: "Insufficient House Balance";
    },
    {
      code: 6012;
      name: "PlayersPending";
      msg: "Game has player rewards pending";
    }
  ];
};

export const IDL: Dealer = {
  version: "0.1.1",
  name: "dealer",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "room",
          isMut: true,
          isSigner: false,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
        {
          name: "roomNumber",
          type: "u16",
        },
        {
          name: "maxPlayers",
          type: "u16",
        },
        {
          name: "minPlayers",
          type: "u16",
        },
      ],
    },
    {
      name: "join",
      accounts: [
        {
          name: "room",
          isMut: true,
          isSigner: false,
        },
        {
          name: "house",
          isMut: true,
          isSigner: false,
        },
        {
          name: "fee",
          isMut: true,
          isSigner: false,
        },
        {
          name: "coldHouse",
          isMut: true,
          isSigner: false,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: false,
        },
        {
          name: "player",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
        {
          name: "roomNumber",
          type: "u16",
        },
        {
          name: "amount",
          type: "u64",
        },
        {
          name: "round",
          type: "u64",
        },
        {
          name: "custom",
          type: {
            option: "string",
          },
        },
      ],
    },
    {
      name: "claim",
      accounts: [
        {
          name: "rewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "player",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
      ],
    },
    {
      name: "activation",
      accounts: [
        {
          name: "room",
          isMut: true,
          isSigner: false,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
        {
          name: "roomNumber",
          type: "u16",
        },
        {
          name: "active",
          type: "bool",
        },
      ],
    },
    {
      name: "noMoreBets",
      accounts: [
        {
          name: "room",
          isMut: true,
          isSigner: false,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
        {
          name: "roomNumber",
          type: "u16",
        },
        {
          name: "round",
          type: "u64",
        },
      ],
    },
    {
      name: "distroRewards",
      accounts: [
        {
          name: "room",
          isMut: true,
          isSigner: false,
        },
        {
          name: "rewardAccount",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "house",
          isMut: true,
          isSigner: false,
        },
        {
          name: "player",
          isMut: true,
          isSigner: false,
          isOptional: true,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: true,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
        {
          name: "roomNumber",
          type: "u16",
        },
        {
          name: "round",
          type: "u64",
        },
        {
          name: "reward",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawFee",
      accounts: [
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: true,
        },
        {
          name: "fee",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawHouse",
      accounts: [
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: true,
        },
        {
          name: "house",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "amount",
          type: "u64",
        },
      ],
    },
    {
      name: "withdrawPlayer",
      accounts: [
        {
          name: "receiver",
          isMut: true,
          isSigner: false,
        },
        {
          name: "boss",
          isMut: true,
          isSigner: true,
        },
        {
          name: "rewardAccount",
          isMut: true,
          isSigner: false,
        },
        {
          name: "player",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "gameNumber",
          type: "u16",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "gameRoom",
      type: {
        kind: "struct",
        fields: [
          {
            name: "roomNumber",
            type: "u16",
          },
          {
            name: "gameNumber",
            type: "u16",
          },
          {
            name: "minPlayers",
            type: "u16",
          },
          {
            name: "maxPlayers",
            type: "u16",
          },
          {
            name: "playerCount",
            type: "u16",
          },
          {
            name: "playersPendingProcessing",
            type: "u16",
          },
          {
            name: "currentRound",
            type: "u64",
          },
          {
            name: "currentGameStatus",
            type: {
              defined: "GameState",
            },
          },
          {
            name: "active",
            type: "bool",
          },
          {
            name: "players",
            type: {
              vec: {
                defined: "Player",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "Player",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "publicKey",
          },
          {
            name: "lamports",
            type: "u64",
          },
          {
            name: "choice",
            type: "u8",
          },
        ],
      },
    },
    {
      name: "GameState",
      type: {
        kind: "enum",
        variants: [
          {
            name: "Idle",
          },
          {
            name: "BetsOpen",
          },
          {
            name: "NoMoreBets",
          },
          {
            name: "GameFinished",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "NotBoss",
      msg: "This account is not the boss, you degen!",
    },
    {
      code: 6001,
      name: "TableNotActive",
      msg: "This room is not active!",
    },
    {
      code: 6002,
      name: "TableFull",
      msg: "This room is full!",
    },
    {
      code: 6003,
      name: "SpotNotAvailable",
      msg: "This spot is not available!",
    },
    {
      code: 6004,
      name: "IncorrectSpotNumber",
      msg: "Incorrect spot number",
    },
    {
      code: 6005,
      name: "IncorrectGameSetting",
      msg: "Incorrect setting",
    },
    {
      code: 6006,
      name: "NotCold",
      msg: "Incorrect cold house wallet",
    },
    {
      code: 6007,
      name: "PlayerAlreadyExists",
      msg: "Player already exists",
    },
    {
      code: 6008,
      name: "AlreadyRewarded",
      msg: "This player is already rewarded",
    },
    {
      code: 6009,
      name: "WrongRoundId",
      msg: "Wrong round ID",
    },
    {
      code: 6010,
      name: "WrongGameState",
      msg: "Wrong game state",
    },
    {
      code: 6011,
      name: "InsufficientBalance",
      msg: "Insufficient House Balance",
    },
    {
      code: 6012,
      name: "PlayersPending",
      msg: "Game has player rewards pending",
    },
  ],
};
