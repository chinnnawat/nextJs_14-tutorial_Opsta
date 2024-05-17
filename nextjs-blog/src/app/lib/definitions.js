const Status = {
  Pending: 'pending',
  Paid: 'paid',
}

export const User = {
  id: String,
  name: String,
  email: String,
  password: String,
};

export const Customer = {
  id: String,
  name: String,
  email: String,
  image_url: String,
};

export const Invoice = {
  id: String,
  customer_id: String,
  amount: Number,
  date: String,
  status: Status,
};

export const Revenue = []

export const LatestInvoice = {
  id: String,
  name: String,
  image_url: String,
  email: String,
  amount: String,
};

export const LatestInvoiceRaw = {
  id: LatestInvoice.id,
  name: LatestInvoice.name,
  image_url: LatestInvoice.image_url,
  email: LatestInvoice.email,
}

export const InvoicesTable = {
  id: String,
  customer_id: String,
  name: String,
  email: String,
  image_url: String,
  date: String,
  amount: Number,
  status: Status,
};

export const CustomersTableType = {
  id: String,
  name: String,
  email: String,
  image_url: String,
  total_invoices: Number,
  total_pending: Number,
  total_paid: Number,
};

export const FormattedCustomersTable = {
  id: String,
  name: String,
  email: String,
  image_url: String,
  total_invoices: Number,
  total_pending: String,
  total_paid: String,
};

export const CustomerField = {
  id: String,
  name: String,
}

export const InvoiceForm = {
  id: String,
  customer_id: String,
  amount: Number,
  status: Status,
};
