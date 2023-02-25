import Form from './Form'
import Footer from './Footer';
import { EditProvider } from '../context/Contexts';
import squiggle from '../assets/Vector.svg'

const Home = () => {

  return (
    <>
      <div className='flex justify-center items-center w-full h-40 sticky  bg-gray-900 '>
        {/* <img className="hidden  md:flex  h-40 -rotate-45  -translate-x-20 translate-y-10 -z-10" src={squiggle}></img> */}
        <div className=" flex text-white font-chillax text-4xl">
          bookmarks
        </div>
        {/* <img className="hidden md:flex h-40 r-0 rotate-12 translate-x-2 translate-y-3 -z-50" src={squiggle}></img> */}
      </div>
      <EditProvider>
        <Form />
        <Footer />
      </EditProvider>


    </>
  )
}

export default Home