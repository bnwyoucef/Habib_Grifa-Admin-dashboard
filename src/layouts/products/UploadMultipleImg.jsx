import React from "react";

export default function MultipleImageUploadComponent( { setProductImages } ) {
  const fileObj = [];
  const fileArray = [];
  const [file, setFile] = React.useState(null);


  function uploadMultipleFiles(e) {
    fileObj.push(e.target.files);
    setProductImages(e.target.files); 
    for (let i = 0; i < fileObj[0].length; i+=1) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]))
    }
    setFile(fileArray);
  }

return (
    <form>
        <div className="form-group multi-preview" style={{paddingTop:'10px'}}>
            {(file || ["1","2"]).map((url) => (
                <img src={url} alt="..." style={{width:"auto",height:"100px"}}/>
            ))}
        </div>
        <div className="form-group">
            <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple required />
        </div>
    </form >
    )
}