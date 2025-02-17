'use client'

import { useState } from "react";
import { TextField, MenuItem, Checkbox, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ activity: "", price: "", type: "" });
  const [priceError, setPriceError] = useState(false);

  const activity = [
    { value: "education", label: "Education" },
    { value: "recreational", label: "Recreational" },
    { value: "social", label: "Social" },
    { value: "diy", label: "Diy" },
    { value: "charity", label: "Charity" },
    { value: "cooking", label: "Cooking" },
    { value: "relaxation", label: "Relaxation" },
    { value: "music", label: "Music" },
    { value: "busywork", label: "Busywork" },
  ];

  const handlePrice = (e) => {
    const value = e.target.value;
    if (!/^[0-9]+$/.test(value)) {
      setPriceError(true);
    } else {
      setPriceError(false);
      setForm({ ...form, price: value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!priceError && form.price !== "") {
      setTasks([...tasks, form]);
      setForm({ activity: "", price: "", type: "" });
    }
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <main>
      <h1>To-Do List</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Activity"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.activity}
          onChange={(e) => setForm({ ...form, activity: e.target.value })}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          margin="normal"
          value={form.price}
          onChange={handlePrice}
          error={priceError}
          helperText={priceError ? "Only numbers are allowed" : ""}
        />
        <TextField
          id="outlined-select-activity"
          select
          label="Select"
          defaultValue=""
          helperText="Select activity type"
          fullWidth
          margin="normal"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          {activity.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Checkbox required /> Booking required
        <br />
        <Button type="submit" variant="contained" color="primary" disabled={priceError}>
          Submit
        </Button>
      </form>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Activity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.activity}</TableCell>
                <TableCell>{task.price}</TableCell>
                <TableCell>{task.type}</TableCell>
                <TableCell>
                  <IconButton aria-label="delete" size="small" onClick={() => handleDelete(index)}>
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </main>
  );
}
