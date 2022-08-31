import {NextPage} from 'next'

type props = {
	active:boolean
	text: string
	url: string
}

const NavLink:NextPage<props> = ({active, text, url}) =>{

	return (
		<a href={url} className="px-8 transition ease-in-out duration-100 border-white hover:border-b-2 inline-flex items-center">{text}</a>
	)
}

export default NavLink