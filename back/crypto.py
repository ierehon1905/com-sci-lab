from eth_account import Account
from web3.auto.infura import w3
import os

# Секреты не пушим
print(os.environ['WEB3_INFURA_PROJECT_ID'])

acct = Account.create('DIMA PIDOR VONUCHIY')

print(acct.address)
print(acct.key)

print(w3.eth.blockNumber)
