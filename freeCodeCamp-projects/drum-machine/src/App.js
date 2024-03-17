import './App.css';
import { useRef, useEffect, useState, useCallback, createContext, useContext } from 'react';


const ThemeContext = createContext();

const App = () => {
  //pad name state
  const [padName, setPadName] = useState('');
  //power state
  const [open, setOpen] = useState(true);
  const handleCheckBox = () => {
    setOpen(!open);
    setPadName("");
  }
  //volume state
  const [volume, setVolume] = useState(50);
  //theme state
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    document.body.style.backgroundColor = theme ? '#EEE' : '#0D1F23';
  }, [theme])
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div id="div-main">
        <button className="btnTheme" onClick={() => setTheme(!theme)}>
          {theme
            ? <span id='icon-sun' className="material-symbols-outlined">sunny</span>
            : <span className="material-symbols-outlined">dark_mode</span>}
          Theme
        </button>
        <div id='drum-machine' className={theme ? 'drum-machine drum-machine-change' : 'drum-machine'}>
          <div id="div-drum-pad">
            <DrumPad padName={padName} setPadName={setPadName} open={open} volume={volume} />
          </div>
          <div id="div-control">
            <Control padName={padName}
              open={open} setOpen={setOpen} onChange={handleCheckBox}
              volume={volume} setVolume={setVolume} />
          </div>
        </div>
        <a id='home' href='https://yiming-liao.github.io/'>
          <div id="div-home">
            <p id="sig">Yiming Liao</p>
            <i className="fa-solid fa-house-chimney"></i>
          </div>
        </a>
      </div>
    </ThemeContext.Provider>
  )
}

const Control = ({ padName, open, onChange, setVolume }) => {
  //theme state as props
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <div id="power" className={theme ? 'power power-change' : 'power'}>Power</div>
      <label className="switch">
        <input id="checkbox" type="checkbox" checked={open} onChange={onChange} />
        <span className={theme ? "slider round slider-change" : "slider round"}></span>
      </label>
      <div id="display" className={theme ? 'display display-change' : 'display'}>{padName}</div>
      <input id="range" className={theme ? 'range range-change' : 'range'}
        type="range" min="0" max="100" onChange={(e) => { setVolume(parseInt(e.target.value)) }} />
    </>
  )
}

const DrumPad = ({ setPadName, open, volume }) => {
  const audioRefs = useRef({});
  const btnRefs = useRef({});
  //theme state as props
  const { theme } = useContext(ThemeContext);
  //pad click ↓
  const handleMouseDown = useCallback((id) => {
    let audio = audioRefs.current[id];
    if (open) {
      audio.volume = volume / 100;
      audio.play();
      audio.currentTime = 0;
      //set pad name on display ↓
      let findTheEle = set.find(ele => ele.id === id);
      setPadName(findTheEle.btnId);
    }
    //CSS style change on btn ↓
    let btn = btnRefs.current[id];
    theme ? btn.classList.add('drum-pad-active-change') : btn.classList.add('drum-pad-active');
  }, [open, setPadName, volume, theme]);
  //CSS style change on btn 
  const handleMouseUp = useCallback((id) => {
    let btn = btnRefs.current[id];
    theme ? btn.classList.remove('drum-pad-active-change') : btn.classList.remove('drum-pad-active');
  }, [theme]);
  //key down key up ↓
  //event listener for keydown、keyup ↓
  useEffect(() => {
    const handleKeyDown = (e) => handleMouseDown(e.key.toUpperCase());
    const handleKeyUp = (e) => handleMouseUp(e.key.toUpperCase());
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    //remove ↓
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    }
  }, [handleMouseDown, handleMouseUp, open, volume]);

  return (
    <>
      {set.map(ele => (
        <button className={theme ? "drum-pad drum-pad-change" : "drum-pad"}
          id={ele.btnId} key={ele.id} ref={(btn) => { btnRefs.current[ele.id] = btn }}
          onMouseDown={() => handleMouseDown(ele.id)} onMouseUp={() => handleMouseUp(ele.id)}>
          <audio className="clip" id={ele.id} src={ele.src} ref={(audio) => { audioRefs.current[ele.id] = audio }}>
          </audio>{ele.id}
        </button>
      )
      )}
    </>
  )
}

const set = [
  { id: 'Q', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', btnId: `Heater1` },
  { id: 'W', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', btnId: `Heater2` },
  { id: 'E', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', btnId: `Heater3` },
  { id: 'A', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', btnId: `Heater4` },
  { id: 'S', src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', btnId: `Clap` },
  { id: 'D', src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', btnId: `Open-HH` },
  { id: 'Z', src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', btnId: `Kick-n'-Hat` },
  { id: 'X', src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', btnId: `Kick` },
  { id: 'C', src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', btnId: `Closed-HH` },
]
export default App;
