import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import toast, { Toaster } from "react-hot-toast";
import Select from "./Select";
import UploadImages from "./UploadMultipleImg";
import { createProduct } from "../../features/product/productSlice";

export default function FormDialog() {
  const dispatch = useDispatch();
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
    });
  
    formData.append("name",productName);
    formData.append("price",productPrice);
    formData.append("description",productDescription);
    formData.append("sizes",productSizes);
    formData.append("categoryId",productCategoryId);
    dispatch(createProduct(formData)).then( () => toast.success("produit ajouteé avec succès"))
    .catch((err) => toast.error(err.message))
    handleClose();
  }

  return (
    <div>
      <Toaster />
      <Button variant="contained" style={{ color: "white" }} onClick={handleClickOpen}>
        Ajouter un produit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un produit</DialogTitle>
        <DialogContent>
          <form onSubmit={(event) => addNewProduct(event)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nom du produit"
              type="text"
              fullWidth
              required
              variant="outlined"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="Prix"
              type="text"
              fullWidth
              required
              variant="outlined"
              value={productPrice}
              onChange={(event) => setProductPrice(event.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="Tailles"
              type="text"
              fullWidth
              required
              variant="outlined"
              value={productSizes}
              onChange={(event) => setProductSizes(event.target.value)}
            />
            <TextField
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              required
              variant="outlined"
              value={productDescription}
              onChange={(event) => setProductDescription(event.target.value)}
            />
            <Select updateCategory={productCategoryName} setUpdateCategory={setProductCategroyName} setNewCategId={setProductCategroyId}/>
            <UploadImages productImages={productImages} setProductImages={setProductImages} />
            <DialogActions>
              <input type="button" onClick={handleClose} value="Annuler"/>
              <input type="submit" value="Ajouter" />
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
