import Bar from "../components/Bar"
import Navbar from "../components/NavBar"
import Fly from '../assets/fly.jpg'
import Button from "../components/Button"
import { useState } from "react"
import { useEffect } from "react"
import {collection,getDoc,doc,getDocs, DocumentSnapshot} from 'firebase/firestore'
import { db } from "../firebase/firebase"
import axios from "axios"
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
let Home = ()=>{
    const _query = window.location.search
    const _params= new URLSearchParams(_query)
    const API = "https://smartapi-2udiuitul-arex360.vercel.app"
    const APIMain = "https://new-server-2q1fx1lgu-arex360.vercel.app"
    const [trapName,setTrapName] = useState(_params.get('trap'))
    const [value, onChange] = useState(new Date());
    const [pink,setPink] = useState('getting...')
    const [fall,setFall] = useState('getting...')
    const [zonata,setZonata] = useState('getting...')
    const [Dorasalis,setDoasalis] = useState('getting...')
    const [cucu,setCucu] = useState('getting...')
    const [date,setDate] = useState('getting...')
    const [temp,setTemp] = useState('getting...')
    const [hum,setHum] = useState('getting...')
    const [trapImage,setTrapImage] = useState('http://mnsstrap.ddns.net:5000/getTrapImage/client1')
    const getDetection = async (insectName)=>{
        const insect = await axios.get(APIMain+'/getdetection/'+trapName+'/'+insectName)
        return insect.data
    }
    const getData= async ()=>{
        setTimeout(async ()=>{
            const humidity = await axios.get(API+'/getTempreture/'+trapName)
            setHum(humidity.data)
            const tempreture = await axios.get(API+'/getHumidity/'+trapName)
            setTemp(tempreture.data)
            const date = await axios.get(APIMain+'/gettraptime/'+trapName)
            setDate(date.data)
            setPink(await getDetection('pinkbollworm'))
            setCucu(await getDetection('cucurbitae'))
            setZonata(await getDetection('zonata'))
            setDoasalis(await getDetection('dorsalis'))
            setFall(await getDetection('fallarmyworm'))
        },3000)
        
    }
    useEffect(()=>{
        const query = window.location.search
        const params= new URLSearchParams(query)
        setTrapName(params.get('trap'))
        getData()
        const userDoc = doc(db,"users","/051a9911de7b5bbc610b76f4eda834a0")
        const snapshot =getDocs(collection(db,"users/")).then(res=>{
            const docs = res.docs
            docs.forEach(doc=>{
                console.log(doc.data())
            })
        })
    },[])
    return(
        <div className="w-full h-[100vh]">
           <Navbar/>
            <div className="preview w-full h-[80vh] px-10 flex items-center justify-between  bg-gray-800">
                <div className="left w-3/6 h-full flex flex-col justify-center items-center bg-white shadow-2xl mt-10 rounded-2xl">
                    <h1 className="font-bold text-5xl">{trapName}</h1>
                    <h2 className="mt-2 mb-2">Details</h2>
                    <Bar title={'Pink BollWorm'} count={pink}/>
                    <Bar title={'Fall Armyworm'} count={fall}/>
                    <Bar title={'Zonata'} count={zonata}/>
                    <Bar title={'Dorasalis'} count={Dorasalis}/>
                    <Bar title={'Cucurbitae'} count={cucu}/>
                    <br></br>
                    <div className="date flex gap-3 justify-center items-center mb-5">
                        <DatePicker onChange={onChange} value={value} />
                        <Button onClick={()=>{
                            const _date = new Date()
                            _date.setDate(value.getDate())
                            alert(_date.getTime())
                        }}  title={'Set Expiry'}/>
                    </div>
                    <Button title={'Refresh'}/>
                    
                </div>
                <div className="right w-2/6 h-full flex flex-col justify-center items-center shadow-lg">
                    <div className="img w-full h-1/2">
                        <img src={trapImage} className={'w-full h-full'} alt="" />
                    </div>
                    <div className="container bg-white w-full h-1/3 rounded-lg mt-5 flex flex-col justify-center items-center">
                        <Bar title={"Date"} count={date}/>
                        <Bar title={"Tempreture"} count={temp}/>
                        <Bar title={"Humidity"} count={hum}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Home