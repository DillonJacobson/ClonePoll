import {NextPage} from 'next'
import NavLink from './navLink'

type props = {
	openRegisterModal: (e:any) => void
	openLoginModal: (e:any) => void
}

const Nav:NextPage<props> = ({openRegisterModal, openLoginModal}) => {

	return (
		<div className='flex flex-row justify-between text-white items-center bg-slate-800 max-w-7xl py-2 mx-auto lg:px-8'>
			<div>
				<h1 className='font-bold text-2xl'>ClonePoll</h1>
			</div>
			<div className='flex flex-row h-full'>
				<NavLink text="Create Poll" active={false} url="/" />
				<NavLink text="View Polls" active={false} url="/" />
				<NavLink text="Profile" active={false} url="/" />
			</div>
			<div>
				<button className='transition ease-in duration-50 py-2 ml-2 px-4 rounded-md border-[1px] border-white hover:bg-blue-700 hover:shadow-lg' onClick={openLoginModal}>Login</button>
				<button className='transition ease-in duration-50 py-2 ml-2 px-4 rounded-md bg-blue-500 hover:bg-blue-700 hover:shadow-lg' onClick={openRegisterModal}>Register</button>
			</div>
		</div>
	)

} 

export default Nav