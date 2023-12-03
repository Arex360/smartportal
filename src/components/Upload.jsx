import { useState } from "react"
import close from '../assets/close.webp'
let Upload = ({onChange,title})=>{
    let [selected,setSelected] = useState(false)
    let [objURL,setObjectURL] = useState('')
    return(
            <div className=" flex bg-black bg-opacity-0">
                <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                    {selected == false && <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg" >
                    <div className="title text-indigo-500 uppercase mx-5">{title}</div>
                        <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                        <div className="input_field flex flex-col w-max mx-auto text-center">
                            <label>
                                <input onChange={e=>{
                                    onChange(e.target.files[0])
                                    setSelected(true)
                                    const file = e.target.files[0]
                                    setObjectURL(URL.createObjectURL(file))
                                    }} className="text-sm cursor-pointer w-36 hidden" type="file" multiple />
                                <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                            </label>

                            <div className="title text-indigo-500 uppercase">or drop files here</div>
                        </div>
                    </div>}
                    {objURL != ""  && <div className="w-48 h-48 relative">
                         <img src={objURL} className="w-full h-full" alt="" />
                         <img onClick={()=>{
                            setSelected(false)
                            setObjectURL("")
                        }}  className="absolute w-10 top-[-13%] right-[-10%]" src={close}/>
                    </div>}

                </div>
            </div>
    )
}
export default Upload