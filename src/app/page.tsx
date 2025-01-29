"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("entrada");
  const [category, setCategory] = useState("salario");

  useEffect(() => {
    axios.get("/api/transactions").then((res) => setTransactions(res.data));
  }, []);

  const handleAddTransaction = async () => {
    await axios.post("/api/transactions", { type, category, amount: Number(amount) });
    setAmount("");
    window.location.reload();
  };

  const saldo = transactions.reduce((acc, t) => (t.type === "entrada" ? acc + t.amount : acc - t.amount), 0);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold">💰 Controle de Finanças</h1>
      <h2 className="text-xl font-semibold mt-4">Saldo: R$ {saldo.toFixed(2)}</h2>

      <div className="mt-4">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor"
          className="border p-2 w-full rounded-md" />
        
        <select value={type} onChange={(e) => setType(e.target.value)} className="border p-2 w-full rounded-md mt-2">
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 w-full rounded-md mt-2">
          <option value="salario">Salário</option>
          <option value="cartao">Cartão</option>
          <option value="pix">Pix</option>
          <option value="boleto">Boleto</option>
        </select>

        <button onClick={handleAddTransaction} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full">
          Adicionar
        </button>
      </div>

      <ul className="mt-6">
        {transactions.map((t, i) => (
          <li key={i} className={`p-2 ${t.type === "entrada" ? "text-green-600" : "text-red-600"}`}>
            {t.category}: R$ {t.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
