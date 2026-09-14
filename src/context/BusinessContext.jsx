import { createContext, useContext, useState } from "react";

const BusinessContext = createContext();

export function BusinessProvider({ children }) {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [records, setRecords] = useState([]);

  return (
    <BusinessContext.Provider
      value={{
        sales,
        setSales,
        expenses,
        setExpenses,
        products,
        setProducts,
        customers,
        setCustomers,
        records,
        setRecords,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  return useContext(BusinessContext);
}
