import { sql,db } from '@vercel/postgres';
import LatestInvoiceRaw from '../ui/dashboard/latest-invoices';
import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { Revenue } from '@/app/lib/definitions';


export async function fetchLatestInvoices(){
    noStore();
    try {
        const data = await sql `
        SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
        FROM invoices
        JOIN customers ON invoices.customer_id = customers.id
        ORDER BY invoices.date DESC
        LIMIT 5
        `;
        const latestInvoices = data.rows.map(invoice => ({
          id: invoice.id,
          customers: invoice.name,
          image_url: invoice.image_url,
          email: invoice.email,
          amount: invoice.amount,

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
  }