import React from 'react';

function Input({ placeholder, value, onChange, type, name, label, required }) {
    return (
        <div className="control-group">
            <div className="form-group floating-label-form-group controls">
                <label>{label}}</label>
                <input type={type} className="form-control" placeholder={placeholder} name={name} onChange={onChange} value={value} required={required} />
                <p className="help-block text-danger"></p>
            </div>
        </div>
    );
}

export default Input;