import { sql } from '@vercel/postgres';
import LatestInvoiceRaw from '../ui/dashboard/latest-invoices';
import {Revenue} from '@/app/lib/definitions'
import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

const data = await sql<LatestInvoiceRaw>`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    ORDER BY invoices.date DESC
    LIMIT 5`;
const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;

// console.log(data)

export async function fetchCardData(){
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM invoices`;

    const data = await Promise.all([
        invoiceCountPromise,
        customerCountPromise,
        invoiceStatusPromise,
    ])
}

export async function fetchRevenue() {
    // const client = await db.connect();
    // const data = await client.sql`SELECT revenue`;
    // console.log(data)

    try {
        const result = await sql`SELECT * FROM revenue;`;
        console.log(result)
        return NextResponse.json({ result }, { status: 200 });
    } 
    catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }


//     console.log('Fetching revenue data...');
//     await new Promise((resolve) => setTimeout(resolve, 3000));
//     console.log('Data fetch completed after 3 seconds.');
//     const data = await sql<Revenue>`SELECT * FROM revenue`;
    
//         // console.log('Data fetch c noStore();ompleted after 3 seconds.');
//         console.log(data)
//         return data.rows;
}