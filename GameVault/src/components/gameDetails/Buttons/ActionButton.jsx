import { Link } from 'react-router-dom'

const ActionButton = ({action, icon, link, onClick}) => {
  if (onClick) {
    return (
      <button onClick={onClick} className='flex items-center gap-2 px-4 border group border-white/10 tracking-wider uppercase transition-all text-white py-2 font-black cursor-pointer bg-black/40 backdrop-blur-lg rounded-full hover:bg-primary hover:text-black duration-300'>
          {icon && (<i className={`${icon} `}></i>)}
          {action}
      </button>
    )
  }

  return (
    <Link to={link}>
      <button className='flex items-center gap-2 px-4 border group border-white/10 tracking-wider uppercase transition-all text-white py-2 font-black cursor-pointer bg-black/40 backdrop-blur-lg rounded-full hover:bg-primary hover:text-black duration-300'>
          {icon && (<i className={`${icon} `}></i>)}
          {action}
      </button>
    </Link>
  )
}

export default ActionButton
