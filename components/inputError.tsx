import { NextPage } from "next";

type props = {
	render: boolean
	message: string
}

const InputError:NextPage<props> = ({render, message}) => {
	
	if (render){
		return (
			<div className="mt-1 bg-red-600 rounded-full px-3">
				{message}
			</div>
		)
	} else {
		return <></>
	}

}

export default InputError