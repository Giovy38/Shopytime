import './App.css'
import { Button } from './components/Button'
import { Input } from './components/Input'
import Navbar from './components/Navbar'
import { ProductCard } from './components/ProductCard'
import { Tag } from './components/Tag'
import { TotalCard } from './components/TotalCard'

function App() {

  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-5'>
        <div className='p-3 flex flex-col md:flex-row justify-center items-center gap-5'>
          <Input placeholder='Inserisci un nome da aggiungere' />
          <Button>Aggiungi nome</Button>
        </div>
        <div className='flex justify-center items-center'>
          <Tag>giovanni</Tag>
        </div>
        <div className='flex justify-center items-center gap-5'>
          <ProductCard productName='pasta' price={5} quantity={2} />
          <TotalCard name='giovanni' total={500} />
          <TotalCard name='salvo' total={-20} />
        </div>
      </div>
    </>
  )
}

export default App
