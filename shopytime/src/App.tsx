import { useState } from 'react';
import './App.css'
import { Button } from './components/Button'
import Navbar from './components/Navbar'
import { MarketSection } from './components/section/MarketSection'
import { ParticipantSection } from './components/section/ParticipantsSection'
import { NewMarketForm } from './components/NewMarketForm'
import { CountSection } from './components/section/CountSection'

interface Market {
  name: string;
  buyerName: string;
  products: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

function App() {
  const [showNewMarketForm, setShowNewMarketForm] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);

  const handleAddMarket = (name: string, buyerName: string) => {
    setMarkets([...markets, { name, buyerName, products: [] }]);
    setShowNewMarketForm(false);
  };

  const handleRemoveMarket = (index: number) => {
    setMarkets(markets.filter((_, i) => i !== index));
  };

  const handleBuyerChange = (index: number, newBuyer: string) => {
    setMarkets(markets.map((market, i) =>
      i === index ? { ...market, buyerName: newBuyer } : market
    ));
  };

  const handleParticipantsChange = (newParticipants: string[]) => {
    setParticipants(newParticipants);
  };

  const getAssignedBuyers = () => {
    return markets.map(market => market.buyerName);
  };

  const handleAddProduct = (marketIndex: number, product: { name: string; price: number; quantity: number }) => {
    setMarkets(markets.map((market, i) =>
      i === marketIndex ? { ...market, products: [...market.products, product] } : market
    ));
  };

  const handleRemoveProduct = (marketIndex: number, productIndex: number) => {
    setMarkets(markets.map((market, i) =>
      i === marketIndex ? { ...market, products: market.products.filter((_, j) => j !== productIndex) } : market
    ));
  };

  const handleQuantityChange = (marketIndex: number, productIndex: number, newQuantity: number) => {
    setMarkets(markets.map((market, i) =>
      i === marketIndex ? {
        ...market,
        products: market.products.map((product, j) =>
          j === productIndex ? { ...product, quantity: newQuantity } : product
        )
      } : market
    ));
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-5 p-3'>
        <ParticipantSection
          onParticipantsChange={handleParticipantsChange}
          assignedBuyers={getAssignedBuyers()}
        />

        <div className="flex flex-col gap-5">
          {participants.length >= 2 && (
            <div className='flex justify-center'>
              <Button variant='primary' onClick={() => setShowNewMarketForm(true)}>Aggiungi negozio</Button>
            </div>
          )}
          {markets.map((market, index) => (
            <MarketSection
              key={index}
              marketName={market.name}
              buyerName={market.buyerName}
              participants={participants}
              products={market.products}
              onRemove={() => handleRemoveMarket(index)}
              onBuyerChange={(newBuyer) => handleBuyerChange(index, newBuyer)}
              onAddProduct={(product) => handleAddProduct(index, product)}
              onRemoveProduct={(productIndex) => handleRemoveProduct(index, productIndex)}
              onQuantityChange={(productIndex, newQuantity) => handleQuantityChange(index, productIndex, newQuantity)}
            />
          ))}
        </div>

        {showNewMarketForm && (
          <NewMarketForm
            onConfirm={handleAddMarket}
            onCancel={() => setShowNewMarketForm(false)}
            participants={participants}
          />
        )}

        {markets.length > 0 && (
          <CountSection
            markets={markets.map(market => ({
              name: market.name,
              amount: market.products.reduce((total, product) => total + (product.price * product.quantity), 0),
              participant: market.buyerName
            }))}
            participants={participants}
          />
        )}
      </div>
    </>
  )
}

export default App
