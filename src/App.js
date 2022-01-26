import './App.css';
import React, {useState,useEffect} from "react";

const bankOne=[
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

const bankTwo=[
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
]
const nameSound = {
  heater:"Heater-1",
  chord:"Chord-1"
}

const controlSound ={
  heater:bankOne,
  chord:bankTwo
}
 


const KeyboardKeyTrigger =({play , sound : {id,keyTrigger,url,keyCode}})=>{

  const handleKeydown =(event)=>{
    
    if(event.keyCode===keyCode){
      play(keyTrigger,id)
      
    }
  }

  useEffect(()=>{
    document.addEventListener("keydown", handleKeydown)
  },[])
return( <button id={keyCode} className='drum-pad' onClick={()=>play(keyTrigger,id)}>
<audio className='clip' id={keyTrigger} src={url} />{keyTrigger}
</button>)

}

const Keyboard = ({play,sounds,mute}) => (
  <div  >
    {mute ? sounds.map((sound)=> <KeyboardKeyTrigger play={play} sound={sound} />)
          :sounds.map((sound)=> <KeyboardKeyTrigger play={play} sound={{...sound,url:"#"}} />)}
  </div>
)

const ControlChangeSound =({name,changeSound,volume,handleChangeVolumen,offVolume,mute})=>{
  return <div>
    <button onClick={offVolume}>sound {mute ? "OFF" : "ON"}</button>
    <h2>Volume: % {Math.round(volume *100)}</h2>
    <input
    max="1"
    min="0"
    step="0.01"
    type="range"
    value={volume}
    onChange={handleChangeVolumen}
    />
    <h2 id='display' >{name}</h2>
    <button onClick={changeSound}>Change Sounds group</button>
  </div>
}

function App() {
  const [mute,setMute]=useState(true)
  const [volume,setVolume]=useState(1)
  const [nameS,setNames]=useState("")
  const [soundName,setSoundName]= useState("heater")
  const[sounds,setSound]=useState(controlSound.heater)

  const handleChangeVolumen=(event)=>{
    setVolume(event.target.value)
  }
  const offVolume=()=>{
    if(!mute){
      setMute(true)
    }else{
      setMute(false)
    }
  }

  const play = (key,id)=>{
    setNames(id)
    const audio = document.getElementById(key)
    audio.currentTime = 0;
    audio.play()
  }

  const changeSound =()=>{
    setNames("")
    if(soundName==="heater"){
      setSoundName("chord")
      setSound(controlSound.chord)
    }else{
      setSoundName("heater")
      setSound(controlSound.heater)
    }
  }
  const setChangeVolume=()=>{
    const volumen = sounds.map(sound=>document.getElementById(sound.keyTrigger))
    volumen.forEach(e=>{
      if(e){
       e.volume = volume
      }
    })
  }

  return(
    <div id="drum-machine">
      
   <Keyboard play={play} mute={mute} sounds={sounds}/> 
   {setChangeVolume()}
   <ControlChangeSound
   offVolume={offVolume} 
   mute={mute}
   volume={volume}
   handleChangeVolumen={handleChangeVolumen} 
   name={nameS || nameSound[soundName]} 
   changeSound={changeSound}/>  
    
    </div>
  )
}

export default App;
