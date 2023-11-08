const Bar = ({title, count,onClick})=>{
    return(
        <div onClick={onClick} className="bar mt-2 pt-1 pb-1 cursor-pointer duration-300 w-2/3 h-8 opacity-50 bg-black flex justify-between px-3 items-center text-white font-bold ">
            <label htmlFor="">{title}</label>
            <label htmlFor="">{count}</label>
        </div>
    )
}
export default Bar