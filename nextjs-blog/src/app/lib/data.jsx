import { sql,db } from '@vercel/postgres';
import LatestInvoiceRaw from '../ui/dashboard/latest-invoices';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { Revenue } from '@/app/lib/definitions';

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

// Function to fetch revenue data
export async function fetchRevenue() {
    noStore(); 
    try {
      const data = await sql`SELECT * FROM revenue;`;
  
      const revenueData = data.rows.map(row => ({
        month: String(row.month),
        revenue: parseInt(row.revenue),
      }));
  
      // Create an array of Revenue objects
      const revenueArray = revenueData.map(item => {
        return {
          ...Revenue,
          month: item.month,
          revenue: item.revenue,
        };
      });
  
      console.log("Revenue data added successfully", revenueArray);
      return revenueArray;
  
    } catch (error) {
      console.error("DatabaseError: ", error);
      throw new Error("Failed to fetch Revenue");
    }
  }