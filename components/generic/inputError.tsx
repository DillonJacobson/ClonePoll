

type props = {
	render: boolean
	message: string
}

const InputError:React.FC<props> = ({render, message}) => {
	
	if (render){
		return (
			<div className="flex justify-center items-center w-full">
				<div className="mt-1 bg-red-600 rounded-full py-1 px-3 text-center max-w-fit">
					{message}
				</div>
			</div>
			
		)
	} else {
		return <></>
	}

}

export default InputError