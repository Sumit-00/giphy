import React from 'react';
import './App.css';
import GifList from './components/gif-list/component';

function App() {
  const [isDarkThemeActive, setIsDarkThemeActive] = React.useState(false);
  return (
    <div className="App" style={isDarkThemeActive ? {backgroundColor: "#1f2023", color: "#efefef"} : {} }>
        <GifList setIsDarkThemeActive={setIsDarkThemeActive} />
    </div>
  );
}

export default App;
