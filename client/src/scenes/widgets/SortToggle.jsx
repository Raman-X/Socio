// components/widgets/SortToggle.jsx
import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";

const SortToggle = ({ sortOrder, setSortOrder }) => {
  return (
    <Box sx={{ display: "flex", my: 2 }}>
      <ToggleButtonGroup
        value={sortOrder}
        exclusive
        onChange={(e, newOrder) => {
          if (newOrder !== null) setSortOrder(newOrder);
        }}
        size="small"
        color="primary"
      >
        <ToggleButton value="latest">Latest First</ToggleButton>
        <ToggleButton value="oldest">Oldest First</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default SortToggle;
