import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { CatalogQuery } from "@/lib/fetchAnimeCatalog";

type ViewMode = "grid" | "list";

type Props = {
  query: CatalogQuery;
  viewMode: ViewMode;
  onParamChange: (key: string, value: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
};

export function HomeFiltersBar({
  query,
  viewMode,
  onParamChange,
  onViewModeChange,
}: Props) {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      alignItems="center"
      gap={2}
      useFlexGap
    >
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="year-label">Ano mín.</InputLabel>
        <Select
          labelId="year-label"
          label="Ano mín."
          value={query.year}
          onChange={(e) => onParamChange("year", e.target.value)}
        >
          <MenuItem value="">Qualquer</MenuItem>
          <MenuItem value="2020">2020+</MenuItem>
          <MenuItem value="2015">2015+</MenuItem>
          <MenuItem value="2010">2010+</MenuItem>
          <MenuItem value="2005">2005+</MenuItem>
          <MenuItem value="2000">2000+</MenuItem>
          <MenuItem value="1990">1990+</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="type-label">Tipo</InputLabel>
        <Select
          labelId="type-label"
          label="Tipo"
          value={query.type}
          onChange={(e) => onParamChange("type", e.target.value)}
        >
          <MenuItem value="">Qualquer</MenuItem>
          <MenuItem value="tv">TV</MenuItem>
          <MenuItem value="movie">Filme</MenuItem>
          <MenuItem value="ova">OVA</MenuItem>
          <MenuItem value="special">Especial</MenuItem>
          <MenuItem value="ona">ONA</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          label="Status"
          value={query.status}
          onChange={(e) => onParamChange("status", e.target.value)}
        >
          <MenuItem value="">Qualquer</MenuItem>
          <MenuItem value="airing">Em exibição</MenuItem>
          <MenuItem value="complete">Completo</MenuItem>
          <MenuItem value="upcoming">Em breve</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="order-label">Ordenar por</InputLabel>
        <Select
          labelId="order-label"
          label="Ordenar por"
          value={query.order_by}
          onChange={(e) => onParamChange("order_by", e.target.value)}
        >
          <MenuItem value="">(padrão)</MenuItem>
          <MenuItem value="popularity">Popularidade</MenuItem>
          <MenuItem value="score">Nota</MenuItem>
          <MenuItem value="title">Título</MenuItem>
          <MenuItem value="start_date">Data de estreia</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 100 }}>
        <InputLabel id="sort-label">Ordem</InputLabel>
        <Select
          labelId="sort-label"
          label="Ordem"
          value={query.sort}
          onChange={(e) => onParamChange("sort", e.target.value)}
        >
          <MenuItem value="desc">Desc</MenuItem>
          <MenuItem value="asc">Asc</MenuItem>
        </Select>
      </FormControl>

      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, next: ViewMode | null) => {
          if (next) onViewModeChange(next);
        }}
        size="small"
        aria-label="Modo de exibição"
      >
        <ToggleButton value="grid" aria-label="Grade">
          <ViewModuleIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="list" aria-label="Lista">
          <ViewListIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
