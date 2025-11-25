# Requirements Document

## Introduction

Dokumen ini mendefinisikan requirements untuk refactor UI aplikasi chat Polsek Rembang agar mengikuti tema visual dari Chatbase. Refactor ini fokus pada perubahan tata letak komponen, warna, dan styling tanpa mengubah konten atau fungsionalitas yang ada.

## Glossary

- **Sidebar**: Panel navigasi di sisi kiri yang berisi menu dan aksi
- **Chat_Area**: Area utama di tengah untuk menampilkan percakapan
- **Input_Bar**: Komponen input untuk mengetik pesan di bagian bawah
- **Quick_Actions**: Tombol-tombol aksi cepat di bawah input (Billing, Book a call, Talk to human)
- **Theme_System**: Sistem variabel CSS untuk mengatur warna dan styling secara konsisten

## Requirements

### Requirement 1: Sidebar Theme Refactor

**User Story:** As a user, I want a clean white/light sidebar, so that the interface feels modern and less heavy.

#### Acceptance Criteria

1. WHEN the application loads THEN the Sidebar SHALL display with white (#FFFFFF) background color
2. WHEN the Sidebar renders menu items THEN the Sidebar SHALL display text in dark gray (#374151) color
3. WHEN a user hovers over a menu item THEN the Sidebar SHALL display a subtle gray (#F3F4F6) background highlight
4. WHEN a menu item is active/selected THEN the Sidebar SHALL display the item with light gray (#F3F4F6) background and darker text
5. WHEN the Sidebar renders section headers THEN the Sidebar SHALL display headers in muted gray (#9CA3AF) with uppercase styling

### Requirement 2: Chat Area Theme Refactor

**User Story:** As a user, I want a clean white chat area with subtle background, so that messages are easy to read.

#### Acceptance Criteria

1. WHEN the Chat_Area loads THEN the Chat_Area SHALL display with off-white (#FAFAFA) background color
2. WHEN displaying assistant messages THEN the Chat_Area SHALL render messages with white background and subtle border
3. WHEN displaying user messages THEN the Chat_Area SHALL render messages with light peach/cream (#FEF3E8) background
4. WHEN the chat is empty THEN the Chat_Area SHALL display a centered welcome message with pink/magenta accent icon

### Requirement 3: Input Bar Refactor

**User Story:** As a user, I want a modern input bar with rounded corners and action buttons, so that I can easily compose messages.

#### Acceptance Criteria

1. WHEN the Input_Bar renders THEN the Input_Bar SHALL display with white background, rounded corners (border-radius 24px), and subtle shadow
2. WHEN the Input_Bar contains text THEN the send button SHALL display with pink/coral (#EC4899) accent color
3. WHEN the Input_Bar is empty THEN the Input_Bar SHALL display placeholder text "Ask a question..."
4. WHEN the Input_Bar renders THEN the Input_Bar SHALL include attachment and emoji icon buttons on the left side

### Requirement 4: Quick Actions Implementation

**User Story:** As a user, I want quick action buttons below the input, so that I can access common actions easily.

#### Acceptance Criteria

1. WHEN the chat is in initial state THEN the system SHALL display Quick_Actions buttons below the Input_Bar
2. WHEN Quick_Actions render THEN the system SHALL display buttons with pill-shaped styling (rounded-full) and subtle borders
3. WHEN a user hovers over a Quick_Action THEN the system SHALL display a subtle background highlight

### Requirement 5: Color System Refactor

**User Story:** As a developer, I want a consistent color system using CSS variables, so that theme changes are maintainable.

#### Acceptance Criteria

1. WHEN the Theme_System initializes THEN the system SHALL define CSS variables for all primary colors (white, gray shades, accent pink)
2. WHEN components render THEN the components SHALL reference Theme_System CSS variables instead of hardcoded colors
3. WHEN the sidebar background color is defined THEN the Theme_System SHALL use white (#FFFFFF) as the value
4. WHEN the accent color is defined THEN the Theme_System SHALL use pink/magenta (#EC4899) as the primary accent

### Requirement 6: Typography and Spacing Refactor

**User Story:** As a user, I want consistent typography and spacing, so that the interface feels polished and professional.

#### Acceptance Criteria

1. WHEN text renders in the Sidebar THEN the system SHALL use font-weight 500 (medium) for menu items
2. WHEN section headers render THEN the system SHALL use font-size 11px, uppercase, and letter-spacing 0.05em
3. WHEN the welcome message renders THEN the system SHALL use font-size 24px and font-weight 600 for the heading
4. WHEN components render THEN the system SHALL maintain consistent padding of 16px for containers

### Requirement 7: Border and Shadow Styling

**User Story:** As a user, I want subtle borders and shadows, so that components have visual depth without being heavy.

#### Acceptance Criteria

1. WHEN the Sidebar renders THEN the Sidebar SHALL display with a subtle right border (#E5E7EB)
2. WHEN the Input_Bar renders THEN the Input_Bar SHALL display with subtle box-shadow (0 1px 3px rgba(0,0,0,0.1))
3. WHEN message bubbles render THEN the message bubbles SHALL display with subtle border (#E5E7EB) for assistant messages
