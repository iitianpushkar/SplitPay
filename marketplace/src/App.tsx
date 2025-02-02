// src/App.tsx
import React, { useState, useEffect } from "react";
import { AppSidebar } from "./components/AppSidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import WalletConnector from "./components/connectWallet";
import { formatEther } from "ethers";

// Define a TypeScript interface for a product.
interface Product {
  name: string;
  price: string; // Price in wei as a string.
}

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [contract, setContract] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState<number | null>(null);

  // Fetch products from the contract using its getProducts() function.
  const fetchProducts = async () => {
    if (contract) {
      try {
        console.log("Contract instance:", contract);
        const productsData = await contract.getProducts();
        // productsData is assumed to be an array of tuples where:
        // product.price is a BigNumber and product.name is a string.
        const productsList: Product[] = productsData.map((product: any) => ({
          name: product.name,
          price: product.price.toString(), // Price stored as wei.
        }));
        setProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };

  // Re-fetch products whenever the contract instance changes.
  useEffect(() => {
    if (contract) {
      fetchProducts();
    }
  }, [contract]);

  // When a user clicks "Buy", open the modal and store the selected product index.
  const handleBuy = (productIndex: number) => {
    setSelectedProductIndex(productIndex);
    setShowPaymentModal(true);
  };

  // Run the purchase for "Split Finance" payment option.
  const handlePay = async () => {
    if (!contract || !account || selectedProductIndex === null) {
      alert("Please connect your wallet first!");
      return;
    }
    try {
      const priceInWei = products[selectedProductIndex].price;
      const tx = await contract.buyProduct(selectedProductIndex + 1, { value: priceInWei });
      await tx.wait();
      alert("Purchase successful!");
    } catch (error) {
      console.error("Error buying product:", error);
      alert("Error buying product");
    }
  };

  // Handle the payment option selected from the modal.
  const handlePaymentOption = async (option: string) => {
    if (option === "splitFinance") {
      await handlePay();
    } else {
      alert(`Payment option "${option}" is not implemented yet.`);
    }
    // Close the modal after handling.
    setShowPaymentModal(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="h-4 w-px bg-gray-200" />
          <h1 className="text-xl font-bold">BUY PRODUCTS</h1>
          <nav className="flex flex-1 justify-end">
            {/* WalletConnector receives callbacks to update account and contract state */}
            <WalletConnector
              onAccountChange={(newAccount) => setAccount(newAccount)}
              onContractChange={(newContract) => setContract(newContract)}
            />
          </nav>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => {
                // Convert price from wei to ETH.
                const priceEth = formatEther(product.price);
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">Price: {priceEth} ETH</p>
                    </div>
                    <button
                      onClick={() => handleBuy(index)}
                      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                      Buy
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products available</p>
          )}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-gray-100 md:min-h-min" />
        </div>

        {/* Payment Options Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
              <h2 className="text-xl font-semibold mb-4">Select Payment Option</h2>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handlePaymentOption("upi")}
                    className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Pay via UPI
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePaymentOption("creditCard")}
                    className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Credit Card
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePaymentOption("debitCard")}
                    className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Debit Card
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePaymentOption("splitFinance")}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Split Finance
                  </button>
                </li>
              </ul>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="mt-4 text-sm text-red-600 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default App;
