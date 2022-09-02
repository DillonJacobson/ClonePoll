import { useState } from "react";

type AnswerProps = {
    index: number;
    onChange: (e: any) => void;
    onBlur?: () => void;
    placeholder?: string;
	handleRemove: () => void
	required: boolean
}

const AnswerInput:React.FC<AnswerProps> = ({
	index,
    onChange,
    onBlur,
    placeholder,
	handleRemove,
	required
}) => {
	let classes = `rounded-md py-2 px-3 bg-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-0 w-96`
	return (
		<div className="text-white">
		<div className="mt-1 relative">
			<input
				type="text"
				name={`answer-${index}`}
				onBlur={onBlur}
				onChange={onChange}
				placeholder={placeholder}
				className={classes}
			/>
			{!required && <button 
				className='absolute right-px p-2 text-slate-400 hover:text-slate-200 hover:cursor-pointer'
				onClick={handleRemove}>X</button>
			}
		</div>
	</div>
	)
}

interface answerSchema {
	id: number,
	text: string,
	uuid: string
}


const AnswerOptions:React.FC = () =>{
	let initialAnswerState: Array<answerSchema> = [
		{id: 0, text:'', uuid:''},
		{id: 1, text:'', uuid:''}
	]
	let [answers, setAnswers] = useState(initialAnswerState)
	function addAnswer(){
		setAnswers([...answers, {id:answers.length, text:'', uuid:''}])
	}

	function updateAnswers(index:number, value:answerSchema){
		setAnswers(answers.map((answer) => {return answer.id === index ? value : answer}))
	}

	function removeAnswer(index:number){
		setAnswers(answers.filter((answer) => {
			return answer.id !== index
		}))
	}

	return (
		<div>
			<span className='font-semibold text-white'>Answers:</span>
				<div className='space-y-2'>
					{
						answers.map((answer, index) => {
							return <AnswerInput
								required={index <= answers.length - 2 || answers.length == 2 ? true: false}
								index={answer.id}
								key={answer.uuid || answer.id} 
								onChange={(e)=>{updateAnswers(answer.id, e.target.value)}} 
								placeholder={answer.text ? '':`Option ${answer.id + 1}`}
								handleRemove={()=>{removeAnswer(answer.id)}}/>
							})
					}
				</div>
			<span className={`text-xs text-slate-400 hover:text-slate-200 cursor-pointer ${answers.length < 8 ? 'inline-block': 'hidden'}`} 
				onClick={() => {addAnswer()}}>+ Add Option</span>
		</div>
	)
}

export default AnswerOptions