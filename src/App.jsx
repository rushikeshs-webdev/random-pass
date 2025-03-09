import { useState } from 'react'
import './App.css'

function randomPass(uppercase, lowercase, numbers, characters, length) {
  let charset = ''
  let password = ''

  if (uppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    password += charset[Math.floor(Math.random() * 26)]
  }
  if (lowercase) {
    charset += 'abcdefghijklmnopqrstuvwxyz'
    password += charset[Math.floor(Math.random() * 26)]
  }
  if (numbers) {
    charset += '0123456789'
    password += charset[Math.floor(Math.random() * 10)]
  }
  if (characters) {
    charset += '!@#$%^&*()_+=-[]{};:?><,.|'
    password += charset[Math.floor(Math.random() * 26)]
  }

  for (let i = password.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length))
  }

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
  const [options, setOptions] = useState({
    Uppercase: true,
    lowercase: true,
    Numbers: true,
    Characters: true
  })
  const [password, setPassword] = useState(
    randomPass(
      options.Uppercase,
      options.lowercase,
      options.Numbers,
      options.Characters,
      (length > 12 && length) || 12
    ))


  const handleSelect = (e) => {
    let { name, checked } = e.target

    setOptions((prev) => {
      const updated = { ...prev, [name]: checked };

      return Object.values(updated).every((val) => (val === false)) ? prev : updated;
    })
  }

  const handleGenerate = () => {
    let length = 10;
    let genratedPassword = randomPass(
      options.Uppercase,
      options.lowercase,
      options.Numbers,
      options.Characters,
      (length > 12 && length) || 12
    )
    setPassword(genratedPassword)
    console.log('generated Pass: ' + genratedPassword)
  }

  return (
    <>
      <div className='main-container'>
        <div className="container">
          <h1>Random Password Generator</h1>
          <div className='password-container'>
            <input type="text" className='password' name="password" id="password" value={password} disabled />
          </div>
          <div className='options-container'>
            <div className='option'>
              <input type="checkbox" name="Uppercase" id="Uppercase" checked={options.Uppercase} onChange={handleSelect} />
              <label htmlFor="Uppercase">Uppercase</label>
            </div>
            <div className='option'>
              <input type="checkbox" name="lowercase" id="lowercase" checked={options.lowercase} onChange={handleSelect} />
              <label htmlFor="lowercase">lowercase</label>
            </div>
            <div className='option'>
              <input type="checkbox" name="Numbers" id="Numbers" checked={options.Numbers} onChange={handleSelect} />
              <label htmlFor="Numbers">Numbers</label>
            </div>
            <div className='option'>
              <input type="checkbox" name="Characters" id="Characters" checked={options.Characters} onChange={handleSelect} />
              <label htmlFor="Characters">Characters</label>
            </div>
          </div>
          <div className='generate-container'>
            <button type='button' className='generate-btn' onClick={(e) => handleGenerate(e)}>Generate</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
