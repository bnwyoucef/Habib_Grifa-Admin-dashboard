import React from "react";

export default function MultipleImageUploadComponent( { productImages, setProductImages } ) {
  const fileObj = [];
  const fileArray = [];
  const [file, setFile] = React.useState(null);


  function uploadMultipleFiles(e) {
    fileObj.push(e.target.files);
    console.log(e.target.files[0]);
    setProductImages(e.target.files); 
    console.log('files ',e.target.files);
    for (let i = 0; i < fileObj[0].length; i+=1) {
        fileArray.push(URL.createObjectURL(fileObj[0][i]))
    }
    setFile(fileArray);
  }

    function uploadFiles(e) {
        e.preventDefault()
        console.log(file)

    }

return (
    <form>
        <div className="form-group multi-preview" style={{paddingTop:'10px'}}>
            {(file || ["1","2"]).map((url) => (
                <img src={url} alt="..." style={{width:"auto",height:"100px"}}/>
            ))}
        </div>
        <div className="form-group">
            <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple />
        </div>
            <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button>
    </form >
    )
}