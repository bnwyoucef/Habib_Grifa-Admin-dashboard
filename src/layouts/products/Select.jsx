import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { useSelector, useDispatch } from "react-redux";
import { selectAllCategories, fetchCategories } from "../../features/category/categorySlice";

export default function BasicSelect({ updateCategory, setUpdateCategory, setNewCategId }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const categStatus = useSelector((state) => state.category.status);

  React.useEffect(() => {
    if (categStatus === "idle") dispatch(fetchCategories());
  }, [dispatch, categStatus]);

  const handleChange = (event) => {
    setUpdateCategory(event.target.value);
    setNewCategId(categories.filter((cat) => cat.categoryName === event.target.value)[0].id);
  };

  return (
    <Box sx={{ minWidth: 300 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Catégorie</InputLabel>
        <Select
          style={{ height: "45px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={updateCategory}
          label="Catégorie"
          required
          onChange={handleChange}
        >
          {categories?.map((categ) => (
            <MenuItem value={categ?.categoryName}>{categ.categoryName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
