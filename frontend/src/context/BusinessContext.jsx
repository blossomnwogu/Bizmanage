import { createContext, useContext, useState } from "react";

const BusinessContext = createContext(null);

export function BusinessProvider({ children }) {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

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
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusiness() {
  const context = useContext(BusinessContext);

  if (!context) {
    throw new Error(
      "useBusiness must be used inside a BusinessProvider"
    );
  }

  return context;
}