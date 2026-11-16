# UXLab V1.3 – Section 2

# Front-End Coding Standards (REACT)

## Purpose

These standards complement UXLab V1.3 and promote a consistent, modular, maintainable and AI-ready React application.

---

## 1. Component Documentation

Every component shall begin with a standard header.

* **Component Name**
* **Module**
* **Purpose**
* **Author/Version** (optional)
* **AI Tags** (keywords describing the component)

This improves maintainability, project searchability and AI-assisted code understanding.

---

## 2. Logical Block Comments

Provide a concise one-line comment for each logical code block.

Examples:

* Load authenticated user information.
* Compute simulation progress.
* Handle user navigation.
* Display learning resources.

Comments should explain the **purpose**, not merely the code syntax.

---

## 3. Standard Component Structure

Use a consistent structure for all React components.

1. Component Header
2. Imports
3. Constants
4. Component Definition
5. State
6. Derived Values
7. Effects
8. Event Handlers
9. AI Extension Hooks
10. Render

Consistency improves readability and onboarding.

---

## 4. Separation of Responsibilities

| Responsibility         | Location            |
| ---------------------- | ------------------- |
| Business Logic         | Hooks               |
| UI Rendering           | Components          |
| Constants              | `constants/`        |
| Services and API Calls | `services/`         |
| Styles                 | UXLab Style Library |

Page components should primarily orchestrate reusable components.

---

## 5. Modular Design

* Keep components focused on a single responsibility.
* Prefer composition over large monolithic components.
* Reuse common UI components whenever practical.
* Target component sizes that remain easy to review and maintain.

---

## 6. AI-Ready Architecture

Reserve clearly identified extension points for future AI capabilities without affecting current functionality.

Typical AI integration areas include:

* Learning Coach
* Decision Assessment
* Learning Analytics
* Content Recommendation
* Facilitator Assistant
* Executive Report Narration

AI hooks should initially act as placeholders and evolve independently of business logic.

---

## 7. Interactive Controls and Colour Pairing

All interactive controls—including buttons, navigation tabs, toggle buttons and selectable chips—shall follow the approved colour tokens defined in UXLab V1.3.

* **Paired Colours:** Every interactive state shall explicitly define a compatible background and foreground (text/icon) colour pair.
* **Primary Controls:** Use the approved primary purple or hero gradient with white text and icons.
* **Secondary Controls:** Use a white background with brand-purple text. Selected controls shall use the approved light-purple background with dark-purple text.
* **Navigation Tabs:** Inactive tabs shall use dark-purple text on a transparent or light background. Active tabs shall use the approved primary background or gradient with white text.
* **State Consistency:** Default, hover, active, selected, focus and disabled states shall maintain readable foreground/background combinations.
* **No Partial Overrides:** Component-specific styles shall not override the background or foreground independently in a way that breaks the approved colour pairing.
* **Framework State Handling:** Developers shall verify actual component behaviour and relevant UI framework state classes, such as MUI's `.Mui-selected`, to ensure that selected controls remain readable.
* **Validation:** Interactive controls shall be checked across all applicable states before release.

**Mandatory Rule:** Never change an interactive control's background without ensuring that its text and icons retain sufficient contrast and remain readable.

Existing UXLab colour tokens shall be reused. New colours or changes to shared tokens require justification and approval.

---

## Guiding Principle

Build every component to be understandable by developers, AI assistants and future maintainers, while keeping the code modular, reusable and enterprise-ready.
