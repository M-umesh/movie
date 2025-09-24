import React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { styled } from "@mui/material/styles";

const CustomPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root": {
    color: "white !important", // numbers always white
    border: "1px solid white !important", // border always white
    backgroundColor: "transparent !important",
    transition: "none !important", // kill flicker
    animation: "none !important",
  },
  "& .MuiPaginationItem-root.Mui-selected": {
    backgroundColor: "yellow !important", // active page bg
    color: "black !important", // number stays white
    border: "1px solid purple !important",
  },
  // completely disable hover
  "& .MuiPaginationItem-root:hover": {
    backgroundColor: "yellow !important",
    color: "black !important",
    border: "1px solid white !important",
  },
  "& .MuiPaginationItem-icon": {
    color: "white !important", // arrows always white
  },
  "& .MuiPaginationItem-root:focus": {
    outline: "none !important", // kill focus outline
  },
}));

function MoviePagination({ totalPages, page, onChange }) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      <CustomPagination
        count={totalPages}
        page={page}
        onChange={onChange}
        size="large"
        siblingCount={1}
        boundaryCount={1}
        renderItem={(item) => (
          <PaginationItem {...item} disableRipple disableFocusRipple />
        )}
      />
    </div>
  );
}

export default MoviePagination;
