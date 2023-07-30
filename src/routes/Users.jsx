import Bar from "../components/Bar"
import Navbar from "../components/NavBar"
import Fly from '../assets/fly.jpg'
import Button from "../components/Button"
import { useState } from "react"
import { useEffect } from "react"
import {collection,getDoc,doc,getDocs, DocumentSnapshot} from 'firebase/firestore'
import md5 from "md5"
import { db, RDb } from "../firebase/firebase"
import {ref,get, child} from 'firebase/database'
let Users = ()=>{
    const _query = window.location.search
    const _params= new URLSearchParams(_query)
    const [trapName,setTrapName] = useState('')
    const [userBars,setUserBars] = useState([])
    const [traps,setTraps] = useState([])
    const [Hash,setHash] = useState('Hash')
    const getTraps =async email=>{
        email = md5(email)
        const _ref = ref(RDb)
        const snapshot = await get(child(_ref,"accounts/"+email))
        const myTraps = []
        snapshot.forEach(shot=>{
            const data = shot.val()
            for(var key in data){
                const _details = data[key]
                if(myTraps.includes(_details.trapID) == false){
                    myTraps.push(<Bar onClick={()=>window.open('/preview?trap='+_details.trapID)} title={_details.trapID} count="active"/>)
                }
            }
            setTraps(myTraps)
        })
    }
    useEffect(()=>{
        const query = window.location.search
        const params= new URLSearchParams(query)
        setTrapName(params.get('trap'))
        const userDoc = doc(db,"users","/051a9911de7b5bbc610b76f4eda834a0")
        const snapshot =getDocs(collection(db,"users/")).then(res=>{
            const docs = res.docs
            const bars = []
            docs.forEach(doc=>{
                bars.push(<Bar onClick={()=>getTraps(doc.data().email)} title={doc.data().name} count={doc.data().email}></Bar>)
            })
            setUserBars(bars)
        })
    },[])
    return(
        <div className="w-full h-[100vh]">
           <Navbar/>
            <div className="preview w-full h-[80vh] px-10 flex items-center justify-between  bg-gray-800">
                <div className="left w-3/6 h-full flex flex-col justify-center items-center bg-white shadow-2xl mt-10 rounded-2xl">
                    <h2 className="mt-2 mb-2">Details</h2>
                    <div className="bars w-full flex flex-col justify-center items-center h-2/3 overflow-scroll">
                    {userBars}
                    </div>
                    <br></br>
                    <Button title={'Refresh'}/>
                    
                </div>
                <div className="right w-2/6 h-full flex flex-col justify-center items-center shadow-lg">
                    <div className="img w-full h-1/2">
                        <img src={Fly} className={'w-full h-full'} alt="" />
                    </div>
                    <div className="container bg-white w-full h-1/3 rounded-lg mt-5 flex flex-col justify-center items-center">
                        <div className="container flex flex-col w-full h-2/3 justify-center items-center overflow-scroll">
                        {traps}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Users