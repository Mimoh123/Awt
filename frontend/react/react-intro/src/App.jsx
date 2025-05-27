// import { useState } from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { useEffect } from 'react';
import Greet from './components/Quote';
// import './App.css';

function App() {
  // const [count, setCount] = useState(0);
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  useEffect(() => {
    console.log('this is the name', name);
  }, [name]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1>Hello</h1>

      <input
        style={{
          width: '20%',
          marginBottom: '10px',
        }}
        type='text'
        placeholder='Enter Author'
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
        defaultValue={name}
      />
      <input
        style={{
          width: '20%',
        }}
        type='text'
        placeholder='Enter Text'
        onBlur={(e) => {
          setText(e.target.value);
        }}
        defaultValue={text}
      />

      {text && author && <Greet text={text} author={author} />}
    </div>
  );
}

export default App;
