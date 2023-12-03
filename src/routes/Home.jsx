import { useEffect, useState } from "react"
import Upload from "../components/Upload"
import axios from "axios"
import Button from "../components/Button"
import ClipLoader from "react-spinners/PuffLoader";
let Home = ()=>{
    const override  = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
      };
    const [sourceImage,setSourceImage] = useState("")
    const [targetImage,setTargetImage] = useState("")
    const [url,setResultURL] = useState("")
    const [index,setIndex] = useState(0)
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");
    let generateRandomNumber = (a,b) => { 
        const min = a; 
        const max = b; 
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; 
        return randomNumber
    }; 
    let SendImage = ()=>{
        setLoading(true)
        setResultURL("")
        console.log("sending request")
        //setTitle("Processing, it may take upto 2 minutes")
        let came = generateRandomNumber(0,1000)
        console.log(came)
        const body = {
          clientID:came,
          sourceImage:sourceImage,
          targetImage:targetImage
        }
        axios.post('http://deepfake.zapto.org:443/postPhoto',body).then(res=>{
          //setResultURL(`${res.data.processed_url}?i=${index}`)
          setLoading(false)
          window.location.replace(res.data.processed_url)
          console.log(res.data)
          let i = index
          i++
          setIndex(i)
        }).catch(e=>console.log(e))
    }
    let SendBase64 = (e,callback)=>{
        let FR = new FileReader()
        FR.addEventListener("load",output=>{
            let base = output.target.result
            base = base.split(",")
            base = base[1]
            callback(base)
            console.log(sourceImage)
        })
        FR.readAsDataURL(e)
    }
    useEffect(()=>{
        console.log(sourceImage)
    },[])
    return(
        <div className="body w-full h-[100vh] bg-gray-800">
            <div className="nav shadow-xl w-full h-[10%] flex items-center pl-6">
                    <label className="text-white text-3xl font-bold" htmlFor="">FakeEye</label>
            </div>
            <div className="cnt flex-col flex items-center">
                <div className="left">
                    <div className="flex gap-10 pt-10 pl-10">
                        <Upload title={"Source Image"} onChange={e=>SendBase64(e,setSourceImage)}/>
                        <Upload title={"Target Image"} onChange={e=>SendBase64(e,setTargetImage)}/>
                        <img src="" alt="" />
                    </div>
                    <div className="flex gap-10 pt-10 pl-10 w-[90%] mx-auto">
                        <Button title={"Proceed"} onClick={()=>SendImage()}/>
                    </div>
                </div>
                <div className="right w-96 h-96 flex items-center justify-center">
                    {url != "" && <img className="w-full h-full" src={url} alt="" />}
                    {url == "" &&<ClipLoader
                        color={color}
                        loading={loading}
                        cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />}
                </div>
            </div>

        </div>
    )
}
export default Home