# Implementation Plan

- [x] 1. Update CSS Variables dan Global Styles
  - [x] 1.1 Update CSS variables di `globals.css` untuk light theme
    - Ubah `--sidebar` dari `#0f4c92` ke `#FFFFFF`
    - Ubah `--sidebar-foreground` dari `#ffffff` ke `#374151`
    - Tambah `--accent-pink: #EC4899`
    - Ubah `--background` ke `#FAFAFA`
    - _Requirements: 5.1, 5.3, 5.4_

- [x] 2. Refactor Sidebar Component
  - [x] 2.1 Update sidebar background dan text colors
    - Ubah background dari `#334155` ke `#FFFFFF`
    - Ubah text color ke dark gray `#374151`
    - Tambah right border `1px solid #E5E7EB`
    - _Requirements: 1.1, 1.2, 7.1_
  - [x] 2.2 Update sidebar menu item styling
    - Ubah hover state ke `#F3F4F6` background
    - Ubah active state dari orange gradient ke `#F3F4F6` dengan darker text
    - Update section headers ke muted gray uppercase
    - _Requirements: 1.3, 1.4, 1.5_
  - [x] 2.3 Update sidebar button styling
    - Ubah "New Chat" button dari orange gradient ke subtle styling
    - Update icon colors ke match dark theme
    - _Requirements: 1.4, 6.1_

- [x] 3. Refactor Chat Interface Component
  - [x] 3.1 Update chat area background
    - Ubah main background ke `#FAFAFA`
    - _Requirements: 2.1_
  - [x] 3.2 Update welcome/empty state
    - Tambah pink/magenta question mark icon
    - Update typography untuk heading (24px, font-weight 600)
    - _Requirements: 2.4, 6.3_
  - [x] 3.3 Update message bubble styling
    - Pastikan user messages tetap `#FEF3E8`
    - Update assistant messages dengan white background dan subtle border
    - _Requirements: 2.2, 2.3, 7.3_
  - [ ]* 3.4 Write property test untuk message styling consistency
    - **Property 2: Message Bubble Styling Consistency**
    - **Validates: Requirements 2.2, 2.3**

- [x] 4. Refactor Input Bar
  - [x] 4.1 Update input bar container styling
    - Ubah border-radius ke 24px (rounded-full)
    - Tambah subtle box-shadow
    - Update background ke white
    - _Requirements: 3.1, 7.2_
  - [x] 4.2 Update send button styling
    - Ubah dari orange gradient ke pink `#EC4899`
    - _Requirements: 3.2_
  - [x] 4.3 Update placeholder text
    - Ubah placeholder ke "Ask a question..."
    - _Requirements: 3.3_
  - [x] 4.4 Add attachment dan emoji icon buttons
    - Tambah icon buttons di kiri input
    - Style dengan subtle gray color
    - _Requirements: 3.4_

- [x] 5. Implement Quick Actions
  - [x] 5.1 Create Quick Actions component
    - Buat pill-shaped buttons (rounded-full)
    - Add subtle borders
    - Position di bawah input bar
    - _Requirements: 4.1, 4.2_
  - [x] 5.2 Add hover states untuk Quick Actions
    - Implement subtle background highlight on hover
    - _Requirements: 4.3_

- [x] 6. Update Page Layout
  - [x] 6.1 Update main page container styling
    - Ubah background dari `#334155` ke match new theme
    - Ensure proper spacing dan padding
    - _Requirements: 6.4_

- [x] 7. Checkpoint - Ensure all tests pass
  - All files have no diagnostics errors

- [ ]* 8. Testing dan Verification
  - [ ]* 8.1 Write unit tests untuk CSS variable definitions
    - Verify semua CSS variables terdefinisi dengan benar
    - _Requirements: 5.1_
  - [ ]* 8.2 Manual visual QA
    - Test di berbagai viewport sizes (mobile, tablet, desktop)
    - Verify semua warna dan styling sesuai design
    - _Requirements: All_
