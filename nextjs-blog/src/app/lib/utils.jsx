export function formatCurrency(amount){
    return (amount/100).toLocaleString('th-TH', {
        style: 'currency',
        currency: 'THB',
    });
};

// export function formatDateToLocal(dateStr, locale = 'en-US') {
//     const date = new Date(dateStr);
//     const options = {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//     };
//     const formatter = new Intl.DateTimeFormat(locale, options);
//     return formatter.format(date);
//   }

export function formatDateToLocal(dateStr, locale = 'th-TH'){
    const date = new Date(dateStr);
    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(date);
}

export function generatePagination(currentPage,totalPages){
    if(totalPages <= 7){
        return Array.from({length: totalPages}, (_,i) => i+1)
    }
    if(currentPage <= 3){
        return [1, 2, 3, '...', totalPages-1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages,
    ];
    // if (typeof totalPages === 'number') {
    //     console.log(`Total pages: ${totalPages}`);
    //     return "Hello ";
    // }
    // return "Susu";
}