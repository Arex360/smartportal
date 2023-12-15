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
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import CheckCard from "../components/CheckCard"
let Home = ()=>{
    const options = [
        'Model 01', 'Model 02','Model 03'
      ];
    let keyMap = {
        'Model 01': '0',
        'Model 02': '1',
        'Model 03': '2'
    }
    let __clientID = ''
    let __modelID = ''
    const defaultOption = options[0];
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
            setTrapImage(`http://mnsstrap.ddns.net:5000/getTrapImage/${trapName}`)
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
    const promiseUpdateModel = ()=> new Promise((resolve,reject)=> {
        axios.get(`http://mnsstrap.ddns.net:5000/setModel/${trapName}/${keyMap[__modelID]}`)
        .then(e=>resolve())
        .catch(e=>{    
        reject()
       })
    })
    const UpdateModel = e =>{
        __modelID = e
        toast.promise(promiseUpdateModel, {
            pending: `Updating model of ${__clientID}`,
            success: `Model Updated to ${__modelID}`,
            error: 'Failed to Update model'
        })
    }
    const DownloadCSV = (month)=>{
        window.open(`http://mnsstrap.ddns.net:3001/downloadcsv/${month}/${trapName}`)
    }
    useEffect(()=>{
        const query = window.location.search
        const params= new URLSearchParams(query)
        __clientID = params.get('trap')
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
            <ToastContainer />
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
                    <Dropdown options={options} onChange={e=>UpdateModel(e.value)} value={defaultOption} placeholder="Select an option" />;
                    <div className="grid grid-cols-3 gap-3 mb-3">
                       <CheckCard insectname={"fallarmyworm"} client={trapName} />
                       <CheckCard insectname={"pinkbollworm"} client={trapName} />
                       <CheckCard insectname={"cucurbitae"} client={trapName} />
                       <CheckCard insectname={"dorsalis"} client={trapName} />
                       <CheckCard insectname={"zonata"} client={trapName} />    
                    </div>
                    {false && <Button title={'Refresh'}/>}
                    <div className="grid grid-cols-7 gap-3 mb-3">
                        <Button title={'Jan'} onClick={()=>DownloadCSV('Jan')} locked={true}/>
                        <Button title={'Feb'} onClick={()=>DownloadCSV('Feb')} locked={true}/>
                        <Button title={'Mar'} onClick={()=>DownloadCSV('Mar')} locked={true}/>
                        <Button title={'Apr'} onClick={()=>DownloadCSV('Apr')} locked={true}/>
                        <Button title={'May'} onClick={()=>DownloadCSV('May')} locked={true}/>
                        <Button title={'Jun'} onClick={()=>DownloadCSV('Jun')}/>
                        <Button title={'Jul'} onClick={()=>DownloadCSV('Jul')}/>
                        <Button title={'Aug'} onClick={()=>DownloadCSV('Aug')}/>
                        <Button title={'Sept'} onClick={()=>DownloadCSV('Sep')}/>   
                        <Button title={'Oct'} onClick={()=>DownloadCSV('Oct')}/>
                        <Button title={'Nov'} onClick={()=>DownloadCSV('Nov')}/>
                        <Button title={'Dec'} onClick={()=>DownloadCSV('Dec')} />
                    </div>
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