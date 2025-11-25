# Design Document: UI Theme Refactor

## Overview

Refactor ini akan mengubah tema visual aplikasi chat Polsek Rembang dari dark theme (slate) menjadi light theme yang clean dan modern seperti Chatbase. Perubahan mencakup warna, spacing, typography, dan styling komponen tanpa mengubah fungsionalitas atau konten.

## Architecture

### Current vs Target State

```
Current State:
┌─────────────────────────────────────────────────┐
│ Sidebar (Dark Slate #334155)  │  Chat Area      │
│ - White text                  │  (Light Gray)   │
│ - Orange accent buttons       │  - Peach user   │
│                               │    messages     │
└─────────────────────────────────────────────────┘

Target State (Chatbase-like):
┌─────────────────────────────────────────────────┐
│ Sidebar (White #FFFFFF)       │  Chat Area      │
│ - Dark gray text              │  (Off-white)    │
│ - Gray hover states           │  - Pink accent  │
│ - Subtle right border         │  - Clean input  │
└─────────────────────────────────────────────────┘
```

### Color Palette

```
Primary Colors:
- Background White: #FFFFFF
- Off-White: #FAFAFA
- Light Gray: #F3F4F6
- Border Gray: #E5E7EB
- Text Dark: #374151
- Text Muted: #9CA3AF
- Accent Pink: #EC4899
- Accent Pink Light: #FDF2F8
- User Message: #FEF3E8
```

## Components and Interfaces

### 1. Sidebar Component (`chat-sidebar.tsx`)

**Changes:**
- Background: `#334155` → `#FFFFFF`
- Text color: `white` → `#374151`
- Hover state: `white/10` → `#F3F4F6`
- Active state: gradient orange → `#F3F4F6` with darker text
- Add right border: `1px solid #E5E7EB`
- Section headers: muted gray uppercase

**Interface (unchanged):**
```typescript
interface ChatSidebarProps {
  onNewChat: () => void;
  onDownload: () => void;
  onObjectDetection: () => void;
  isOpen: boolean;
  onClose: () => void;
  currentMode: 'chat' | 'object-detection';
}
```

### 2. Chat Interface Component (`chat-interface.tsx`)

**Changes:**
- Main background: `#f5f6f8` → `#FAFAFA`
- Welcome icon: Add pink/magenta question mark icon
- Input bar: More rounded (24px), subtle shadow
- Send button: Orange gradient → Pink (#EC4899)
- User messages: Keep `#FEF3E8` (already matches)
- Assistant messages: White with subtle border

### 3. Input Area Redesign

**New Layout:**
```
┌─────────────────────────────────────────────────┐
│  📎  😊  │  Ask a question...              │ ↑ │
└─────────────────────────────────────────────────┘
         │  Billing  │  Book a call  │  Talk to human  │
```

### 4. Global CSS (`globals.css`)

**CSS Variables Update:**
```css
:root {
  --background: #FAFAFA;
  --sidebar: #FFFFFF;
  --sidebar-foreground: #374151;
  --sidebar-border: #E5E7EB;
  --accent: #EC4899;
  --accent-light: #FDF2F8;
  --text-muted: #9CA3AF;
  --border: #E5E7EB;
}
```

## Data Models

Tidak ada perubahan pada data models. Refactor ini murni visual/styling.



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Berdasarkan analisis prework, sebagian besar acceptance criteria adalah visual styling requirements yang lebih cocok diuji sebagai examples (snapshot/visual tests) daripada properties. Namun, ada beberapa properties yang dapat diidentifikasi:

### Property 1: CSS Variable Consistency
*For any* component that uses color values, the component should reference CSS variables from the Theme_System rather than hardcoded hex values.
**Validates: Requirements 5.2**

### Property 2: Message Bubble Styling Consistency
*For any* message rendered in the chat, if the message role is 'user' then the background should be peach (#FEF3E8), and if the role is 'assistant' then the background should be white with border.
**Validates: Requirements 2.2, 2.3**

### Property 3: Active State Visual Feedback
*For any* interactive element (menu item, button) in the sidebar, when the element is in active/selected state, it should have visually distinct styling from inactive state.
**Validates: Requirements 1.4**

> Note: Karena ini adalah refactor visual/styling, sebagian besar testing akan berupa visual regression tests atau snapshot tests daripada property-based tests. Properties di atas lebih bersifat structural consistency checks.

## Error Handling

Tidak ada perubahan pada error handling. Refactor ini murni visual.

## Testing Strategy

### Visual Testing Approach

Karena ini adalah UI styling refactor, testing strategy fokus pada:

1. **Visual Regression Testing** - Menggunakan snapshot tests untuk memastikan styling konsisten
2. **Manual Visual QA** - Review visual di berbagai viewport sizes
3. **CSS Variable Verification** - Memastikan semua CSS variables terdefinisi dengan benar

### Unit Tests

Unit tests akan memverifikasi:
- CSS variables terdefinisi di globals.css
- Komponen render dengan class names yang benar
- Conditional styling (active states, hover states) bekerja

### Property-Based Testing

Untuk refactor visual ini, property-based testing terbatas karena sebagian besar requirements adalah styling yang bersifat example-based. Namun, kita dapat menggunakan:

- **fast-check** library untuk TypeScript/JavaScript
- Test bahwa message styling konsisten berdasarkan role

```typescript
// Example property test structure
import fc from 'fast-check';

// Property: Message styling based on role
fc.assert(
  fc.property(
    fc.record({
      role: fc.constantFrom('user', 'assistant'),
      content: fc.string()
    }),
    (message) => {
      const expectedBg = message.role === 'user' ? '#FEF3E8' : '#FFFFFF';
      // Verify styling logic
      return getMessageBackground(message.role) === expectedBg;
    }
  )
);
```

### Test Coverage

| Requirement | Test Type | Priority |
|-------------|-----------|----------|
| 1.x Sidebar Theme | Visual/Snapshot | High |
| 2.x Chat Area | Visual/Snapshot | High |
| 3.x Input Bar | Visual/Snapshot | High |
| 4.x Quick Actions | Visual/Snapshot | Medium |
| 5.x Color System | Unit Test | High |
| 6.x Typography | Visual/Snapshot | Medium |
| 7.x Borders/Shadows | Visual/Snapshot | Low |
