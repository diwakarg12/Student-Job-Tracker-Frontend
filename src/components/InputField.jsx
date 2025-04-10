
const InputField = ({label, inputType, value, onChange, name, placeholder, isDisabled, style}) => {
  return (
		  <div className="w-full my-4">
		  	<label htmlFor='name' className='block text-sm font-medium text-gray-700 ml-1'>
		  		{label}
		  	</label>
		  	<div className='mt-1'>
		  		<input
		  			id={name}
		  			name={name}
		  			type={inputType}
		  			required
		  			value={value}
		  			onChange={onChange}
					placeholder={placeholder}
					disabled={isDisabled}
		  			className={`text-black appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-pink-500 focus:border-pink-500 sm:text-sm ${isDisabled ? "bg-gray-300 cursor-not-allowed": "bg-white"} ${style}`}
		  		/>
		  	</div>
		  </div>
  )
}

export default InputField