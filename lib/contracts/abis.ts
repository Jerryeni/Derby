export const PRESALE_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_ref",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "buy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"name": "changeCryptoAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_liq",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_approver",
				"type": "address"
			}
		],
		"name": "changeHolders",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isBNB",
				"type": "bool"
			}
		],
		"name": "claimLevelIncome",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			}
		],
		"name": "claimStuckTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "isBNB",
				"type": "bool"
			}
		],
		"name": "claimVirtualTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributeDividend",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "endDailyROI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amt",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "minDep",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rDailyROI",
				"type": "uint256"
			}
		],
		"name": "setRatios",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setRefIncomeLevelRatios",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setRefTokenLevelRatios",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isVirtualDistrib",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "_isRefVirtualDistrib",
				"type": "bool"
			}
		],
		"name": "setVirtualDistribToggle",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "startDailyROI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_liq",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_approver",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_usdt",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_crypto",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "activity",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bnbAmt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "usdtAmt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "tokenAmt",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "mode",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "refId",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "approver",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			}
		],
		"name": "BNBtoCRYPTO",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cryptoToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentTotalInvestmentsBNBTBD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentTotalInvestmentsUSDTTBD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "currentTotalTokensTBD",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dailyInvRate",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dailyROIStarted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "defaultRefer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dividendLastDist",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			}
		],
		"name": "getAllLevelDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "level",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "userCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoPsale.LevelDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllLevelDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "level",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "userCount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalAmount",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoPsale.LevelDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "acct",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ref",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDepositUSDT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDepositBNB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refIncomeUSDT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refIncomeBNB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "selfTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dividendToken",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					}
				],
				"internalType": "struct CryptoPsale.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsersIncome",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "currentRefIncomeUSDT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "currentRefIncomeBNB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "ceilingLimit",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoPsale.UserIncomes[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllUsersVirtualToken",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amt",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoPsale.UserVT[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			}
		],
		"name": "getLevelDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "userId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountEarned",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "userEmail",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					}
				],
				"internalType": "struct CryptoPsale.UserLevelDetail[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_page",
				"type": "uint256"
			}
		],
		"name": "getRecentActivities",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "bnbAmt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "usdtAmt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "tokenAmt",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "mode",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refId",
						"type": "uint256"
					}
				],
				"internalType": "struct CryptoPsale.Activity[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getUserActivitiesLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "getUserDetail",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "acct",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ref",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDepositUSDT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDepositBNB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refIncomeUSDT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refIncomeBNB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "selfTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dividendToken",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					}
				],
				"internalType": "struct CryptoPsale.User",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "user",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			}
		],
		"name": "getUserLevelBusiness",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "user",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			}
		],
		"name": "getUserLevelRefs",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "user",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_level",
				"type": "uint256"
			}
		],
		"name": "getUserLevelUserInfo",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "acct",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "ref",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDepositUSDT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalDepositBNB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refIncomeUSDT",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refIncomeBNB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "totalTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "selfTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refTokens",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dividendToken",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "refCount",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					}
				],
				"internalType": "struct CryptoPsale.User[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_userId",
				"type": "uint256"
			}
		],
		"name": "getUserTeamStats",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "totalTeamBusiness",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalTeamCount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "globalUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "id",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isRefVirtual",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isVirtual",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastDist",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "levelIncomeRatios",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "levelTokenRatios",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "liqHolder",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minDeposit",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "price",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "priceBNB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "teams",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "teamsBiz",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalInvestmentsBNB",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalInvestmentsUSDT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalTokensToBEDistributed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amt",
				"type": "uint256"
			}
		],
		"name": "USDTtoCRYPTO",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "usdtToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userActivities",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "usersIncome",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "currentRefIncomeUSDT",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "currentRefIncomeBNB",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "ceilingLimit",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "usersInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "acct",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "ref",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalDepositUSDT",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalDepositBNB",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "refIncomeUSDT",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "refIncomeBNB",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "totalTokens",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "selfTokens",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "refTokens",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "dividendToken",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "refCount",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "usersVirtualToken",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


export const ERC20_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];