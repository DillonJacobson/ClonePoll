import { useState } from "react";

type Props = {
	text:string
}

const SwitchInput:React.FC<Props> = ({text}) => {
	const [isToggled, setIsToggled] = useState(false)

	return (
		<div className="pt-2">
			<button 
				className={`py-2 px-4 rounded-lg text-white ${isToggled? 'bg-green-600' : 'bg-red-500'}`} 
				type="button"
				onClick={() => {setIsToggled(!isToggled)}}>{text}</button>
		</div>
	)
}

export default SwitchInput