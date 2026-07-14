import { useEffect, useMemo, useState } from 'react';
import { SAMPLE_EXTRACTION, SAMPLE_URL, SEED_RECIPES, getCurrentSeason, guessDishType } from './lib/data';
import { loadRecipes, saveRecipes } from './lib/storage';
import { extractRecipe } from './lib/api';
import Header from './components/Header';
import HomeView from './components/HomeView';
import LibraryView from './components/LibraryView';
import DetailView from './components/DetailView';
import SaveRecipeModal from './components/SaveRecipeModal';

let nextId = 1000;

export default function App() {
  const [recipes, setRecipes] = useState(() => loadRecipes(SEED_RECIPES));
  const [view, setView] = useState('home');
  const [query, setQuery] = useState('');
  const [dishFilter, setDishFilter] = useState('All');
  const [selectedId, setSelectedId] = useState(null);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveStage, setSaveStage] = useState('input');
  const [urlInput, setUrlInput] = useState('');
  const [extractedData, setExtractedData] = useState(null);
  const [justAddedId, setJustAddedId] = useState(null);

  useEffect(() => {
    saveRecipes(recipes);
  }, [recipes]);

  const currentSeason = useMemo(() => getCurrentSeason(), []);

  const goHome = () => setView('home');
  const goLibrary = () => setView('library');
  const openRecipe = (id) => {
    setSelectedId(id);
    setView('detail');
  };

  const onHomeQueryChange = (value) => {
    setQuery(value);
    if (value.trim()) setView('library');
  };

  const openSaveModal = () => {
    setSaveModalOpen(true);
    setSaveStage('input');
    setUrlInput('');
    setExtractedData(null);
  };
  const closeSaveModal = () => setSaveModalOpen(false);
  const fillSampleUrl = () => setUrlInput(SAMPLE_URL);

  const submitUrl = async () => {
    const rawUrl = urlInput.trim();
    if (!rawUrl) return;
    setSaveStage('loading');

    let extracted = null;
    try {
      extracted = await extractRecipe(rawUrl);
    } catch {
      extracted = null;
    }

    if (!extracted) {
      extracted = { ...SAMPLE_EXTRACTION, url: rawUrl, tags: [guessDishType(null, SAMPLE_EXTRACTION.title)] };
    }
    extracted = { ...extracted, seasons: extracted.seasons?.length ? extracted.seasons : [currentSeason] };

    setExtractedData(extracted);
    setSaveStage('preview');
  };

  const confirmSave = () => {
    if (!extractedData) return;
    const id = nextId++;
    const newRecipe = {
      id,
      title: extractedData.title,
      tags: extractedData.tags || [],
      seasons: extractedData.seasons || [currentSeason],
      sourceSite: extractedData.sourceSite,
      url: extractedData.url,
      ingredients: extractedData.ingredients,
      imageUrl: extractedData.imageUrl || null,
      rating: 0,
      notes: '',
    };
    setRecipes((prev) => [newRecipe, ...prev]);
    setSaveModalOpen(false);
    setView('library');
    setJustAddedId(id);
    setTimeout(() => setJustAddedId(null), 2500);
  };

  const setRating = (id, val) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, rating: val } : r)));
  };

  const setNotes = (id, val) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, notes: val } : r)));
  };

  const setTitle = (id, val) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, title: val } : r)));
  };

  const setIngredients = (id, val) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ingredients: val } : r)));
  };

  const toggleCategory = (id, category) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const has = (r.tags || []).includes(category);
        return { ...r, tags: has ? r.tags.filter((t) => t !== category) : [...(r.tags || []), category] };
      })
    );
  };

  const q = query.trim().toLowerCase();
  const matchesQuery = (r) => !q || r.title.toLowerCase().includes(q) || r.ingredients.some((i) => i.toLowerCase().includes(q));

  const seasonalRecipes = recipes.filter((r) => r.seasons.includes(currentSeason));
  const recentRecipes = recipes.slice(0, 3);
  const filteredRecipes = recipes.filter((r) => matchesQuery(r) && (dishFilter === 'All' || (r.tags || []).includes(dishFilter)));
  const selectedRecipe = recipes.find((r) => r.id === selectedId) || null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Work Sans', sans-serif", color: 'var(--ink)', background: 'var(--paper)' }}>
      <Header onLogoClick={goHome} onAddRecipe={openSaveModal} />

      {view === 'home' && (
        <HomeView
          query={query}
          onQueryChange={onHomeQueryChange}
          currentSeason={currentSeason}
          seasonalRecipes={seasonalRecipes}
          recentRecipes={recentRecipes}
          totalCount={recipes.length}
          onOpenRecipe={openRecipe}
          onRate={setRating}
          onGoLibrary={goLibrary}
        />
      )}

      {view === 'library' && (
        <LibraryView
          query={query}
          onQueryChange={setQuery}
          dishFilter={dishFilter}
          onDishFilterChange={setDishFilter}
          recipes={filteredRecipes}
          justAddedId={justAddedId}
          onOpenRecipe={openRecipe}
          onRate={setRating}
        />
      )}

      {view === 'detail' && selectedRecipe && (
        <DetailView
          recipe={selectedRecipe}
          onBack={goLibrary}
          onRate={setRating}
          onNotesChange={setNotes}
          onToggleCategory={toggleCategory}
          onTitleChange={setTitle}
          onIngredientsChange={setIngredients}
        />
      )}

      <SaveRecipeModal
        open={saveModalOpen}
        stage={saveStage}
        urlInput={urlInput}
        extracted={extractedData}
        onUrlChange={setUrlInput}
        onFillSample={fillSampleUrl}
        onSubmit={submitUrl}
        onClose={closeSaveModal}
        onConfirm={confirmSave}
      />
    </div>
  );
}
