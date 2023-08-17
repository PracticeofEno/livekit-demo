import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import '../app/globals.css';
import { useState } from "react";

export default function DropDownList({arr, label}) {
  let [value, setValue] = useState()
  function tmp(e) {
    console.log(e.target);
    setValue(e.target.value)
  }

  return (
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={""}
            label="Age"
            onChange={tmp}
        >
        {
          arr?.map((device: any) => (
            <MenuItem key={device.label} value={device.label}>{device.label}</MenuItem>
          ))
        }
        </Select>
    </FormControl>
  )
}