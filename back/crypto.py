from eth_account import Account
from web3 import Web3, exceptions

# Инициализация API
# Для работы API нужна нода Ethereum
# Мы используем сервис предоставляющий ноды: https://infura.io
#
w3 = Web3(Web3.HTTPProvider('https://ropsten.infura.io/v3/48f2e1b1628c4a7786576bb5505de814'))


def get_balance(address: str):
    """
    Получение баланса на адресе
    По умолчанию на момент последнего блока
    """
    try:
        print('Getting balance for ', address)
        return w3.eth.getBalance(address, 'latest')  # Само обращение к API
    except exceptions.InvalidAddress:
        return 'Неверный адрес'


def create_acc(secret: str):
    """
    Создаем новый случайный аккаунт.
    Возвращаем его адрес и ключ
    """
    acc = Account.create(secret)  # Само обращение к API
    return {"key": w3.toHex(acc.key), "address": acc.address}


def get_block(block_number: str):
    """
    Получаем информацию о конкретном блоке.
    Если не задан номер блока (или значение не числовое), то последний на данный момент 'latest'.
    Выбираем параметры даты, номера, сложности.
    Возвращаем
    """
    if block_number.isnumeric():
        block_number = int(block_number)
    else:
        block_number = 'latest'
    block = w3.eth.getBlock(block_number)  # Само обращение к API
    d = dict(
        timestamp=block['timestamp'],
        number=block['number'],
        difficulty=block['difficulty']
    )
    return d
