export const formatMoney = (money: number, currency: 'XOF' = 'XOF') => {
    return new Intl.NumberFormat('fr-CI', {
        style: 'currency',
        currency
    })
        .format(money)
        .split('__')[0];
};

export const groupDigitsNumber = (number: number) =>
    number.toLocaleString('fr-FR');
