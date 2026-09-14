import { useEffect, useState } from "react";

import { useBusiness } from "../context/BusinessContext";

import {
  createSale,
  deleteSale,
  getProducts,
  getSales,
} from "../api/api";


function Sales() {
  const {
    sales,
    setSales,
    products,
    setProducts,
  } = useBusiness();


  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    paymentMethod: "Cash",
  });


  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  /* =========================
     LOAD SALES AND PRODUCTS
  ========================= */

  useEffect(() => {
    let active = true;

    async function loadSalesData() {
      try {
        setLoading(true);
        setMessage("");

        const [
          salesData,
          productsData,
        ] = await Promise.all([
          getSales(),
          getProducts(),
        ]);

        if (active) {
          setSales(salesData);
          setProducts(productsData);
        }
      } catch (error) {
        if (active) {
          console.error(
            "Failed to load sales:",
            error
          );

          setMessage(
            error.message ||
              "Failed to load sales."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadSalesData();

    return () => {
      active = false;
    };
  }, [setSales, setProducts]);


  /* =========================
     HANDLE FORM CHANGES
  ========================= */

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));

    setMessage("");
  };


  /* =========================
     RECORD SALE
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quantity = Number(
      formData.quantity
    );


    /* Validate product */

    const selectedProduct =
      products.find(
        (product) =>
          String(product._id) ===
          String(formData.productId)
      );


    if (!selectedProduct) {
      setMessage(
        "Please select a valid product."
      );

      return;
    }


    /* Validate quantity */

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      setMessage(
        "Please enter a valid quantity."
      );

      return;
    }


    /* Check stock */

    const currentStock = Number(
      selectedProduct.quantity || 0
    );


    if (quantity > currentStock) {
      setMessage(
        `Not enough stock. Only ${currentStock} item${
          currentStock !== 1 ? "s" : ""
        } available.`
      );

      return;
    }


    try {
      setSaving(true);
      setMessage("");


      /*
        Send the sale to MongoDB.

        IMPORTANT:
        The backend expects productId,
        not product.
      */

      const newSale = await createSale({
        productId:
          selectedProduct._id,

        quantity,

        paymentMethod:
          formData.paymentMethod,
      });


      /* Add saved sale to state */

      setSales((current) => [
        newSale,
        ...current,
      ]);


      /*
        Reload products so inventory
        matches MongoDB.
      */

      const updatedProducts =
        await getProducts();

      setProducts(updatedProducts);


      /* Reset form */

      setFormData({
        productId: "",
        quantity: "",
        paymentMethod: "Cash",
      });


      setMessage(
        "Sale recorded successfully."
      );
    } catch (error) {
      console.error(
        "Failed to create sale:",
        error
      );

      setMessage(
        error.message ||
          "Failed to record sale."
      );
    } finally {
      setSaving(false);
    }
  };


  /* =========================
     DELETE SALE
  ========================= */

  const handleDeleteSale = async (id) => {
    try {
      setMessage("");


      await deleteSale(id);


      /*
        Remove the sale from
        the frontend state.
      */

      setSales((current) =>
        current.filter(
          (sale) => sale._id !== id
        )
      );


      /*
        The backend restores the
        sold quantity to inventory.
      */

      const updatedProducts =
        await getProducts();

      setProducts(updatedProducts);


      setMessage(
        "Sale deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete sale:",
        error
      );

      setMessage(
        error.message ||
          "Failed to delete sale."
      );
    }
  };


  /* =========================
     FORMAT CURRENCY
  ========================= */

  const formatCurrency = (amount) => {
    return `₦${Number(
      amount || 0
    ).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };


  return (
    <div>

      {/* =========================
          PAGE HEADING
      ========================= */}

      <div>
        <p className="font-semibold tracking-widest text-[var(--status)]">
          SALES
        </p>

        <h1 className="mt-2 text-3xl font-bold md:text-4xl">
          Record your sales.
        </h1>

        <p className="mt-3 text-[var(--muted-text)]">
          Record a sale and automatically
          update your inventory.
        </p>
      </div>


      {/* =========================
          SALE FORM
      ========================= */}

      <section className="mt-10 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">

        <h2 className="text-xl font-bold">
          Add New Sale
        </h2>


        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >

          {/* PRODUCT */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Product
            </label>

            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              disabled={
                loading || saving
              }
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none disabled:opacity-60"
            >
              <option value="">
                Select a product
              </option>

              {products.map((product) => (
                <option
                  key={product._id}
                  value={product._id}
                >
                  {product.name ||
                    "Product"}{" "}
                  — Stock:{" "}
                  {product.quantity || 0}
                </option>
              ))}
            </select>
          </div>


          {/* QUANTITY */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Quantity Sold
            </label>

            <input
              type="number"
              name="quantity"
              min="1"
              step="1"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              disabled={saving}
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none disabled:opacity-60"
            />
          </div>


          {/* PAYMENT METHOD */}

          <div>
            <label className="mb-2 block text-sm font-medium">
              Payment Method
            </label>

            <select
              name="paymentMethod"
              value={
                formData.paymentMethod
              }
              onChange={handleChange}
              disabled={saving}
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 outline-none disabled:opacity-60"
            >
              <option value="Cash">
                Cash
              </option>

              <option value="POS">
                POS
              </option>

              <option value="Bank Transfer">
                Bank Transfer
              </option>
            </select>
          </div>


          {/* MESSAGE */}

          {message && (
            <p className="rounded-lg bg-[var(--status)]/20 p-3 text-sm">
              {message}
            </p>
          )}


          {/* SUBMIT */}

          <button
            type="submit"
            disabled={
              saving || loading
            }
            className="w-full rounded-lg bg-[var(--primary)] px-5 py-3 font-semibold text-[#2E2528] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Recording..."
              : "Record Sale"}
          </button>

        </form>
      </section>


      {/* =========================
          SALES HISTORY
      ========================= */}

      <section className="mt-10">

        <h2 className="text-xl font-bold">
          Sales History
        </h2>


        <div className="mt-5 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

          {loading ? (
            <div className="p-10 text-center">

              <p className="font-semibold">
                Loading sales...
              </p>

            </div>
          ) : sales.length === 0 ? (

            <div className="p-10 text-center">

              <p className="font-semibold">
                No sales recorded yet.
              </p>

              <p className="mt-2 text-sm text-[var(--muted-text)]">
                Your recorded sales will
                appear here.
              </p>

            </div>
          ) : (

            <table className="w-full min-w-[700px]">

              <thead>
                <tr className="border-b border-[var(--border)] text-left">

                  <th className="p-4">
                    Product
                  </th>

                  <th className="p-4">
                    Quantity
                  </th>

                  <th className="p-4">
                    Amount
                  </th>

                  <th className="p-4">
                    Payment
                  </th>

                  <th className="p-4">
                    Date
                  </th>

                  <th className="p-4">
                    Action
                  </th>

                </tr>
              </thead>


              <tbody>

                {sales.map((sale) => (
                  <tr
                    key={sale._id}
                    className="border-b border-[var(--border)] last:border-b-0"
                  >

                    {/* PRODUCT */}

                    <td className="p-4 font-medium">
                      {sale.productName ||
                        "Product"}
                    </td>


                    {/* QUANTITY */}

                    <td className="p-4">
                      {sale.quantity}
                    </td>


                    {/* AMOUNT */}

                    <td className="p-4 font-semibold">
                      {formatCurrency(
                        sale.amount
                      )}
                    </td>


                    {/* PAYMENT */}

                    <td className="p-4">
                      {sale.paymentMethod ||
                        "Cash"}
                    </td>


                    {/* DATE */}

                    <td className="p-4 text-sm text-[var(--muted-text)]">
                      {sale.date
                        ? new Date(
                            sale.date
                          ).toLocaleDateString(
                            "en-NG"
                          )
                        : "-"}
                    </td>


                    {/* ACTION */}

                    <td className="p-4">

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteSale(
                            sale._id
                          )
                        }
                        className="font-medium text-red-500 hover:underline"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          )}

        </div>

      </section>

    </div>
  );
}


export default Sales;