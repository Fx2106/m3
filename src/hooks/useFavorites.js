import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "pokedex-favorites";

function readFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed)
      ? parsed.filter((id) => Number.isInteger(id) && id > 0)
      : [];
  } catch {
    return [];
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // La app sigue funcionando aunque el navegador bloquee localStorage.
    }
  }, [favorites]);

  const toggleFavorite = useCallback((pokemonId) => {
    setFavorites((current) =>
      current.includes(pokemonId)
        ? current.filter((id) => id !== pokemonId)
        : [...current, pokemonId]
    );
  }, []);

  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);

  const isFavorite = useCallback(
    (pokemonId) => favoriteIds.has(pokemonId),
    [favoriteIds]
  );

  return { favorites, toggleFavorite, isFavorite };
}
