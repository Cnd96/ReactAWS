import React from 'react';

const DataInputComponent =props=> {
    const handleChange=(e)=> {
        const files = e.target.files;
        if(files && files[0]) props.handleFile(files);
      
    };
  
    return (
        <form className="form-inline">
            <div className="form-group">
                <label  >  
                   {props.buttonName}
                    <i className="fas fa-lg fa-upload" style={{marginLeft:props.marginLeft}}></i>
                <input type="file" style={{display:'none'}} id="file" accept={SheetJSFT} onChange={handleChange} multiple />
                </label>
            </div>
         </form>
    )
}
/* list of supported file types */
const SheetJSFT = [
"xlsx", "xlsb", "xlsm", "xls"].map(function(x) { return "." + x; }).join(",");
export default DataInputComponent;