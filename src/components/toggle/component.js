import React from 'react'
import "./styles.css"

function Toggle({handleToggle}) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (e) => {
        setChecked(e.target.checked);
        handleToggle(e.target.checked)
    }
  return (
    <div>
        <label className="switch">
        <input type="checkbox" checked={checked}  onChange={handleChange}/>
        <span className="slider round"></span>
        </label>
    </div>
  )
}

export default Toggle