import { useEffect, useMemo, useState } from "react";

import { useBusiness } from "../context/BusinessContext";
import {
  getExpenses,
  getSales,
} from "../api/api";

function FinancialEducation() {
  const {
    sales,
    setSales,
    expenses,
    setExpenses,
  } = useBusiness();

  const [loading, setLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] =
    useState(null);

  useEffect(() => {
    let active = true;

    async function loadFinancialData() {
      try {
        setLoading(true);

        const [
          salesData,
          expensesData,
        ] = await Promise.all([
          getSales(),
          getExpenses(),
        ]);

        if (!active) return;

        setSales(salesData);
        setExpenses(expensesData);
      } catch (error) {
        console.error(
          "Failed to load financial education data:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFinancialData();

    return () => {
      active = false;
    };
  }, [setSales, setExpenses]);

  const totalSales = useMemo(() => {
    return sales.reduce(
      (total, sale) =>
        total + Number(sale.amount || 0),
      0
    );
  }, [sales]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) =>
        total + Number(expense.amount || 0),
      0
    );
  }, [expenses]);

  const profit = totalSales - totalExpenses;

  const profitMargin =
    totalSales > 0
      ? (profit / totalSales) * 100
      : 0;

  const formatCurrency = (amount) => {
    return `₦${Number(amount || 0).toLocaleString(
      "en-NG",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  };

  const lessons = [
    {
      category: "Financial Basics",
      title: "Understanding Profit and Loss",
      description:
        "Learn how revenue, expenses and profit work together to show the financial performance of your business.",
      content: [
        "Profit is the amount left after your business expenses have been deducted from your revenue.",
        "A simple way to calculate profit is: Revenue − Expenses = Profit.",
        "Tracking profit regularly helps you understand whether your business is financially sustainable.",
      ],
      example:
        "If your business generates ₦250,000 in sales and has ₦180,000 in expenses, your estimated profit is ₦70,000.",
      action:
        "Use the Overview, Records and Reports sections of BizManage to monitor your sales, expenses and estimated profit.",
    },

    {
      category: "Financial Basics",
      title: "Revenue vs. Profit",
      description:
        "Understand why the money your business receives is not necessarily the same as what it earns.",
      content: [
        "Revenue is the income generated from selling products or services.",
        "Profit is what remains after business costs and expenses are deducted.",
        "A business can have high revenue while still making a small profit if its expenses are also high.",
      ],
      example:
        "A business with ₦500,000 in revenue and ₦450,000 in expenses has ₦50,000 in estimated profit.",
      action:
        "Record both sales and expenses in BizManage so you can see the difference between revenue and profit.",
    },

    {
      category: "Financial Basics",
      title: "Cash Flow",
      description:
        "Understand how money moves into and out of your business.",
      content: [
        "Cash flow describes the movement of money entering and leaving a business.",
        "Positive cash flow can help a business meet everyday obligations.",
        "A profitable business can still experience cash-flow problems if money is not available when payments are due.",
      ],
      example:
        "If customers pay you later while your suppliers require immediate payment, your business may have a cash-flow challenge even when sales are strong.",
      action:
        "Keep your sales and expenses up to date so your financial records give you a clearer picture of business activity.",
    },

    {
      category: "Financial Basics",
      title: "Business Budgeting",
      description:
        "Create a plan for expected income and expenses.",
      content: [
        "A budget helps you plan how much money you expect to receive and spend.",
        "It can help identify unnecessary spending before it becomes a problem.",
        "Reviewing your actual records against your budget can improve financial decision-making.",
      ],
      example:
        "If you expect monthly sales of ₦300,000, you can create spending limits for stock, transport, utilities and other business costs.",
      action:
        "Use your Records and Reports data to understand your normal income and expense patterns before setting future targets.",
    },

    {
      category: "Financial Basics",
      title: "Emergency Funds",
      description:
        "Learn why businesses should prepare for unexpected costs.",
      content: [
        "Unexpected repairs, slow sales or urgent operating costs can put pressure on a business.",
        "An emergency fund provides a financial buffer for unexpected situations.",
        "The amount a business needs depends on its size, costs and circumstances.",
      ],
      example:
        "A business may keep part of its surplus funds available for urgent equipment repairs or periods of lower sales.",
      action:
        "Consider your regular business expenses when deciding how much financial reserve your business may need.",
    },

    {
      category: "Business Finance",
      title: "Managing Business Expenses",
      description:
        "Learn how tracking and controlling expenses can protect your profit.",
      content: [
        "Every business has costs, but not every cost contributes equally to business growth.",
        "Regular expense tracking helps you identify where money is being spent.",
        "Reviewing expenses can reveal areas where costs may be reduced.",
      ],
      example:
        "If transport costs consistently increase, reviewing your expense records may help you identify patterns and possible alternatives.",
      action:
        "Record your expenses in BizManage and review the Expenses and Reports sections regularly.",
    },

    {
      category: "Business Finance",
      title: "Separate Personal and Business Money",
      description:
        "Understand why separating business and personal finances matters.",
      content: [
        "Mixing personal and business money can make it difficult to know how the business is actually performing.",
        "Separate records make income, expenses and profit easier to understand.",
        "Clear financial records can also make planning and reporting easier.",
      ],
      example:
        "Instead of paying personal expenses directly from business funds without recording them, keep business transactions separate and clearly documented.",
      action:
        "Use BizManage to maintain clear records of business sales and expenses.",
    },

    {
      category: "Business Finance",
      title: "Pricing Products Correctly",
      description:
        "Understand how costs and desired profit can influence product pricing.",
      content: [
        "Your selling price should account for the costs associated with providing the product or service.",
        "A price that is too low can make it difficult to cover costs and generate profit.",
        "Market conditions and customer demand should also be considered when setting prices.",
      ],
      example:
        "If the total cost associated with a product is ₦700, selling it for ₦750 leaves only ₦50 before considering other business expenses.",
      action:
        "Review your product prices and business expenses together before making pricing decisions.",
    },

    {
      category: "Business Finance",
      title: "Managing Working Capital",
      description:
        "Learn how to manage the money needed for everyday business operations.",
      content: [
        "Working capital supports day-to-day activities such as purchasing stock and paying operating expenses.",
        "Too little available working capital can make normal operations difficult.",
        "Good records can help you understand how much money your business regularly needs.",
      ],
      example:
        "A retailer may need enough available funds to restock products before receiving payment from some customers.",
      action:
        "Use your sales, inventory and expense records to understand your operating needs.",
    },

    {
      category: "Business Finance",
      title: "Understanding Business Records",
      description:
        "Learn why accurate records are important for business decisions.",
      content: [
        "Business records provide evidence of what the business has earned and spent.",
        "Good records help you identify trends and make informed decisions.",
        "They can also help when preparing financial information for other purposes.",
      ],
      example:
        "Recording every sale and expense makes it easier to calculate total sales, expenses and estimated profit.",
      action:
        "Keep your BizManage Records up to date and review them regularly.",
    },

    {
      category: "Savings & Financial Planning",
      title: "The Importance of Saving",
      description:
        "Learn how regular business savings can improve financial stability.",
      content: [
        "Saving allows a business to prepare for future needs.",
        "A savings habit can reduce dependence on emergency borrowing.",
        "The right savings target depends on the business and its financial circumstances.",
      ],
      example:
        "A business could set aside part of its surplus after covering regular operating costs.",
      action:
        "Review your profit and expenses before deciding how much your business can reasonably save.",
    },

    {
      category: "Savings & Financial Planning",
      title: "Setting Financial Goals",
      description:
        "Learn how to create realistic financial targets.",
      content: [
        "Financial goals give a business a clear direction.",
        "Goals can focus on revenue, profit, savings, reducing expenses or purchasing equipment.",
        "Tracking progress regularly makes goals easier to manage.",
      ],
      example:
        "A business might set a target to increase monthly sales by 10% or build a specific emergency reserve.",
      action:
        "Use BizManage reports to monitor your progress toward financial goals.",
    },

    {
      category: "Savings & Financial Planning",
      title: "Managing Irregular Income",
      description:
        "Learn how to plan when business income changes from period to period.",
      content: [
        "Some businesses experience periods of high and low income.",
        "Planning around average income can reduce the risk of overspending during strong periods.",
        "Maintaining reserves can provide support during slower periods.",
      ],
      example:
        "A seasonal business may receive much more income during certain months than others and should plan accordingly.",
      action:
        "Review your historical sales records to identify periods of stronger or weaker business activity.",
    },

    {
      category: "Savings & Financial Planning",
      title: "Preparing for Unexpected Expenses",
      description:
        "Learn how planning ahead can reduce the impact of unexpected costs.",
      content: [
        "Unexpected expenses can affect cash available for normal business activities.",
        "A financial reserve can help absorb some unexpected costs.",
        "Regular expense reviews can help you identify risks early.",
      ],
      example:
        "Equipment failure may require an urgent repair that was not included in the normal monthly budget.",
      action:
        "Review your expense history and identify costs that could unexpectedly affect your business.",
    },

    {
      category: "Digital Finance",
      title: "POS Payments",
      description:
        "Understand how POS transactions fit into business financial records.",
      content: [
        "POS payments provide a convenient way for customers to pay for goods and services.",
        "Businesses should keep accurate records of POS transactions.",
        "Transaction records can help with reconciliation and financial monitoring.",
      ],
      example:
        "If a customer pays ₦10,000 through POS, the business should record the sale and appropriate payment method.",
      action:
        "Use the payment-method field in BizManage Sales to distinguish different transaction types.",
    },

    {
      category: "Digital Finance",
      title: "Bank Transfers",
      description:
        "Learn good practices for recording business payments made through bank transfers.",
      content: [
        "Bank transfers can make business transactions easier to track.",
        "Businesses should keep transaction information and records organized.",
        "Regular reconciliation can help identify missing or incorrect records.",
      ],
      example:
        "When a customer transfers ₦25,000 for an order, record the sale using the appropriate payment method.",
      action:
        "Keep payment methods accurate in your BizManage sales records.",
    },

    {
      category: "Digital Finance",
      title: "Digital Payments",
      description:
        "Understand the role of digital payments in modern businesses.",
      content: [
        "Digital payments can provide customers with convenient ways to pay.",
        "Businesses should maintain accurate records regardless of how customers pay.",
        "Digital transaction information should be protected appropriately.",
      ],
      example:
        "A business may receive payments through POS, bank transfer and other digital channels during the same day.",
      action:
        "Record each transaction correctly so your business reports remain accurate.",
    },

    {
      category: "Digital Finance",
      title: "Safe Use of Financial Technology",
      description:
        "Learn basic practices for protecting financial accounts and transaction information.",
      content: [
        "Use strong, unique passwords for financial accounts.",
        "Avoid sharing passwords, PINs or authentication codes with other people.",
        "Be cautious when accessing financial services from unfamiliar devices or links.",
      ],
      example:
        "A legitimate financial institution should not require you to disclose sensitive authentication codes to an unknown person contacting you.",
      action:
        "Treat unexpected requests for passwords, PINs or verification codes as suspicious and verify them through official channels.",
    },

    {
      category: "Digital Finance",
      title: "Avoiding Common Digital Financial Scams",
      description:
        "Learn how to recognize suspicious financial requests and fraudulent messages.",
      content: [
        "Scammers may impersonate banks, businesses, customers or service providers.",
        "Unexpected requests for passwords, PINs or verification codes should be treated carefully.",
        "Do not rush into financial transactions because of pressure or threats.",
      ],
      example:
        "A message claiming that your account will be blocked unless you immediately send a verification code should be independently verified.",
      action:
        "When in doubt, contact the relevant institution through an official channel rather than using contact information supplied in a suspicious message.",
    },

    {
      category: "Nigerian SME Resources",
      title: "Funding Information",
      description:
        "Understand some of the funding options that businesses may consider.",
      content: [
        "Businesses may use personal savings, retained profits, loans, investment or other funding sources.",
        "Each funding option has different requirements, costs and risks.",
        "Businesses should carefully evaluate repayment obligations before taking on debt.",
      ],
      example:
        "A business considering a loan should compare the expected business benefit with the total repayment cost.",
      action:
        "Maintain clear business records so you have better information when evaluating potential funding opportunities.",
    },

    {
      category: "Nigerian SME Resources",
      title: "Grants and Business Support",
      description:
        "Learn what to consider when evaluating grants and business-support opportunities.",
      content: [
        "Business-support programmes can have specific eligibility requirements.",
        "Applicants should verify information through official sources.",
        "Be cautious of anyone asking for unnecessary payments or sensitive information in exchange for a supposed grant.",
      ],
      example:
        "Before applying for a funding programme, verify its official requirements and application process.",
      action:
        "Use official sources when researching current Nigerian SME funding and support programmes.",
    },

    {
      category: "Nigerian SME Resources",
      title: "Financial Institutions and Programmes",
      description:
        "Understand the basic role of financial institutions and programmes that may support businesses.",
      content: [
        "Financial institutions can provide services such as payments, savings, credit and other financial products.",
        "Different institutions and programmes have different eligibility requirements.",
        "Businesses should compare terms carefully before using financial products.",
      ],
      example:
        "A business comparing financing options should consider interest, fees, repayment terms and eligibility.",
      action:
        "Use accurate BizManage records to better understand your business position when evaluating financial options.",
    },
  ];

  const categories = [
    "Financial Basics",
    "Business Finance",
    "Savings & Financial Planning",
    "Digital Finance",
    "Nigerian SME Resources",
  ];

  const recommendedLesson = useMemo(() => {
    if (totalSales === 0) {
      return lessons.find(
        (lesson) =>
          lesson.title ===
          "Understanding Profit and Loss"
      );
    }

    if (totalExpenses > totalSales * 0.5) {
      return lessons.find(
        (lesson) =>
          lesson.title ===
          "Managing Business Expenses"
      );
    }

    if (profitMargin < 20) {
      return lessons.find(
        (lesson) =>
          lesson.title ===
          "Pricing Products Correctly"
      );
    }

    return lessons.find(
      (lesson) =>
        lesson.title ===
        "Understanding Profit and Loss"
    );
  }, [
    totalSales,
    totalExpenses,
    profitMargin,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-[var(--muted-text)]">
          Loading financial education...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <p className="text-sm font-medium text-[var(--muted-text)]">
          Learn • Plan • Grow
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Financial Education
        </h1>

        <p className="mt-2 max-w-3xl text-[var(--muted-text)]">
          Practical financial knowledge to help you
          understand your business numbers and make
          better financial decisions.
        </p>
      </div>

      {/* BUSINESS SNAPSHOT */}
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Your Business Snapshot
          </h2>

          <p className="mt-1 text-sm text-[var(--muted-text)]">
            Your financial data helps connect
            learning recommendations with your
            business performance.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-[var(--bg)] p-4">
            <p className="text-sm text-[var(--muted-text)]">
              Total Sales
            </p>

            <p className="mt-2 text-2xl font-bold">
              {formatCurrency(totalSales)}
            </p>
          </div>

          <div className="rounded-xl bg-[var(--bg)] p-4">
            <p className="text-sm text-[var(--muted-text)]">
              Total Expenses
            </p>

            <p className="mt-2 text-2xl font-bold">
              {formatCurrency(totalExpenses)}
            </p>
          </div>

          <div className="rounded-xl bg-[var(--bg)] p-4">
            <p className="text-sm text-[var(--muted-text)]">
              Estimated Profit
            </p>

            <p className="mt-2 text-2xl font-bold">
              {formatCurrency(profit)}
            </p>
          </div>

          <div className="rounded-xl bg-[var(--bg)] p-4">
            <p className="text-sm text-[var(--muted-text)]">
              Profit Margin
            </p>

            <p className="mt-2 text-2xl font-bold">
              {profitMargin.toFixed(1)}%
            </p>
          </div>
        </div>
      </section>

      {/* RECOMMENDATION */}
      {recommendedLesson && (
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
          <p className="text-sm font-semibold">
            💡 Recommended Learning
          </p>

          <h2 className="mt-2 text-xl font-bold">
            {recommendedLesson.title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted-text)]">
            {recommendedLesson.description}
          </p>

          <button
            type="button"
            onClick={() =>
              setSelectedLesson(
                recommendedLesson
              )
            }
            className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[#2E2528] transition hover:opacity-90"
          >
            Start lesson
          </button>
        </section>
      )}

      {/* LESSONS */}
      {categories.map((category) => {
        const categoryLessons =
          lessons.filter(
            (lesson) =>
              lesson.category === category
          );

        return (
          <section key={category}>
            <div className="mb-4">
              <h2 className="text-xl font-bold">
                {category}
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryLessons.map((lesson) => (
                <article
                  key={lesson.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-text)]">
                    {lesson.category}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold">
                    {lesson.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[var(--muted-text)]">
                    {lesson.description}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedLesson(lesson)
                    }
                    className="mt-5 rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bg)]"
                  >
                    Learn more
                  </button>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {/* LESSON MODAL */}
      {selectedLesson && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedLesson(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted-text)]">
                  {selectedLesson.category}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {selectedLesson.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedLesson(null)
                }
                className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm font-semibold"
                aria-label="Close lesson"
              >
                Close
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-[var(--muted-text)]">
              {selectedLesson.description}
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">
                Key points
              </h3>

              <ul className="mt-3 space-y-3">
                {selectedLesson.content.map(
                  (point) => (
                    <li
                      key={point}
                      className="rounded-xl bg-[var(--bg)] p-4 text-sm leading-6"
                    >
                      {point}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-[var(--border)] p-4">
              <h3 className="font-semibold">
                Practical example
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted-text)]">
                {selectedLesson.example}
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-[var(--border)] p-4">
              <h3 className="font-semibold">
                Apply this in BizManage
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--muted-text)]">
                {selectedLesson.action}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedLesson(null)
              }
              className="mt-6 w-full rounded-lg bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-[#2E2528]"
            >
              Finish lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinancialEducation;