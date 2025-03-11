import { useState, useEffect } from 'react'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function randomPass(uppercase, lowercase, numbers, characters, length) {
  let options = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    characters: '!@#$%^&*()_+=-[]{};:?><,.|',
  }
  let charset = ''
  let password = ''

  // Add at least one character from each selected option
  if (uppercase) {
    charset += options.uppercase
    password += options.uppercase[Math.floor(Math.random() * 26)]
  }
  if (lowercase) {
    charset += options.lowercase
    password += options.lowercase[Math.floor(Math.random() * 26)]
  }
  if (numbers) {
    charset += options.numbers
    password += options.numbers[Math.floor(Math.random() * 10)]
  }
  if (characters) {
    charset += options.characters
    password += options.characters[Math.floor(Math.random() * 26)]
  }

  // Add random characters from selected options
  for (let i = password.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

  // Shuffle the password
  password =
    password
      .split("")
      .sort(function () {
        return 0.5 - Math.random()
      })
      .join("")

  return password
}

function App() {
  const [len, setLen] = useState(8)
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    characters: true
  })
  const [password, setPassword] = useState('')

  // Generate password on initial render
  useEffect(() => {
    handleGenerate(len)
  }, [])

  // Update range background and generate password on length change
  useEffect(() => {
    updateRangeBackground(len);
    handleGenerate()
  }, [len, options]);

  // Update range background for slider on input
  const updateRangeBackground = (value) => {
    const range = document.querySelector('.slider');
    const percentage = ((value - 8) / (32 - 8)) * 100;
    range.style.setProperty('--value', `${percentage}%`);
  }

  // Handle checkbox select
  const handleSelect = (e) => {
    let { name, checked } = e.target

    setOptions((prev) => {
      const updated = { ...prev, [name]: checked };

      return Object.values(updated).every((val) => (val === false)) ? prev : updated;
    })
  }

  // Handle length input
  const handleLength = (e) => {
    let {value} = e.target
    setLen((value < 8) ? 8 : (value > 32) ? 32 : value)
  }

  // Generate password depending on options and length
  const handleGenerate = (length) => {
    setPassword(
      randomPass(
        options.uppercase,
        options.lowercase,
        options.numbers,
        options.characters,
        length || len
      ))
  }

  return (
    <>
      <div className='main-container'>
        <div className="container">
          <h1>Random Password Generator</h1>
          <div className='password-container'>
            <input type="text" className='password' name="password" id="password" value={password} disabled />
            <button type='button' className='copy-btn' onClick={() => navigator.clipboard.writeText(password)}>
              <i className="fa-regular fa-copy"></i>
            </button>
            <button type='button' className='generate-btn' onClick={() => handleGenerate()}>
              <i className="fa-solid fa-arrows-rotate"></i>
            </button>
          </div>
          <div className='password-length-container'>
            <div className='password-length'>
              <input type="number" className='length-input' value={len} onChange={handleLength} />
            </div>
            <div className="slider-container" >
              <input
                type='range'
                min='8' max='32' value={`${len}`}
                onInput={handleLength}
                className="slider"
              />
            </div>
          </div>
          <div className='options-container'>
            <div className='option'>
              <input type="checkbox" name="uppercase" id="uppercase" checked={options.uppercase} onChange={handleSelect} />
              <label htmlFor="uppercase">Uppercase</label>
            </div>
            <div className='option'>
              <input type="checkbox" name="lowercase" id="lowercase" checked={options.lowercase} onChange={handleSelect} />
              <label htmlFor="lowercase">Lowercase</label>
            </div>
            <div className='option'>
              <input type="checkbox" name="numbers" id="numbers" checked={options.numbers} onChange={handleSelect} />
              <label htmlFor="numbers">Numbers</label>
            </div>
            <div className='option'>
              <input type="checkbox" name="characters" id="characters" checked={options.characters} onChange={handleSelect} />
              <label htmlFor="characters">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
