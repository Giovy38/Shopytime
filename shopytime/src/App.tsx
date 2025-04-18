import { useState } from 'react';
import './App.css'
import { Button } from './components/Button'
import Navbar from './components/Navbar'
import { MarketSection } from './components/section/MarketSection'
import { ParticipantSection } from './components/section/ParticipantsSection'
import { NewMarketForm } from './components/NewMarketForm'

function App() {
  const [showNewMarketForm, setShowNewMarketForm] = useState(false);
  const [markets, setMarkets] = useState<string[]>([]);

  const handleAddMarket = (name: string) => {
    setMarkets([...markets, name]);
    setShowNewMarketForm(false);
  };

  const handleRemoveMarket = (index: number) => {
    setMarkets(markets.filter((_, i) => i !== index));
  };

  return (
    <>
      <Navbar />
      {/* sezione dei partecipanti */}
      <div className='flex flex-col gap-5 p-3'>
        <ParticipantSection />

        <div className="flex flex-col gap-5">
          <div className='flex justify-center'>
            <Button variant='primary' onClick={() => setShowNewMarketForm(true)}>Aggiungi negozio</Button>
          </div>
          {markets.map((market, index) => (
            <MarketSection
              key={index}
              marketName={market}
              onRemove={() => handleRemoveMarket(index)}
            />
          ))}

        </div>

        {showNewMarketForm && (
          <NewMarketForm
            onConfirm={handleAddMarket}
            onCancel={() => setShowNewMarketForm(false)}
          />
        )}
      </div>
    </>
  )
}

export default App
