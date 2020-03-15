from eth_account import Account
import os
from web3 import Web3, exceptions
from typing import Union

w3 = Web3(Web3.HTTPProvider('https://ropsten.infura.io/v3/48f2e1b1628c4a7786576bb5505de814'))


# # Секреты не пушим
# print(os.environ['WEB3_INFURA_PROJECT_ID'])

# # acct = Account.create('test acc')
# # print(acct.address)
# # print(acct.key)

# # print(w3.eth.blockNumber)
# # print(w3.eth.getBlock('latest'))

# print(w3.isAddress('0x0f551e8e47b311F4b82Bad8e90e5Ef5D6f457528'))
# print(w3.eth.getBalance('0x0f551e8e47b311F4b82Bad8e90e5Ef5D6f457528', 'latest'))
# print(w3.eth.defaultAccount)
# print(w3.eth.gasPrice)

def get_balance(address: str):
    try:
        print('Getting balance for ', address)
        return w3.eth.getBalance(address, 'latest')
    except exceptions.InvalidAddress:
        return 'Неверный адрес'


def create_acc(secret: str):
    acc = Account.create(secret)
    return {"key": w3.toHex(acc.key), "address": acc.address}


def get_block(block_number: str):
    if block_number.isnumeric():
        block_number = int(block_number)
    else:
        block_number = 'latest'
    block = w3.eth.getBlock(block_number)
    d = dict(
        timestamp=block['timestamp'],
        number=block['number'],
        difficulty=block['difficulty']
    )
    return d