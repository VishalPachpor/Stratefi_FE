# Asset Optimization Section — Developer Guide

## Overview

The Asset Optimization section provides a modular, scalable, and user-friendly interface for optimizing DeFi assets across multiple protocols. It is designed for easy integration with real APIs and AI agents.

---

## 1. High-Level Flow

- **User sees a list of assets** (mocked, but ready for real wallet data).
- **User selects an asset** → a chat prompt appears.
- **User chooses "Lend" or "Borrow"** → an AI "thinking" animation plays.
- **After loading**, the user sees:
  - An AI-generated research note (why a protocol is best)
  - A list of protocols (vaults) for the selected action
- **User can view protocol details** or run an optimization simulation.

---

## 2. Main Components & Responsibilities

- **index.tsx**: Holds all state (selected asset, action, loading, etc.), loads asset data, and composes the UI using subcomponents.
- **AssetList.tsx**: Displays the user's assets and handles asset selection.
- **OptimizationPanel.tsx**: Orchestrates the right panel (chat, loading, research, protocols, etc.) and decides what to show based on state.
- **ResearchNote.tsx**: Shows an AI-generated research summary for the selected asset/action.
- **ProtocolList.tsx**: Lists available protocols for the asset/action and handles "View Details" and protocol selection.
- **VaultsLoading.tsx**: Shows the animated "AI is thinking..." loading state.
- **EmptyState.tsx**: Reusable for "no asset selected", "no protocols", etc.
- **utils/optimization.ts**: Contains helper functions (e.g., `generateResearchNote`).

---

## 3. Data Flow

- **Assets**: Loaded into state (mocked, but can be fetched from wallet or API).
- **Protocols**: Nested under each asset, with type "lend" or "borrow".
- **Selections**: User choices update state, which updates the UI.

---

## 4. How to Integrate Real APIs & AI Agents

### A. Replace Mock Data with Real API Calls

- In `index.tsx`, replace the mock data loading in `useEffect`:
  ```js
  useEffect(() => {
    // Example: fetch from your backend or wallet provider
    fetch("/api/user-assets")
      .then((res) => res.json())
      .then((data) => setWalletAssets(data.assets));
  }, []);
  ```
- For protocols, fetch from your backend or a DeFi aggregator API.

### B. Integrate AI Agent for Research/Recommendations

- In `ResearchNote.tsx` (or a new hook), call your AI agent API:
  ```js
  // Example: useEffect or on-demand
  fetch("/api/ai-research", {
    method: "POST",
    body: JSON.stringify({ asset, action }),
  })
    .then((res) => res.json())
    .then((data) => setResearchNote(data.research));
  ```
- Replace the `generateResearchNote` utility with a real API call and display the result.

### C. Handle User Actions

- When the user clicks "Optimize" or "View Details", call your backend or agent as needed.
- Pass all necessary context (asset, protocol, user address, etc.) to your API.

---

## 5. Error Handling & Loading States

- Use the provided loading and empty state components for a smooth UX.

---

## 6. Where to Start

- Replace the mock data in `index.tsx` with your real API calls.
- Replace the research note logic in `ResearchNote.tsx` with your AI agent's output.
- Ensure all API calls are async and handle loading/error states.

---

## Summary

- The codebase is now modular and ready for real data.
- You only need to swap out the mock data and research logic for real API/AI calls.
- All UI and state management is already in place for a seamless integration.

---

If you need code samples for a specific API or want a more detailed integration example, see the comments in each component or contact the core team.
