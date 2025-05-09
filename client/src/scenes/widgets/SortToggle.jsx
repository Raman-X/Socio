// components/widgets/SortToggle.jsx
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SortToggle = ({ sortOrder, setSortOrder }) => {
  return (
    <Box sx={{ display: "flex", my: 2, minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="sort-order-label">Sort By</InputLabel>
        <Select
          labelId="sort-order-label"
          value={sortOrder}
          label="Sort By"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="latest">Latest First</MenuItem>
          <MenuItem value="oldest">Oldest First</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortToggle;
