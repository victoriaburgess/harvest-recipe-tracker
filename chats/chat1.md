# Seasonal Recipe Tracker

_Started 2026-07-14 06:10 UTC_

---

## User

Build me the recipe tracker app discussed in the PRD Turn the following idea into a one-page PRD.
# Product Requirements Document: Seasonal Recipe Tracker

## Product Overview

A recipe-tracking app that helps home cooks save recipes from across the web, organize them automatically, and rediscover relevant dishes when ingredients are in season.

Users submit a recipe URL, and the app extracts key recipe information, applies tags based on ingredients, season, and dish type, and stores the recipe in a searchable personal library. Users can rate recipes they have tried and receive recommendations for previously saved recipes that match the current season.

## 1. Problem

People frequently discover recipes through websites, social media, newsletters, and search engines, but lack a simple way to organize and revisit them.

Bookmarks and browser tabs provide limited categorization, making it difficult to:

* Find a saved recipe based on ingredients already available at home.
* Remember which recipes were worth making again.
* Identify recipes appropriate for a particular season.
* Rediscover saved recipes at the time they are most relevant.

As a result, users repeatedly search for new recipes rather than using the recipes they have already saved.

## 2. Target Persona

**Primary persona: The Organized Home Cook**

A person who cooks at home several times per week and regularly discovers recipes online.

They:

* Save recipes from multiple websites and platforms.
* Want meal inspiration without starting a new internet search.
* Prefer cooking with seasonal ingredients.
* Need a faster way to search their saved recipe collection.
* Want to remember which recipes they enjoyed and would make again.

## 3. Success Metrics

### Adoption

* Percentage of new users who save at least three recipes during their first week.
* Average number of recipes saved per active user.
* Percentage of submitted recipe URLs successfully imported and tagged.

### Engagement

* Weekly active users.
* Number of recipe searches performed per active user.
* Percentage of users who open a resurfaced seasonal recommendation.
* Percentage of saved recipes that are revisited within 90 days.

### Retention and Value

* Four-week user retention rate.
* Percentage of active users who rate at least one recipe.
* Percentage of users who return to a previously saved recipe rather than adding a new one.
* User-reported satisfaction with recipe search and recommendations.

## 4. Happy Path

1. The user creates an account or signs in.
2. The user copies a recipe URL from a supported website.
3. The user pastes the URL into the app and selects **Save Recipe**.
4. The app retrieves available recipe details, including:

   * Recipe title
   * Image
   * Ingredient list
   * Source website
   * Recipe URL
   * Dish or meal type
5. The app automatically assigns tags based on:

   * Primary ingredients
   * Relevant season or seasons
   * Dish type, such as soup, salad, dessert, or main course
6. The recipe is added to the user’s personal recipe library.
7. The user searches or filters the library by ingredient, season, dish type, or rating.
8. After preparing the dish, the user gives it a rating.
9. When the recipe becomes seasonally relevant, the app resurfaces it as a recommendation.
10. The user opens the saved recipe and follows the original source link to prepare it again.

## 5. Out of Scope

The initial release will not include:

* Creating or publishing original recipes directly within the app.
* Full meal planning or weekly calendar functionality.
* Automated grocery-list generation.
* Grocery delivery or retailer integrations.
* Nutrition calculations or dietary-health recommendations.
* Social feeds, public profiles, or recipe sharing between users.
* Modifying the instructions or ingredients from the original recipe source.
* Importing recipes from photographs, screenshots, printed cookbooks, or handwritten notes.
* Guaranteed recipe extraction from every website or social media platform.
* AI-generated recipes based on available ingredients.

## Assistant

_[tool: questions_v2]_

## User

Questions answered:
- screens: All of the above
- vibe: Warm & rustic (earthy tones, editorial)
- colors: Warm neutrals + one seasonal accent (terracotta/olive)
- type: Classic serif headlines + clean sans body
- platform: Responsive web app (desktop)
- fidelity: Clickable prototype with real state (paste URL → see extracted recipe → save → appears in library)
- data: Keep it minimal, just 1-2 examples
- variations: 2-3 directions to compare

## Assistant

_[tool: dc_write]_

_[tool: ready_for_verification]_

Interactive prototype is live: home (seasonal recs + search), library (search/filters), recipe detail (rating + source link), and paste-URL save flow (loading → extracted preview → confirm → appears in library).

## User

Add tweakable controls to Seasonal Recipe Tracker.dc.html (declare with dc_set_props, read via this.props): remove the buttons that allow you to filter by season

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_set_props]_

_[tool: read_file]_

Now wiring the props into logic and template.

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now update the template to use these props/values.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Removed the season filter chips from the library and wired the accent color, current-season, and "show seasonal section" tweaks throughout the app.

_[tool: ready_for_verification]_

Done.

## User

In each individual recipe's page, add a box where the user can add their own notes about the recipe.

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Added a "My Notes" textarea on each recipe detail page, saved per recipe in state.

## User

when this gets deployed, i'd like for the recipe photo to pull it's image directly from the recipe URL. is this possible?

## Assistant

In a real deployment, yes — a backend recipe-extraction step (fetching the page's Open Graph image, e.g. `og:image`, or parsing embedded Recipe schema/JSON-LD) can pull the real photo, and you'd store that image URL with the saved recipe. This prototype uses placeholder art since it can't fetch live external pages; happy to wire in a real fetch step if you're hooking this up to a backend.

## User

yes, please do that

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now updating the template's five image blocks to render real `<img>` when available, falling back to the placeholder pattern.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: read_file]_

That block already succeeded (this is the "recent recipes" section, not seasonal). Let me check the seasonal section above it.

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

All image slots now render the real `og:image`/Recipe-schema photo when fetched, falling back to placeholder art if the site blocks it. Note: this uses a public CORS proxy for demo purposes since most recipe sites don't send CORS headers — a production build would do this fetch server-side instead.

_[tool: ready_for_verification]_

Done.

## User

Found issues — fixing…

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now removing the `<img>` tags from the template and using the single background-image div instead.

_[tool: read_file]_

Now replacing all four `<img>` blocks with a single mediaStyle div (image or placeholder both handled in JS).

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

No more `<img>` tags — images render via CSS `background-image` on the same card divs, eliminating the broken-src issue entirely.

_[tool: ready_for_verification]_

Fixed.

## User

Rename the buttons on the home page to Chicken, Beef, Pork, Seafood, All.  Add 3 new buttons for Vegetarian, Dessert, Appetizer. Also add in the ability on each individual recipe's page to add or modify the tags

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: read_file]_

Now updating template badges to use tag chips.

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Filter buttons renamed/expanded to Chicken, Beef, Pork, Seafood, Vegetarian, Dessert, Appetizer, All; each recipe now has editable tags with add/remove on its detail page.

_[tool: ready_for_verification]_

Done.

## User

Since we removed the Season buttons, you can also remove them as tags on the individual recipe pages and tiles on the home page

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Season badges removed from library cards, detail page, and the save-preview modal.

_[tool: ready_for_verification]_

Done.

## User

What i meant was, i want the user to have the ability to add whether a recipe falls under the category of chicken, beef, seafood, etc. Please add these buttons on the individual recipe pages, and the user's selection should be remembered so that when he/she filters by "chicken" on the home page, that everything she labeled as "chicken" will be shown.

## Assistant

_[tool: read_file]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now updating the detail-page template to show category toggle buttons instead of the free-text tag input.

_[tool: dc_html_str_replace]_

Recipe detail pages now show toggleable category buttons (Chicken, Beef, Pork, Seafood, Vegetarian, Dessert, Appetizer) instead of free-text tags. Selections persist and match the Library filter chips.

_[tool: ready_for_verification]_

Done.

## User

one last change. is there a way to have the user make a selection on the rating for a recipe directly on the home page, by clicking on the stars directly on the tile? this way , they don't have to click into the individual recipe page.

## Assistant

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

Now updating the star `<span>` template markup to be clickable wherever `starsArr` is rendered.

_[tool: dc_html_str_replace]_

Home and Library tiles' stars are now directly clickable (with click propagation stopped so it doesn't open the recipe).

_[tool: ready_for_verification]_

Done.

