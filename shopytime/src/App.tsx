import { useState } from 'react';
import './App.css'
import { Button } from './components/Button'
import Navbar from './components/Navbar'
import { MarketSection } from './components/section/MarketSection'
import { ParticipantSection } from './components/section/ParticipantsSection'
import { NewMarketForm } from './components/NewMarketForm'

interface Market {
  name: string;
  buyerName: string;
}

function App() {
  const [showNewMarketForm, setShowNewMarketForm] = useState(false);
  const [markets, setMarkets] = useState<Market[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);

  const handleAddMarket = (name: string, buyerName: string) => {
    setMarkets([...markets, { name, buyerName }]);
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

  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-5 p-3'>
        <ParticipantSection onParticipantsChange={handleParticipantsChange} />

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
              onRemove={() => handleRemoveMarket(index)}
              onBuyerChange={(newBuyer) => handleBuyerChange(index, newBuyer)}
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
      </div>
    </>
  )
}

export default App
