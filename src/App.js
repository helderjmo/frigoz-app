import logo from './image.png';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [hideLogo, setHideLogo] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const goToIngSelection = () => {
    setHideLogo(true)
  }

  const [rows, setRows] = useState([{ name: '', amount: '' }]);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', amount: '' }]);
  };

  const search = (e) => {
    e.preventDefault();
    var postData ={"ingredients":rows} 
    setShowResults(true)
      try {
      const response = fetch('http://localhost:7071/api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        console.log('Network response was not ok');
      }

      const responseData = response.json();
      console.log(responseData)
    } catch (error) {
      console.error('Error creating post:', error);
    }
  }

  return (
    <div className="App">
      {
        !hideLogo &&      
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />        
        <a
          className="App-link"       
          rel="noopener noreferrer"
          onClick={goToIngSelection}
        >
          Start Cooking ! 
        </a>
      </header>
      }
      {
        hideLogo &&
        <div className="main">
          <div className="container">
            <div className='top-banner'>
              <div className="logo">
                <img src={logo} style={{width:'100px'}} alt="logo" />                        
              </div>

            </div>
          </div>
          <div>

          {rows.map((row, index) => (
          <div key={index} className="input-row">
            <input
              type="text"
              name="name"
              value={row.name}
              onChange={(event) => handleChange(index, event)}
              placeholder="Enter ingredient"
            />
            <input
              type="number"
              name="amount"
              value={row.amount}
              onChange={(event) => handleChange(index, event)}
              placeholder="Enter quantity"
            />
          </div>
        ))}
        <button onClick={handleAddRow}>Add Row</button>
        
        <button onClick={search}>I'm hungry, give me some recipes</button>

          </div>
          

          {
  showResults && <div className="beautify-container">
  <p>This is some beautifully styled text!</p>
  <p>You can add more paragraphs, headers, or any other text content here.</p>
</div>
}
        </div>
      }

    </div>
  );
}

export default App;
