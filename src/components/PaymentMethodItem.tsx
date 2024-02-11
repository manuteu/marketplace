import React from 'react'
import { HStack, Text } from 'native-base'

import InvoiceSvg from '@assets/invoice_icon.svg'
import PixSvg from '@assets/pix_icon.svg'
import MoneySvg from '@assets/money_icon.svg'
import CardSvg from '@assets/card_icon.svg'
import BankDepositSvg from '@assets/bank_deposit_icon.svg'

interface IIcons {
  invoice: React.JSX.Element;
  pix: React.JSX.Element;
  money: React.JSX.Element;
  card: React.JSX.Element;
  bankDeposit: React.JSX.Element;
}

interface IType {
  invoice: string;
  pix: string;
  money: string;
  card: string;
  bankDeposit: string;
}

type Methods = {
  type: keyof IType;
}

export default function PaymentMethodItem({ type }: Methods) {
  const renderIcon = (iconType: keyof IIcons) => {
    const icons: IIcons = {
      invoice: <InvoiceSvg />,
      pix: <PixSvg />,
      money: <MoneySvg />,
      card: <CardSvg />,
      bankDeposit: <BankDepositSvg />,
    }
    return icons[iconType]
  }
  const renderType = (type: keyof IType) => {

    const icons: IType = {
      invoice: 'Boleto',
      pix: 'Pix',
      money: 'Dinheiro',
      card: 'Cartão de Crédito',
      bankDeposit: 'Depósito Bancário',
    }
    return icons[type]
  }

  return (
    <HStack space={2} alignItems='center'>

      {renderIcon(type)}
      <Text fontFamily='regular' fontSize='sm' color='gray.600'>{renderType(type)}</Text>
    </HStack>
  )
}