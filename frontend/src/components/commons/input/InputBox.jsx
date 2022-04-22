import './InputBox.css'

function InputBox(props) {
    const {
        name,
        type,
        id,
        values,
        onchange,
        onblurr,
        errors,
    } = props

    return (
        <>
            {id === 'gender' ?
                <div className='profile-input d-flex flex-column me-5'>
                    <label htmlFor={id} className='mb-3'>{name}</label>
                    <div className='d-flex gender-input '>
                        <div className={values === 'female' ? 'active' : null} onClick={() => onchange("female")}>Female</div>
                        <div className={values === 'male' ? 'active' : null} onClick={() => onchange("male")}>Male</div>
                    </div>
                </div>
                : id === "stateAddress" ?
                    <div className="profile-input d-flex flex-column me-5">
                        <label htmlFor={id} className='mb-3'>{name}</label>
                        <select id={id} className="form-select state-list" aria-label="Default select example" onChange={onchange}
                            onBlur={onblurr} value={values}>
                            <option value="" key="E">Select State</option>
                            <option value="Delhi" key="D">Delhi</option>
                            <option value="Punjab" key="P">Punjab</option>
                            <option value="UP" key="U">UP</option>
                        </select>
                    </div>
                    :
                    <div className='profile-input d-flex flex-column me-5'>
                        <label htmlFor={id} className='mb-3'>{name}</label>
                        <input
                            type={type}
                            id={id}
                            placeholder={name}
                            // style={{ color: type === "date" ? '#e5e5e5' : null }}
                            min={type === "date" ? "1997-01-01" : null}
                            max={type === "date" ? "2030-12-31" : null}
                            value={values}
                            onChange={onchange}
                            onBlur={onblurr}
                            onKeyDown={type === 'date' ? (e) => e.preventDefault() : null} />
                        {
                            errors!==''?<div style={{ color: 'red' }}>{errors}</div> : null
                        }
                    </div>
            }
        </>
    )
}

export default InputBox