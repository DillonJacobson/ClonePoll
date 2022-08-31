import { NextPage } from "next";

type Props = {
    name: string;
    label: string;
    type: string;
    onChange: (e: any) => void;
    onBlur?: () => void;
    placeholder?: string;
};

const TextInput: NextPage<Props> = ({
    name,
    label,
    onChange,
    onBlur,
    type,
    placeholder,
}) => {
    let classes = `rounded-md py-2 px-3 bg-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-0 w-96`

    return (
        <div className="text-white">
            <label htmlFor={name} className='font-semibold'>{label}</label>
            <div className="mt-1">
                <input
                    type={type}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={classes}
                />
            </div>
        </div>
    );
};

export default TextInput;
