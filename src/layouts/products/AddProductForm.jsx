import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../../Api/axios";
import Select from "./Select";
import UploadImages from "./UploadMultipleImg";

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [productName,setProductName] = useState('');
  const [productPrice,setProductPrice] = useState('');
  const [productSizes,setProductSizes] = useState('');
  const [productDescription,setProductDescription] = useState('');
  const [productCategoryId,setProductCategroyId] = useState('');
  const [productCategoryName,setProductCategroyName] = useState('');
  const [productImages,setProductImages] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function addNewProduct(event) {
    event.preventDefault();
    const imgs = [];
    const formData = new FormData();

    console.log('all images:',productImages);

    for(let i = 0;i < productImages.length;i+=1) {
      imgs.push(productImages[i]);
    }
    
    imgs.forEach(image=>{
      const x = formData.append("images", image);
      console.log('xxx',x,formData);
    });
  
    formData.append("name",productName);
    formData.append("price",productPrice);
    formData.append("description",productDescription);
    formData.append("sizes",productSizes);
    formData.append("categoryId",productCategoryId);


    // const newProduct = {name:productName,price:productPrice,description:productDescription,sizes:productSizes,
    // categoryId:productCategoryId,images:formData1}
    // console.log(newProduct);

    try {
      const response = await axios.post("product/create",formData,{
        headers: { 'Content-Type': 'multipart/form-data'}});
        console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <Button variant="contained" style={{ color: "white" }} onClick={handleClickOpen}>
        Ajouter un produit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un produit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom du produit"
            type="email"
            fullWidth
            variant="outlined"
            value={productName}
            onChange={(event) => setProductName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Prix"
            type="email"
            fullWidth
            variant="outlined"
            value={productPrice}
            onChange={(event) => setProductPrice(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Tailles"
            type="email"
            fullWidth
            variant="outlined"
            value={productSizes}
            onChange={(event) => setProductSizes(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="email"
            fullWidth
            variant="outlined"
            value={productDescription}
            onChange={(event) => setProductDescription(event.target.value)}
          />
          <Select updateCategory={productCategoryName} setUpdateCategory={setProductCategroyName} setNewCategId={setProductCategroyId}/>
          <UploadImages productImages={productImages} setProductImages={setProductImages} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={(event) => addNewProduct(event)}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
