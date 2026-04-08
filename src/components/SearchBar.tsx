import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (location.pathname === "/") {
      setValue(searchParams.get("q") ?? "");
    } else {
      setValue("");
    }
  }, [location.pathname, searchParams]);

  const applySearch = () => {
    const trimmed = value.trim();
    if (location.pathname !== "/") {
      const next = new URLSearchParams();
      if (trimmed) next.set("q", trimmed);
      next.set("page", "1");
      navigate(`/?${next.toString()}`);
      return;
    }
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (trimmed) next.set("q", trimmed);
      else next.delete("q");
      next.set("page", "1");
      return next;
    });
  };

  return (
    <TextField
      size="small"
      placeholder="Buscar anime…"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") applySearch();
      }}
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: 160 },
        maxWidth: { sm: 420 },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="button"
                edge="end"
                aria-label="Buscar"
                onClick={applySearch}
                size="small"
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
