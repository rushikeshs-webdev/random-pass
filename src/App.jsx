import { useState } from 'react'
import './App.css'

function randomPass(uppercase, lowercase, numbers, characters, length) {
  let charset = "";
  let password = "";

  if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
  if (numbers) charset += "0123456789";
  if (characters) charset += "!@#$%^&*()_+|}{[]\:;?><,./-=";

  if (!charset) {
    return "Please select at least one character type.";
  }

  if (length < 1) {
    return "Password length must be greater than 0.";
  }

  // Ensure at least one character from each selected type
  let guaranteedChars = "";
  if (uppercase) guaranteedChars += charset[Math.floor(Math.random() * 26)];
  if (lowercase) guaranteedChars += charset[26 + Math.floor(Math.random() * 26)]; // Assuming lowercase chars are after uppercase
  if (numbers) guaranteedChars += charset[52 + Math.floor(Math.random() * 10)]; // Assuming numbers are after lowercase
  if (characters) guaranteedChars += charset[62 + Math.floor(Math.random() * (charset.length - 62))]; //Assuming special chars are after numbers

  password += guaranteedChars;

  // Fill the rest of the password
  for (let i = password.length; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Shuffle the password to mix the guaranteed characters
  password = password
    .split("")
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join("");

  return password;  
}

function App() {
  const [password, setPassword] = useState('')
  const [options, setOptions] = useState({
    Uppercase: true,
    lowercase: true,
    Numbers: true,
    Characters: true
  })

  const handleSelect = (e) => {
    let { name, checked } = e.target

    setOptions((prevCheckboxes) => {
      const updatedCheckboxes = { ...prevCheckboxes, [name]: checked };

      // Ensure at least one checkbox is always checked
      const checkedCount = Object.values(updatedCheckboxes).filter(Boolean).length;

      if (checkedCount === 0) {
        // If all are unchecked, revert the current change.
        return prevCheckboxes; //Revert to previous state.
      }
      return updatedCheckboxes;
    })
  }

  const handleGenerate = () => {
    let length = 10;
    let genratedPassword = randomPass(options.Uppercase, options.lowercase, options.Numbers, options.Characters, (length > 12 && length) || 12)
    setPassword(genratedPassword)
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
