import axios from "axios"
import { useEffect, useState } from "react"
const CheckCard = ({insectname,client})=>{
    let [all_insects,setAllinsect] = useState(``)
    let [checked,setChecked] = useState(true)
    let [_id,setID] = useState(insectname)
    let [blurred,setBlurred] = useState("opacity-30")
    const onChange= async (e)=> {
        if(e.target.checked){
            let res = await axios.get(`http://mnsapi.ddns.net:3001/getmode/${client}`)
            res = res.data
            if(!res.includes(insectname)){
                const _query = window.location.search
                const _params= new URLSearchParams(_query)
                let snapshot = await axios.get(`http://mnsapi.ddns.net:3001/setmode/${_params.get(`trap`)}/${res}`+insectname)
            }
        }else{
            let res = await axios.get(`http://mnsapi.ddns.net:3001/getmode/${client}`)
            res = res.data
            if(res.includes(insectname)){
                const _query = window.location.search
                const _params= new URLSearchParams(_query)
                let target = res.replace(insectname,"")
                let snapshot = await axios.get(`http://mnsapi.ddns.net:3001/setmode/${_params.get(`trap`)}/`+target)
            }
        }
    }
    const getDetail = async ()=>{
        let res = await axios.get(`http://mnsapi.ddns.net:3001/getmode/${client}`)
        res = res.data
        setAllinsect(all_insects)
        setChecked(false)
        setBlurred("opacity-100 ")
        if(res.includes(insectname)){
            let _doc = document.querySelector(`#${_id}`)
            _doc.checked = true  
        }

    }
    useEffect(()=>{
        getDetail()
    },[])
    return(
        <div className={"flex items-center px-2 w-[150px] justify-between h-[30px] bg-white shadow-2xl border-2"+ ` ${blurred}`}>
            <label htmlFor="">{insectname}</label>
            <input disabled={checked} id={_id} onChange={(e)=>onChange(e)} type="checkbox" />
        </div>
    )
}
export default CheckCard