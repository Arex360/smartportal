const Button = ({title,onClick,locked=false})=>{
    if(!locked)
        return(
            <button disabled={locked} onClick={onClick} type="button" className={`text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 lockdark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 opacity-70`}>{title}</button>
        )
    else
        return(
            <button  type="button" className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 lockdark:bg-blue-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800 opacity-70`}>{title}</button>
        )
}
export default Button
