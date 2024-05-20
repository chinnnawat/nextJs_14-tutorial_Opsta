export function formatCurrency(amount){
    return (amount/100).toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB',
    });
};