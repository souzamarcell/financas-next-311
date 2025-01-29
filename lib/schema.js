import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  type: text('type').notNull(), // "entrada" ou "saida"
  category: text('category').notNull(), // "salario", "cartao", "pix", etc.
  amount: integer('amount').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
