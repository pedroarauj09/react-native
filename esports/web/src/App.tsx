import { useState , useEffect} from 'react'; // utilizado para controlar o estado comportamental da aplicação

import * as Dialog from '@radix-ui/react-dialog'

import { GameController, MagnifyingGlassPlus } from 'phosphor-react';
import './styles/main.css';


import logo from './assets/logo.png';
import { GameBanner } from './components/GameBanner';
import { Input } from './components/form/Input';

// para identificar o objeto games
interface Game{
  id:string;
  title:string;
  bannerUrl:string;
  _count:{
    ads:number;
  }
}


function App() {
  const [games, setGames] = useState<Game[]>([]) // games é o valor do UseState
                                                            // setGames é a função que atualiza esta variável 
  
    // captar os dados da rota do backend que contém os games
    useEffect(()=>{ // o useEffect é um efeito, que independente se o estado mudar só ocorre uma vez oq está dentro dele
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data=>{
        setGames(data)
    })
  })

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center m-20'>
      <img className='w-50 h-40' src={logo} alt=""/>
      <h1 className='text-5xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-duo bg-clip-text'>duo</span>  está aqui.
      </h1>
      <div className='grid grid-cols-6 gap-6 mx-16 mt-12'>
          {games.map(game=>{
            return (
              <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads} />
            )
          })} 
     </div>

      <Dialog.Root>
        <div className='pt-1 bg-duo self-stretch rounded-lg mt-8 mx-16 overflow-hidden '>
            <div className='bg-[#2A2634] px-8 py-6 flex justify-between items-center'>
              <div>
                <strong className='text-2xl text-white font-black block'>Não encontrou seu duo?</strong>
                <span className='text-zinc-400 block'>Publique seu anuncio para encontrar novos players!</span>
              </div>
              <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded flex items-center gap-3'>
                  <MagnifyingGlassPlus size={24}/>
                  Publicar Anuncio
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
                <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                  <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
                    <form className='mt-8 flex flex-col gap-2'>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className="font-semibold">Qual o game?</label>
                        <Input id="game" placeholder="Selecione o game que deseja jogar"/>
                      </div>
                      <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome</label>
                        <Input id='name' placeholder='Como te chamam no game?' />
                      </div>
                      <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="yearsPlayed">Joga há quanto tempo?</label>
                          <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser NOOB" />
                        </div>
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="discord">Qual seu discord</label>
                          <Input type="text" id="discord" placeholder="Usuario#0000" />
                        </div>
                      </div>
                      <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="weekDays">Quando costuma a jogar?</label>
                          <div className='grid grid-cols-4 gap-2'>
                            <button title='Domingo' className='w-8 h-8 rounded bg-zinc-900'>D</button>
                            <button title='Segunda' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                            <button title='Terça' className='w-8 h-8 rounded bg-zinc-900'>T</button>
                            <button title='Quarta' className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                            <button title='Quinta' className='w-8 h-8 rounded bg-zinc-900'>Q</button>
                            <button title='Sexta' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                            <button title='Sabado' className='w-8 h-8 rounded bg-zinc-900'>S</button>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                          <label htmlFor="hoursStart">Qual horário do dia?</label>
                          <div className='grid grid-cols-2 gap-2'>
                            <Input id="hoursStart" type="time" placeholder="De" />
                            <Input id="hourEnd" type="time" placeholder="Até" />
                          </div>
                        </div>
                      </div>
                      <div className='mt-2 flex gap-2 text-sm'>
                        <Input type="checkbox" />
                        Costumo me conectar ao chat de voz 
                      </div>
                      <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>
                        <button type='submit' className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
                          <GameController className='w-6 h-6'/>
                          Encontrar Duo 
                        </button>
                      </footer>
                    </form>
                </Dialog.Content>
              </Dialog.Portal>
            </div>
        </div>
        <Dialog.Trigger/>
      </Dialog.Root>

    </div>
  )
}

export default App
