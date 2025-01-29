import { db } from "@/lib/db";
import { transactions } from "@/lib/schema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { type, category, amount } = req.body;
    await db.insert(transactions).values({ type, category, amount });
    return res.status(201).json({ message: "Transação registrada!" });
  }

  if (req.method === "GET") {
    const allTransactions = await db.select().from(transactions);
    return res.status(200).json(allTransactions);
  }

  res.status(405).json({ message: "Método não permitido" });
}
