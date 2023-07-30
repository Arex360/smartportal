const Bar = ({title, count,onClick})=>{
    return(
        <div onClick={onClick} className="bar mb-2 cursor-pointer hover:scale-110 duration-300 w-2/3 h-8 opacity-50 bg-blue-600 rounded-full flex justify-between px-3 items-center text-white font-bold ">
            <label htmlFor="">{title}</label>
            <label htmlFor="">{count}</label>
        </div>
    )
}
export default Bar