# AI-INSTRUCT: Pinleaf Forge

**Project Name**: ⚡ Pinleaf Forge - Embedded Platform Specification Editor

**Repository**: https://github.com/vctmasters1/PDS-Pinleaf-Forge

**Location**: `K:\PDS_AutomationSuite\PDS-HwPlatform`

**Live Demo**: https://vctmasters1.github.io/PDS-Pinleaf-Forge/platform-editor-v2.html

**Authority Level**: DEEP (Authoritative for hardware platform specifications)

**Technology Stack**: Pure HTML/CSS/JavaScript (standalone, no dependencies, no build tools)

**Current Version**: 2.1 (February 4, 2026)

---

## 🎯 Project Purpose

**Pinleaf Forge** is an open-source, web-based tool for defining and visualizing microcontroller/processor platform specifications. It enables embedded developers, hobbyists, and hardware teams to:

1. **Define platform specifications** - CPU architecture, RAM, flash, GPIO, wireless capabilities
2. **Map pin capabilities** - Visual matrix with multi-header support (J1, J2, J3...)
3. **Generate pinout diagrams** - Printable "pinout leaf" overlays for dev boards
4. **Export structured JSON** - Ready for databases, code generation, PlatformIO, Wokwi

**Key Differentiator**: AI-assisted workflow using Copilot/ChatGPT prompts to auto-populate hardware specifications, eliminating manual datasheet hunting.

---

## 🏗️ Architecture Overview

### **Core Components**

1. **Platform Editor** (`platform-editor-v2.html`)
   - Main tool for creating/editing platform specifications
   - Multi-step workflow: Research → Import → Edit → Export
   - Pin capability matrix with drag & drop, sorting, grouping
   - Color-coded capability buttons (VIN, GND, 3V3, 5V, GPIO, ADC, PWM, UART, SPI, I2C, CAN, etc.)
   - JSON preview and export

2. **Pinout Leaf Generator** (`pinout-leaf-generator.html`)
   - Creates printable pinout overlays for dev boards
   - Dual-row and single-row layouts
   - SVG/PDF export for printing at actual size
   - Color-coded or black & white schemes

3. **Data Storage**
   - `platforms/<id>.json` - Platform definitions
   - `hwrev/<id>/hwrev-config.json` - Board revision mappings
   - Pure JSON, no database required

---

## 📊 Data Model

### **Platform** (CPU/Processor Specification)
**What it defines**: Processor capabilities (not board-specific)

**File**: `platforms/<id>.json`

**Structure**:
```json
{
  "id": "esp32c3",
  "name": "ESP32-C3",
  "description": "Low-cost WiFi + BLE RISC-V microcontroller",
  "architecture": "RISC-V",
  "cores": 1,
  "frequency_mhz": 160,
  "ram_kb": 400,
  "flash_kb": 4096,
  "gpio_total": 22,
  "adc_channels": 6,
  "pwm_channels": 6,
  "wifi": "802.11b/g/n",
  "ble": "5.0",
  "supported_interfaces": ["I2C", "SPI", "UART"],
  "usb_ports": {"usb2": 1},
  "system_features": ["rtc"],
  "toolchain": "ESP-IDF",
  "notes": "Supports USB Serial/JTAG debugging",
  "pin_capabilities": [
    {
      "pin": 0,
      "header_id": "J1",
      "physical_pin": "1",
      "group": "Power",
      "name": "VIN",
      "capabilities": ["VIN"]
    },
    {
      "pin": 2,
      "header_id": "J1",
      "physical_pin": "3",
      "group": "Communication",
      "name": "GPIO2 / ADC1_CH2",
      "capabilities": ["GPIO", "ADC", "I2C", "SDA"]
    }
  ]
}
```

**Key Fields**:
- `id`: Lowercase identifier (e.g., `esp32c3`, `stm32f407`)
- `pin_capabilities`: Array of pin definitions with:
  - `pin`: Logical GPIO number (0-based index)
  - `header_id`: **NEW in v2.0** - Connector ID (J1, J2, Main, etc.)
  - `physical_pin`: Physical pin number on board (1, PA0, D2, etc.)
  - `group`: Functional group (Power, GPIO, Communication, Analog, Special)
  - `name`: Descriptive name (e.g., "GPIO0 / BOOT", "VIN")
  - `capabilities`: Array of electrical functions (VIN, GND, 3V3, 5V, GPIO, ADC, PWM, UART, RXD, TXD, SPI, MISO, MOSI, SCK, I2C, SDA, SCL, CAN, RMT, INTERRUPT, RESET)

### **hwrev** (Hardware Revision / Board Specification)
**What it defines**: Physical board layout and pin mappings

**File**: `hwrev/<id>/hwrev-config.json`

**Structure**:
```json
{
  "id": "h2o_001",
  "name": "H2O-DEV-12102025",
  "platform": "esp32c3",
  "description": "H2O-Tower aeroponics control board",
  "schematic": "h2o_001_schematic_rev1.pdf",
  "pinout": {
    "water_level_sensor": {
      "gpio": 2,
      "function": "ADC",
      "label": "Water Level"
    },
    "mist_pump_relay": {
      "gpio": 5,
      "function": "GPIO_OUT",
      "label": "Mist Pump"
    }
  },
  "connectors": {
    "J1": "Main power input (5V)",
    "J2": "Sensor connector (I2C)",
    "J3": "Pump outputs (relays)"
  }
}
```

### **Role** (Automation Behavior)
**What it defines**: Device behavior and automation logic

**Files**: NOT in Pinleaf Forge - defined in LadderLogicEditor as `.st` IEC 61131-3 files

**Key Point**: Same board can run different roles (aeroponics, greenhouse, propagation) with different automation files.

---

## 🎨 UI/UX Design Principles

### **Layout Standards**

**Pin Matrix Column Widths** (v2.1):
- Header: `70px` (fixed) - Connector ID (J1, J2, etc.)
- Physical: `70px` (fixed) - Physical pin number
- Group: `120px` (fixed) - Functional group
- Pin Name: `140px` (fixed) - Descriptive name
- Capabilities: `flex` (remaining space) - Button array with horizontal scroll

**Why Fixed Widths?**
- Consistent alignment across all rows
- No text wrapping or layout shifts
- Professional datasheet-like appearance
- Text overflow handled with ellipsis
- Easy visual scanning

### **Color Coding** (Capability Buttons)

| Capability | Color | CSS Class |
|------------|-------|-----------|
| **VIN** | Bright Red (#ff0000) | `.capability-btn.VIN.active` |
| **5V** | Red Gradient | `.capability-btn.\35 V.active` |
| **3V3** | Dark Red Gradient (#8B0000) | `.capability-btn.\33 V3.active` |
| **GND** | Black (#000000) | `.capability-btn.GND.active` |
| **GPIO** | Purple (#9370DB) | `.capability-btn.GPIO.active` |
| **ADC** | Orange (#FFA500) | `.capability-btn.ADC.active` |
| **PWM** | Turquoise (#4ecdc4) | `.capability-btn.PWM.active` |
| **UART/RXD/TXD** | Green (#00ff00) | `.capability-btn.UART.active` |
| **SPI/MISO/MOSI/SCK** | Blue (#0000FF) | `.capability-btn.SPI.active` |
| **I2C/SDA/SCL** | Slate Gray (#708090) | `.capability-btn.I2C.active` |
| **CAN** | Light Blue (#92afde) | `.capability-btn.CAN.active` |
| **RESET** | Dark Turquoise (#00CED1) | `.capability-btn.RESET.active` |
| **INTERRUPT** | Yellow (#FFFF00) | `.capability-btn.INTERRUPT.active` |
| **NEW_CAP** | New Color (#XXXXXX) | `.capability-btn.NEW_CAP.active` |

**Note**: CSS class names for numeric values require escaping (e.g., `.\35 V` for "5V", `.\33 V3` for "3V3").

---

## 🔄 Workflow

### **Typical User Journey**

1. **Research Phase**
   - User enters platform name (e.g., "ESP32-C3")
   - Click "📋 Generate & Copy Prompt"
   - Paste prompt in Copilot Chat / ChatGPT
   - Copilot returns complete JSON specification

2. **Import Phase**
   - Paste JSON in "📥 Import Copilot's JSON Response"
   - Click "📥 Import JSON & Fill Form"
   - All fields auto-populated (platform specs, pin matrix)

3. **Edit Phase**
   - Review auto-filled data
   - Adjust pin names, groups, headers as needed
   - Toggle capability buttons (color-coded)
   - Drag & drop to reorder pins
   - Sort by Header, Physical, Group, or Name

4. **Export Phase**
   - Click "⬇️ Download as JSON"
   - Save to `platforms/<id>.json`
   - Optionally: "📄 Generate Pinout Leaf" for diagrams

### **Multi-Header Support** (v2.0+)

**Use Case**: Boards with multiple connectors (J1, J2, J3...)

**Example**: Raspberry Pi
- J1: 40-pin GPIO header
- J2: Camera connector
- J3: Display connector
- J4: Power input

**Workflow**:
1. Edit "Header" column for each pin (e.g., J1, J2, J3)
2. Sort by Header + Physical Pin (`1,2` in multi-column sort)
3. Pinout Leaf Generator creates separate diagrams per header

---

## 🛠️ Development Guidelines

### **When Editing Code**

**DO**:
- ✅ Maintain fixed column widths (70px, 70px, 120px, 140px)
- ✅ Keep CSS escaped numeric classes (`.\35 V`, `.\33 V3`)
- ✅ Test with 20+ pin rows to verify scrolling
- ✅ Ensure full-width layout for inputs/textareas
- ✅ Preserve color-coded capability buttons
- ✅ Maintain drag & drop functionality
- ✅ Keep JSON preview full-width (max-height: 400px)

**DON'T**:
- ❌ Shrink input field widths (must stay 100%)
- ❌ Change pin matrix column widths without updating header row
- ❌ Add dependencies (npm, libraries, frameworks)
- ❌ Add backend requirements (keep pure client-side)
- ❌ Break JSON import/export compatibility
- ❌ Change color scheme without updating docs

### **CSS Architecture**

**Critical Styles**:
```css
/* Pin Matrix Column Widths - DO NOT CHANGE without coordinating */
.pin-header { width: 70px; min-width: 70px; max-width: 70px; }
.pin-physical { width: 70px; min-width: 70px; max-width: 70px; }
.pin-group { width: 120px; min-width: 120px; max-width: 120px; }
.pin-label { width: 140px; min-width: 140px; max-width: 140px; }

/* Capability Buttons - Color Coding */
.capability-btn.\35 V.active { /* 5V - escaped */ }
.capability-btn.\33 V3.active { /* 3V3 - escaped */ }
```

### **JavaScript State Management**

**Global State**:
- `platformData` - Current platform JSON
- `currentSortColumn` - Active sort column
- `currentSortDirection` - Sort direction (asc/desc)
- `draggedElement` - Currently dragged pin row

**Key Functions**:
- `generatePinRows()` - Creates pin matrix rows
- `createPinRow(pinNum)` - Creates single pin row
- `populatePinCapabilities()` - Extracts pin data from UI
- `updatePreview()` - Updates JSON preview
- `sortPins(column)` - Single-column sort
- `multiColumnSort(columns)` - Multi-column sort
- `generateResearchPrompt()` - Creates Copilot prompt
- `parseAndFillForm()` - Imports JSON

---

## 📂 File Structure

```
PinleafForge/ (or PDS-HwPlatform/)
├── platform-editor-v2.html      # ⚡ Main editor (Pinleaf Forge)
├── pinout-leaf-generator.html   # Pinout diagram generator
├── .gitignore                   # Git exclusions
├── LICENSE                      # MIT license
│
├── README.md                    # User documentation
├── AI-INSTRUCT.md              # This file (AI agent guide)
│
├── platforms/                  # Platform JSON files
│   ├── esp32c3.json
│   ├── renesas-ra6m5.json
│   └── stm32f407.json
│
├── hwrev/                      # Board revision configs
│   └── h2o_001/
│       └── hwrev-config.json
│
├── .local_mds/                 # Internal dev docs (excluded from Git)
│   ├── GIT-SETUP.md
│   ├── HEADER-ID-FEATURE.md
│   ├── REBRANDING-SUMMARY.md
│   └── FINAL-COMMIT.md
│
└── .old/                       # Deprecated files (excluded by .gitignore)
    ├── ai-backend.py
    ├── platform-editor-v2 - Copy.html
    └── ENHANCEMENT-PLAN.md
```

---

## 🔍 Common Tasks for AI Agents

### **Task: Add New Capability Button**

1. **Update ALL_CAPABILITIES array**:
   ```javascript
   const ALL_CAPABILITIES = ['VIN', 'GND', '3V3', '5V', 'RESET', 'GPIO', 'ADC', 'PWM', 'UART', 'RXD', 'TXD', 'SPI', 'MISO', 'MOSI', 'SCK', 'I2C', 'SDA', 'SCL', 'CAN', 'RMT', 'INTERRUPT', 'NEW_CAP'];
   ```

2. **Add CSS color style**:
   ```css
   .capability-btn.NEW_CAP.active {
       background: #color;
       border-color: #color;
       color: white;
   }
   ```

3. **Update research prompt** (if needed)

### **Task: Fix Layout Issue**

1. **Check column widths** in CSS (70px, 70px, 120px, 140px)
2. **Verify header row matches** column widths
3. **Test with 20+ pins** to ensure alignment
4. **Check full-width** for inputs/textareas (`width: 100%`)

### **Task: Update Branding**

1. **Update title tags** (`<title>Pinleaf Forge...</title>`)
2. **Update header section** (`<h1>⚡ Pinleaf Forge</h1>`)
3. **Update README.md** with new branding
4. **Update meta tags** (if added)

### **Task: Add New Sort Column**

1. **Add sort header** in HTML with `onclick="sortPins('newcol')"`
2. **Update sortPins()** function to handle new column
3. **Update multiColumnSort()** function
4. **Update showSortOptions()** prompt text

---

## 🐛 Known Issues & Limitations

### **Current Limitations**

1. **No Backend** - All data stored as JSON files (by design)
2. **No Database** - Cannot query across platforms (by design)
3. **Manual File Management** - User must save JSON files manually
4. **Browser Storage** - sessionStorage used temporarily for pinout generator
5. **PDF Export** - Not implemented (SVG → Print to PDF workaround)

### **Not Bugs** (Intentional Design)

- ❌ No server save button functionality (use "Download as JSON")
- ❌ No platform library/catalog (static files only)
- ❌ No user authentication (pure client-side tool)
- ❌ No cloud sync (local files only)

---

## 🔗 Integration Points

### **Related Tools/Components**

| Tool | Purpose | Integration |
|------|---------|-------------|
| **LadderLogicEditor** | Automation logic editor | Reads platform JSON for pin names |
| **PDS-BuildTools** | Firmware build system | Reads platform JSON for toolchain selection |
| **Device Firmware** | Embedded firmware | Reads hwrev JSON for pin assignments |
| **Wokwi Simulator** | Online simulator | Can import platform JSON |
| **PlatformIO** | Build system | Can use platform JSON for custom boards |

### **Data Flow**

```
Copilot Chat → Pinleaf Forge → platforms/*.json
                     ↓
              hwrev/*.json → LadderLogicEditor
                     ↓
              Device Firmware
```

---

## 📝 Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| **2.1** | Feb 4, 2026 | Rebranded to Pinleaf Forge, fixed layouts, comprehensive synopsis |
| **2.0** | Feb 4, 2026 | Multi-header support (header_id), removed backend, pure client-side |
| **1.0** | Feb 2, 2026 | Initial release with backend API, basic pin matrix |

---

## 🎓 Learning Resources

### **For New AI Agents**

**Start Here**:
1. Read this file (AI-INSTRUCT.md)
2. Read README.md for user perspective
3. Open `platform-editor-v2.html` and trace workflow
4. Try creating a platform (ESP32-C3 or STM32F407)

**Key Concepts**:
- Platform ≠ Board (CPU specs vs physical layout)
- Multi-header support (J1, J2, J3...)
- Color-coded capabilities (visual hierarchy)
- AI-assisted workflow (prompt → JSON → import)

**Common Pitfalls**:
- Shrinking layout widths accidentally
- Breaking CSS numeric escapes (`.\35 V`, `.\33 V3`)
- Adding dependencies (keep standalone)
- Mixing platform and hwrev concepts

---

## ✅ Quality Checklist

Before committing changes:

- [ ] All input fields are full-width (`width: 100%`)
- [ ] JSON preview is full-width (`width: 100%`, `max-height: 400px`)
- [ ] Pin matrix columns have fixed widths (70, 70, 120, 140)
- [ ] Header row matches column widths
- [ ] Capability buttons have correct colors
- [ ] CSS numeric escapes are correct (`.\35 V`, `.\33 V3`)
- [ ] Drag & drop works
- [ ] Sorting works (single and multi-column)
- [ ] JSON import/export works
- [ ] No console errors
- [ ] Tested with 20+ pins
- [ ] Documentation updated (README.md, AI-INSTRUCT.md if needed)

---

## 🚀 Deployment

**Repository**: https://github.com/vctmasters1/PDS-Pinleaf-Forge

**GitHub Pages**: https://vctmasters1.github.io/PDS-Pinleaf-Forge/platform-editor-v2.html

**Deployment Steps**:
1. Push changes to `main` branch
2. GitHub Pages auto-deploys from `main` branch root
3. No build step required (pure HTML/CSS/JS)

**Testing Deployment**:
- Wait 1-2 minutes after push
- Clear browser cache
- Test live URL
- Check browser console for errors

---

**Last Updated**: February 4, 2026  
**Current Version**: 2.1  
**Status**: Production-ready, actively maintained  
**Authority**: AUTHORITATIVE for Pinleaf Forge project  
**Maintainer**: PDS Development Team

---

## 📞 Support & Contact

**GitHub Issues**: https://github.com/vctmasters1/PDS-Pinleaf-Forge/issues

**License**: MIT (see LICENSE file)

**Contributing**: Pull requests welcome! Follow coding guidelines above.