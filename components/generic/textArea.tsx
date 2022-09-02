
type Props = {
    name: string;
    label: string;
    onChange: (e: any) => void;
    onBlur?: () => void;
    placeholder?: string;
};

const TextArea:React.FC<Props> = (
	{
		name,
		label,
		onChange,
		onBlur,
		placeholder,
	}
) => {


	let classes = 'rounded-md py-2 px-3 bg-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-0 w-96 resize-none'

	return (
		<div className="text-white">
            <label htmlFor={name} className='font-semibold'>{label}</label>
            <div className="mt-1">
                <textarea
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={placeholder}
					className={classes}
					maxLength={128}
					rows={3}
                />
            </div>
        </div>
	)
}

export default TextArea