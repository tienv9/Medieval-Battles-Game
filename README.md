# Medieval Battles

**Medieval Battles** is a browser-based, turn-based tactical strategy game focused on formation warfare, positioning, and directional combat. Inspired by abstract strategy games and historical battlefield concepts, the game emphasizes planning, timing, and unit interaction over fast reflexes or complex animations.

The project is built with **React and JavaScript**, with a strong emphasis on clean architecture and a deterministic, testable game engine separated from the user interface.

---

## 🧠 Game Overview

Two players command opposing medieval armies on a **10×10 grid**. Each player deploys **16 units** within a designated deployment zone, choosing freely from four unit types:

* **Swordsmen** – close-range infantry specialists
* **Spearmen** – formation holders and cavalry counters
* **Archers** – long-range infantry suppressors
* **Cavalry** – fast-moving flank and disruption units

Combat is **directional**, formations are critical, and flanking or rear attacks can instantly destroy units. Dice rolls introduce limited uncertainty, but tactical positioning and timing remain the primary determinants of victory.

---

## ⚔️ Core Mechanics

* **Formation-Based Movement**
  Groups of adjacent units may move together, with speed determined by unit composition. Mixed formations trade speed for flexibility.

* **Directional Combat & Facing**
  Units can only attack forward. Side and rear attacks automatically destroy the defender.

* **Rock–Paper–Scissors Balance**

  * Spearmen → Cavalry
  * Swordsmen → Spearmen
  * Archers → Infantry
  * Cavalry → Archers (via speed and flanking)

* **Limited Randomness**
  Combat is resolved using dice rolls only in frontal engagements, preserving strategic depth while avoiding full determinism.

---

## 🛠 Technical Focus

This project is designed as a **portfolio-quality system**, with emphasis on:

* Separation of **game rules**, **state management**, and **UI rendering**
* Deterministic, rule-driven logic implemented as pure functions where possible
* Scalable architecture suitable for AI opponents, multiplayer, or balance iteration
* Clear rule definitions to support unit testing and future expansion

---

## 🚧 Project Status

Medieval Battles is under active development.

Current focus areas:

* Core game engine and rule enforcement
* Grid-based board UI
* Turn handling and formation movement
* Combat resolution and facing logic

Future goals include:

* AI opponent
* Online or local multiplayer
* Match replays and debugging tools
* Visual polish and animations

---

## 📁 Tech Stack

* **React**
* **JavaScript (ES6+)**
* HTML / CSS
* Modular, rule-driven architecture

---

## 🎯 Why This Project?

Medieval Battles was created to explore:

* Complex state management in React
* Designing systems with clear rules and edge-case handling
* Translating abstract board game mechanics into deterministic code
* Building testable logic-heavy applications beyond CRUD interfaces

---
