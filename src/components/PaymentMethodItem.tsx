import React from 'react'
import { HStack, Text } from 'native-base'

import InvoiceSvg from '@assets/invoice_icon.svg'
import PixSvg from '@assets/pix_icon.svg'
import MoneySvg from '@assets/money_icon.svg'
import CardSvg from '@assets/card_icon.svg'
import BankDepositSvg from '@assets/bank_deposit_icon.svg'

interface IIcons {
  boleto: React.JSX.Element;
  pix: React.JSX.Element;
  cash: React.JSX.Element;
  card: React.JSX.Element;
  deposit: React.JSX.Element;
}

interface IType {
  boleto: string;
  pix: string;
  cash: string;
  card: string;
  deposit: string;
}

type Methods = {
  type: keyof IType;
}

export default function PaymentMethodItem({ type }: Methods) {
  const renderIcon = (iconType: keyof IIcons) => {
    const icons: IIcons = {
      boleto: <InvoiceSvg />,
      pix: <PixSvg />,
      cash: <MoneySvg />,
      card: <CardSvg />,
      deposit: <BankDepositSvg />,
    }
    return icons[iconType]
  }
  const renderType = (type: keyof IType) => {

    const icons: IType = {
      boleto: 'Boleto',
      pix: 'Pix',
      cash: 'Dinheiro',
      card: 'Cartão de Crédito',
      deposit: 'Depósito Bancário',
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