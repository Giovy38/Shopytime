import logo from './../assets/logo.svg'

const Navbar = () => {
    return (
        <div className='h-30 w-full bg-primary-color flex justify-center items-center'>
            <img src={logo} alt="logo" className='w-30 h-30' />
        </div>
    )
}

export default Navbar