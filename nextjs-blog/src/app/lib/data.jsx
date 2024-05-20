import { sql,db } from '@vercel/postgres';
import LatestInvoiceRaw from '../ui/dashboard/latest-invoices';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { Revenue } from '@/app/lib/definitions';
import { formatCurrency } from './utils';


export async function fetchLatestInvoices(){
    noStore();
    try {
        const data = await sql `
        SELECT DISTINCT ON (customers.email) invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY customers.email, invoices.date DESC
        LIMIT 5
        `;
        console.log(data);
        const latestInvoices = data.rows.map(invoice => ({
          id: invoice.id,
          customers: invoice.name,
          image_url: invoice.image_url,
          email: invoice.email,
          amount: formatCurrency(invoice.amount),

        }))
        return latestInvoices;
        // console.log(latestInvoices);
    } catch (error) {
        console.log("error",error);
        throw new Error("Fail")
    }
}


export async function fetchRevenue() {
    noStore();  // Disable caching
    try {
      const data = await sql`SELECT * FROM revenue;`;
  
      const revenueData = data.rows.map(row => ({
        month: String(row.month),  // Ensure month is a string
        revenue: parseInt(row.revenue),  // Convert revenue to integer
      }));

      const revenueArray = revenueData.map(item => {
        return {
          ...Revenue,
          month: item.month,
          revenue: item.revenue,
        };
      });
  
      // console.log("Revenue data added successfully", revenueArray);
      return revenueArray;  // Return the formatted data
  
    } catch (error) {
      console.error("DatabaseError: ", error);
      throw new Error("Failed to fetch Revenue");
    }
};


export async function fetchCardData(){
  noStore();
  try {
    const invoiceCount =  sql`SELECT COUNT(*) FROM invoices`;
    const customersCount =  sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusCount =  sql`SELECT
    SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    FROM invoices`;

    const data = await Promise.all([
      invoiceCount,customersCount,invoiceStatusCount
    ]);

    // console.log(data[2]);

    const numberOfInvoice = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomer = Number(data[1].rows[0].count ?? '0');
    const totalPaidStatus = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingStatus = formatCurrency(data[2].rows[0].pending ?? '0');

    // console.log(totalPaidStatus);

    return {
      numberOfInvoice,
      numberOfCustomer,
      totalPaidStatus,
      totalPendingStatus
    };

  } catch (error) {
    console.error("DatabaseError: ", error)
    throw new Error ('Failed to fetch card data.')
  }
}

  