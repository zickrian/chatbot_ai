# Design Document

## Overview

Dokumen ini menganalisa dan mendokumentasikan perubahan skema warna dan bentuk rounded pada UI chatbot berdasarkan gambar referensi. Analisa fokus pada aspek visual: warna background, warna elemen, dan tingkat kelengkungan sudut (border-radius).

## Architecture

Perubahan akan dilakukan pada layer presentasi (UI components) tanpa mengubah logika bisnis atau struktur data. Modifikasi akan dilakukan pada:

1. **Component Styling**: Perubahan inline styles dan className pada komponen React
2. **Global CSS Variables**: Penyesuaian CSS custom properties untuk konsistensi tema
3. **Tailwind Classes**: Penggunaan utility classes untuk rounded corners

## Components and Interfaces

### Sidebar Component
- **File**: `components/chat-sidebar.tsx`
- **Elemen yang dianalisa**:
  - Background color sidebar
  - Button colors (New Chat, menu items)
  - Border colors
  - Hover states
  - Rounded corners pada buttons dan containers

### Chat Interface Component
- **File**: `components/chat-interface.tsx`
- **Elemen yang dianalisa**:
  - Background color area chat
  - Message bubble colors (user & assistant)
  - Header background
  - Input field styling
  - Button colors
  - Rounded corners pada message bubbles, input, buttons

### Global Styles
- **File**: `app/globals.css`
- **Variables yang dianalisa**:
  - CSS custom properties untuk colors
  - Border radius values

## Data Models

Tidak ada perubahan pada data models karena ini hanya perubahan visual.

## Analisa Warna dari Gambar Referensi

### Sidebar (Kiri)
Berdasarkan gambar referensi:

**Background Sidebar:**
- Warna: Dark navy/charcoal dengan sedikit kebiruan
- Estimasi: `#1a1f2e` atau `#1e2433` (lebih gelap dari current `#0f4c92`)
- Current: `rgba(15, 76, 146, 1)` - terlalu biru terang

**Button "New Chat" / Primary Button:**
- Warna: Orange/coral gradient
- Estimasi: `#ff6b4a` sampai `#ff8c6b` (gradient)
- Current: White background - perlu diganti ke orange

**Menu Items / Secondary Buttons:**
- Warna text: Light gray/white dengan opacity
- Hover state: Slightly lighter background
- Current: Sudah cukup baik dengan white/10

**Border/Separator:**
- Warna: Subtle light border
- Estimasi: `rgba(255, 255, 255, 0.08)` atau `rgba(255, 255, 255, 0.1)`
- Current: `border-white/10` - sudah sesuai

**Pro Plan Card (Bottom):**
- Background: Orange gradient (`#ff6b4a` to `#ff8c6b`)
- Text: White
- Rounded corners: Medium (sekitar 12-16px)

### Chat Area (Tengah/Kanan)

**Background Area Chat:**
- Warna: Very light gray/off-white
- Estimasi: `#f5f6f8` atau `#f8f9fa`
- Current: `bg-slate-50/50` - cukup dekat, mungkin perlu sedikit lebih terang

**Header:**
- Background: White atau very light dengan subtle shadow
- Estimasi: `#ffffff` dengan shadow
- Current: `bg-white/80` - sudah sesuai

**Message Bubble - User (Kanan):**
- Warna: Light peach/cream
- Estimasi: `#fef3e8` atau `#fff5eb` (sangat terang, bukan biru)
- Current: `rgba(15, 76, 146, 1)` - SALAH, harus diganti ke peach/cream

**Message Bubble - Assistant (Kiri):**
- Warna: White dengan subtle border
- Estimasi: `#ffffff` dengan border `#e5e7eb`
- Current: `bg-white border border-slate-100` - sudah sesuai

**Input Field:**
- Background: White
- Border: Light gray
- Estimasi: `#ffffff` dengan border `#e5e7eb`
- Current: Sudah sesuai

**Send Button:**
- Warna: Orange/coral (sama dengan New Chat button)
- Estimasi: `#ff6b4a`
- Current: `rgba(15, 76, 146, 1)` - harus diganti ke orange

## Analisa Rounded Corners dari Gambar Referensi

### Sidebar Elements

**New Chat Button:**
- Border radius: Medium-large
- Estimasi: `12px` atau `rounded-xl` (Tailwind)
- Current: Default button radius - perlu disesuaikan

**Menu Items:**
- Border radius: Small-medium
- Estimasi: `8px` atau `rounded-lg`
- Current: `rounded-md` - cukup sesuai

**Pro Plan Card:**
- Border radius: Medium
- Estimasi: `12px` atau `rounded-xl`
- Current: Perlu ditambahkan jika belum ada

### Chat Area Elements

**Message Bubbles:**
- Border radius: Large dengan satu sudut yang lebih tajam
- Estimasi: `16px` atau `rounded-2xl` dengan satu corner `rounded-sm`
- Current: `rounded-2xl` dengan `rounded-tr-sm` (user) dan `rounded-tl-sm` (assistant) - SUDAH SESUAI

**Input Field:**
- Border radius: Large
- Estimasi: `16px` atau `rounded-2xl`
- Current: `rounded-xl sm:rounded-2xl` - sudah sesuai

**Buttons (Send, Voice):**
- Border radius: Medium-large (hampir circular)
- Estimasi: `12px` atau `rounded-xl`
- Current: `rounded-xl` - sudah sesuai

**Avatar/Logo:**
- Border radius: Full circle
- Estimasi: `rounded-full`
- Current: `rounded-full` - sudah sesuai

**Code Block Container (dalam message):**
- Border radius: Medium
- Estimasi: `12px` atau `rounded-xl`
- Perlu ditambahkan jika ada code blocks



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Untuk feature ini, semua acceptance criteria bersifat visual dan memerlukan penilaian manusia terhadap kesesuaian dengan gambar referensi. Oleh karena itu, tidak ada correctness properties yang dapat diuji secara otomatis melalui property-based testing.

**No testable properties** - Semua requirements bersifat visual dan memerlukan review manual oleh user untuk memastikan kesesuaian dengan gambar referensi.

## Error Handling

Tidak ada error handling khusus yang diperlukan karena ini hanya perubahan styling visual. Jika ada nilai CSS yang invalid, browser akan mengabaikannya dan menggunakan nilai default.

## Testing Strategy

### Manual Visual Testing

Karena semua requirements bersifat visual, testing akan dilakukan secara manual:

1. **Visual Comparison**: Membandingkan hasil implementasi dengan gambar referensi secara side-by-side
2. **Responsive Testing**: Memastikan styling tetap konsisten di berbagai ukuran layar
3. **Browser Compatibility**: Memastikan warna dan rounded corners tampil konsisten di berbagai browser

### Testing Checklist

**Sidebar:**
- [ ] Background color sesuai dengan referensi (dark navy/charcoal)
- [ ] New Chat button menggunakan orange gradient
- [ ] Menu items memiliki hover state yang sesuai
- [ ] Border/separator menggunakan warna yang subtle
- [ ] Pro Plan card memiliki orange gradient
- [ ] Rounded corners pada semua elemen sesuai

**Chat Area:**
- [ ] Background area chat sesuai (light gray/off-white)
- [ ] Message bubble user menggunakan warna peach/cream (bukan biru)
- [ ] Message bubble assistant menggunakan white dengan border
- [ ] Header styling sesuai
- [ ] Input field styling sesuai
- [ ] Send button menggunakan warna orange
- [ ] Rounded corners pada message bubbles sesuai (dengan satu sudut tajam)
- [ ] Rounded corners pada input dan buttons sesuai

### No Automated Testing

Tidak ada unit tests atau property-based tests yang akan dibuat karena:
- Semua requirements bersifat visual
- Tidak ada logika bisnis yang berubah
- Tidak ada fungsi atau algoritma yang perlu diuji
- Validasi hanya dapat dilakukan melalui inspeksi visual manual

## Implementation Notes

### Color Values Summary

Berdasarkan analisa gambar referensi:

**Sidebar:**
- Background: `#1a1f2e` atau `#1e2433`
- Primary button (New Chat): `linear-gradient(135deg, #ff6b4a 0%, #ff8c6b 100%)`
- Text: `#ffffff` dengan various opacity
- Border: `rgba(255, 255, 255, 0.1)`

**Chat Area:**
- Background: `#f5f6f8` atau `#f8f9fa`
- User message bubble: `#fef3e8` atau `#fff5eb` (peach/cream)
- Assistant message bubble: `#ffffff`
- Send button: `#ff6b4a`

### Border Radius Summary

- Message bubbles: `16px` (rounded-2xl) dengan satu corner `4px` (rounded-sm)
- Buttons: `12px` (rounded-xl)
- Input field: `16px` (rounded-2xl)
- Cards: `12px` (rounded-xl)
- Avatar: `9999px` (rounded-full)

### Files to Modify

1. `components/chat-sidebar.tsx` - Update sidebar colors dan rounded corners
2. `components/chat-interface.tsx` - Update chat area colors dan rounded corners
3. `app/globals.css` - Update CSS custom properties jika diperlukan
