'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function deleteInvoice(id){
    try {
        await sql `DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath('/dashboard/invoices');
        return { message: 'Deleted massage' };
    } catch (error) {
        return { message: 'Database Error' };
    }
}