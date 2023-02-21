export interface iData {
  securityCode: string,
  price: number,
  volume: number,
  owner: string,
}

export const formatData = (data: iData) => {
  const { securityCode, price: tradePrice, volume: tradeVolume, owner: tradeOwner } = data;
  const formattedData = {
    securityCode: securityCode.toUpperCase(),
    price: tradePrice.toLocaleString('en-US'),
    volume: tradeVolume.toLocaleString('en-US'),
    owner: tradeOwner.slice(0, 1).toUpperCase() + tradeOwner.slice(1)
  };

  return formattedData;
}
