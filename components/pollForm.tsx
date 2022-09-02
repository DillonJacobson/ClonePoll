import { useState } from 'react';
import AnswerOptions from './generic/answerOptionInput';
import SwitchInput from './generic/switch';
import TextArea from './generic/textArea';
import TextInput from './generic/textInputs';

type PollProps = {

}


const PollForm:React.FC<PollProps> = () => {
	let [title, setTitle] = useState('')
	let [description, setDescription] = useState('')
	let [showDescription, setShowDescription] = useState(false)


	return (
		<div className='bg-slate-700 px-12 py-12 rounded-xl border-t-8 border-blue-500'>
			<h2 className='text-white font-bold text-3xl pb-4 text-center'>Create a new poll</h2>
			<form className='space-y-4' action='/api/v1/polls' method='POST'>
				<TextInput name='title' label='Title:' type='text' placeholder='Your Question Here...' onChange={(e)=>{setTitle(e.target.value)}} />
				<div className={`pt-0 !mt-0 ${showDescription ? 'hidden' : 'inline-block'}`}>
					<span className=' text-xs text-slate-400 hover:text-slate-200 cursor-pointer' onClick={() => {setShowDescription(true)}}>+ Add Description</span>
				</div>
				<div className={`${showDescription ? 'inline-block' : 'hidden'}`}>
					<TextArea name='description' label='Description:' placeholder='More detail...' onChange={(e)=>{setDescription(e.target.value)}} />
					<div className={`pt-0 !mt-0 float-right ${showDescription ? 'inline-block' : 'hidden' }`}>
						<span className=' text-xs text-slate-400 mr-2' onClick={() => {setShowDescription(false)}}>({description.length}/128)</span>
						<span className=' text-xs text-slate-400 hover:text-slate-200 cursor-pointer' onClick={() => {setShowDescription(false)}}>Hide Description</span>
					</div>
				</div>
					<AnswerOptions />
				<div>
					<span className='font-semibold text-white'>Additional Settings:</span>
					<div className='flex flex-row justify-evenly max-w-xl'>
						<SwitchInput text="Allow Anon" />
						<SwitchInput text="Multi Choice"/>
						<SwitchInput text="Public Results"/>
					</div>
				</div>
				<button type='button' className='bg-blue-500 hover:bg-blue-700 w-full py-4 rounded-lg text-white'>Create Poll</button>
				
			</form>
		</div>
	)
}


export default PollForm;