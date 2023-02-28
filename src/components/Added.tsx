
import { motion } from "framer-motion"

//Popup notification when new link added


const Added = () => {
  return (
    <div className="fixed h-screen w-screen flex flex-col justify-center items-center top-0 left-0 z-20 backdrop-blur-sm backdrop-brightness-50">
      <motion.div className="p-1 rounded-lg bg-gray-800 "
      whileInView="visible"
      initial="hidden"
      transition={{duration:0.4}}
      variants={{
        hidden: {opacity: 0.7, scale:1},
        visible: {opacity: 1,  scale:1.2}
      }}>
      <div className="p-1 text-slate-50 text-xs"> Added</div>
      </motion.div>
     
    </div>
  )
}

export default Added