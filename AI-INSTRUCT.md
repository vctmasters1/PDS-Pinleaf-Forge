# AI-INSTRUCT: Pinleaf Forge

**Project Name**: ⚡ Pinleaf Forge - Embedded Platform Specification Editor

**Repository**: https://github.com/vctmasters1/PDS-Pinleaf-Forge

**Location**: `K:\PDS_AutomationSuite\PDS-HwPlatform`

**Live Demo**: https://vctmasters1.github.io/PDS-Pinleaf-Forge/platform-editor-v2.html

**Authority Level**: DEEP (Authoritative for hardware platform specifications)

**Technology Stack**: Pure HTML/CSS/JavaScript (modular, no dependencies, no build tools)

**Current Version**: 2.2 (February 4, 2026)

---

## 🎯 Project Purpose

**Pinleaf Forge** is an open-source, web-based tool for defining and visualizing microcontroller/processor platform specifications. It enables embedded developers, hobbyists, and hardware teams to:

1. **Define platform specifications** - CPU architecture, RAM, flash, GPIO, wireless capabilities
2. **Map pin capabilities** - Visual matrix with multi-header support (J1, J2, J3...)
3. **Variable aliasing** - Programming-friendly pin names (var_alias) for code generation
4. **Generate pinout diagrams** - Printable "pinout leaf" overlays for dev boards
5. **Export structured JSON** - Ready for databases, code generation, PlatformIO, Wokwi

**Key Differentiator**: AI-assisted workflow using Copilot/ChatGPT prompts to auto-populate hardware specifications, eliminating manual datasheet hunting.

---

## 🏗️ Architecture Overview (v2.2)

### **Modular Structure** ✨

**Both tools now use modular architecture:**

#### **Platform Editor** (`platform-editor-v2.html`)
- **HTML**: 600 lines - Structure only
- **CSS**: `css/platform-editor.css` (700 lines)
- **JavaScript**: 5 modules in `js/` (900 lines total)

#### **Pinout Leaf Generator** (`pinout-leaf-generator-v2.html`) ✨ NEW
- **HTML**: 180 lines - Structure only
- **CSS**: `css/pinout-generator.css` (200 lines)
- **JavaScript**: 5 modules in `js/` (330 lines total)

### **JavaScript Modules**

**Platform Editor Modules:**

| Module | Lines | Responsibility |
|--------|-------|----------------|
| `platform-editor-core.js` | 50 | Global state, constants, event listeners |
| `prompt-generator.js` | 100 | AI prompt generation with var_alias |
| `json-handler.js` | 150 | Import/Export JSON, pinout generator link |
| `pin-matrix.js` | 350 | Pin rows, drag-drop, sorting |
| `data-collector.js` | 250 | Data collection, preview updates |

**Pinout Generator Modules:** ✨ NEW

| Module | Lines | Responsibility |
|--------|-------|----------------|
| `pinout-generator-core.js` | 30 | Global state, auto-load from sessionStorage |
| `pinout-json-handler.js` | 20 | Import JSON, populate form |
| `pinout-svg-generator.js` | 180 | SVG generation with proper grouping |
| `pinout-ui-controller.js` | 40 | Preview updates, header buttons |
| `pinout-download-handler.js` | 60 | Download SVG/PDF with file organization |

**Loading Order** (CRITICAL):
```html
<!-- Platform Editor -->
<script src="js/platform-editor-core.js"></script>      <!-- Load first -->
<script src="js/prompt-generator.js"></script>
<script src="js/json-handler.js"></script>
<script src="js/pin-matrix.js"></script>
<script src="js/data-collector.js"></script>

<!-- Pinout Generator -->
<script src="js/pinout-generator-core.js"></script>     <!-- Load first -->
<script src="js/pinout-json-handler.js"></script>
<script src="js/pinout-svg-generator.js"></script>
<script src="js/pinout-ui-controller.js"></script>
<script src="js/pinout-download-handler.js"></script>
```

### **Why Modular Architecture?**

✅ **Maintainability** - Each file <400 lines, single responsibility  
✅ **Debuggable** - Console shows which file has errors  
✅ **Collaborative** - Multiple developers can work on different modules  
✅ **Performance** - Browser caches individual modules  
✅ **GitHub Pages Compatible** - No build process required  

### **Legacy Backups**

- `platform-editor-v2-legacy.html` (2,800 lines) - Monolithic backup
- `pinout-leaf-generator-legacy.html` (700 lines) - Monolithic backup

---

## 📂 File Structure (v2.2)

```
PinleafForge/
├── platform-editor-v2.html           # Main editor (600 lines - HTML only) ✨
├── platform-editor-v2-legacy.html    # Backup (2800 lines - monolithic)
├── pinout-leaf-generator.html        # Pinout diagram generator
├── README.md                          # User documentation
├── AI-INSTRUCT.md                     # This file (AI agent guide)
├── LICENSE                            # MIT license
├── .gitignore                         # Git exclusions
│
├── css/                               # ✨ NEW - Stylesheets
│   └── platform-editor.css           # All styles (700 lines)
│
├── js/                                # ✨ NEW - JavaScript modules
│   ├── platform-editor-core.js       # Core state (50 lines)
│   ├── prompt-generator.js           # AI prompts (100 lines)
│   ├── json-handler.js               # Import/Export (150 lines)
│   ├── pin-matrix.js                 # Pin matrix (350 lines)
│   └── data-collector.js             # Data collection (250 lines)
│
├── platforms/                         # Platform JSON files ✨ UPDATED
│   ├── esp32c3/
│   │   ├── esp32c3.json              # Platform specification
│   │   └── esp32c3_J1_pinout.svg     # Pinout diagram
│   ├── renesas-ra6m5/
│   │   ├── renesas-ra6m5.json
│   │   ├── renesas-ra6m5_J1_pinout.svg
│   │   └── renesas-ra6m5_J2_pinout.svg
│   └── stm32f407/
│       ├── stm32f407.json
│       └── stm32f407_J1_pinout.svg
│
├── hwrev/                             # Board revision configs
│   └── h2o_001/
│       └── hwrev-config.json
│
└── .local_mds/                        # Internal dev docs
    ├── MODULAR-STRUCTURE.md           # Migration guide
    ├── VAR-ALIAS-FEATURE.md           # var_alias docs
    ├── PLATFORM-FILE-ORGANIZATION.md  # ✨ NEW - File organization guide
    ├── HEADER-ID-FEATURE.md
    ├── GITHUB-PAGES-SETUP.md
    └── ...
```

**Note**: Platform files are now organized in subdirectories by platform name/ID. See [PLATFORM-FILE-ORGANIZATION.md](./.local_mds/PLATFORM-FILE-ORGANIZATION.md) for details.

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
      "var_alias": "vin_power",
      "name": "VIN",
      "capabilities": ["VIN"]
    },
    {
      "pin": 2,
      "header_id": "J1",
      "physical_pin": "3",
      "group": "Communication",
      "var_alias": "i2c_sda",
      "name": "GPIO2 / ADC1_CH2 / SDA",
      "capabilities": ["GPIO", "ADC", "I2C", "SDA"]
    }
  ]
}
```

**Key Fields (v2.2)**:
- `id`: Lowercase identifier (e.g., `esp32c3`, `stm32f407`)
- `pin_capabilities`: Array of pin definitions with:
  - `pin`: Logical GPIO number (0-based index)
  - `header_id`: Connector ID (J1, J2, Main, etc.) - **Added v2.0**
  - `physical_pin`: Physical pin number on board (1, PA0, D2, etc.)
  - `group`: Functional group (Power, GPIO, Communication, Analog, Special)
  - `var_alias`: Programming variable name - **Added v2.2** ✨ NEW
  - `name`: Descriptive name (e.g., "GPIO0 / BOOT", "VIN")
  - `capabilities`: Array of electrical functions

**var_alias Field** ✨ NEW in v2.2:
- Programming-friendly variable name for code generation
- Future use: Will become C/C++ `#define` symbols
- Naming conventions:
  - Prefix-based: `gPin1` (GPIO), `aPin1` (ADC), `pPin1` (PWM)
  - Descriptive: `led_status`, `btn_start`, `sensor_temp`
  - Existing code compatibility: Use existing symbol names

**Capabilities** (Pin-Level Functions):
- **Power**: VIN, GND, 3V3, 5V
- **Digital I/O**: GPIO, DIO, INTERRUPT
- **Analog**: ADC, PWM
- **Communication**: UART, RXD, TXD, SPI, MISO, MOSI, SCK, I2C, SDA, SCL, CAN
- **Special**: RESET, RMT

---

## 🔄 Workflow

### **Typical User Journey**

1. **Research Phase**
   - User enters platform name (e.g., "ESP32-C3")
   - Click "📋 Generate & Copy Prompt"
   - Paste prompt in Copilot Chat / ChatGPT
   - Copilot returns complete JSON specification (includes var_alias)

2. **Import Phase**
   - Paste JSON in "📥 Import Copilot's JSON Response"
   - Click "📥 Import JSON & Fill Form"
   - All fields auto-populated (platform specs, pin matrix, var_alias)

3. **Edit Phase**
   - Review auto-filled data
   - Adjust pin names, groups, headers, **var_alias** as needed
   - Toggle capability buttons (color-coded)
   - Drag & drop to reorder pins
   - Sort by Header, Physical, Group, Var Alias, or Name

4. **Export Phase**
   - Click "⬇️ Download as JSON"
   - Save to `platforms/<id>.json` (timestamped filename)
   - Optionally: "📄 Generate Pinout Leaf" for diagrams

### **Multi-Header Support** (v2.0+)

**Use Case**: Boards with multiple connectors (J1, J2, J3...)

**Example**: Raspberry Pi
- J1: 40-pin GPIO header
- J2: Camera connector (CSI)
- J3: Display connector (DSI)
- J4: Power input

**Workflow**:
1. Edit "Header" column for each pin (e.g., J1, J2, J3)
2. Sort by Header + Physical Pin (`1,4` in multi-column sort)
3. Pinout Leaf Generator creates separate diagrams per header

---

## 🛠️ Development Guidelines

### **When Editing Code**

**DO**:
- ✅ Maintain modular structure (HTML/CSS/JS separation)
- ✅ Keep fixed column widths (70px header, 120px group, 120px var_alias, 70px physical, 140px name)
- ✅ Test all JavaScript modules load in correct order
- ✅ Check browser console for errors (F12)
- ✅ Preserve color-coded capability buttons
- ✅ Maintain drag & drop functionality
- ✅ Test with 20+ pin rows to verify scrolling
- ✅ Update version number in AI-INSTRUCT.md when making changes

**DON'T**:
- ❌ Add inline styles or scripts (use external files)
- ❌ Change script loading order (breaks dependencies)
- ❌ Shrink input field widths (must stay 100%)
- ❌ Add npm packages or build tools (keep standalone)
- ❌ Break JSON import/export compatibility
- ❌ Remove legacy backup file (platform-editor-v2-legacy.html)

### **CSS Architecture**

**File**: `css/platform-editor.css`

**Organized Sections**:
```css
/* BASE STYLES */
/* LAYOUT CONTAINERS */
/* FORM SECTIONS */
/* FORM INPUTS */
/* GRID LAYOUT */
/* BUTTONS */
/* JSON PREVIEW */
/* NOTIFICATIONS */
/* PIN MATRIX - LAYOUT */
/* PIN MATRIX - DRAG HANDLE */
/* PIN MATRIX - DELETE BUTTON */
/* PIN MATRIX - EDITABLE FIELDS */
/* PIN MATRIX - SORTABLE HEADERS */
/* CAPABILITY BUTTONS - CONTAINER */
/* CAPABILITY BUTTONS - BASE STYLES */
/* CAPABILITY BUTTONS - POWER PINS */
/* CAPABILITY BUTTONS - SPECIAL PINS */
/* CAPABILITY BUTTONS - GPIO */
/* CAPABILITY BUTTONS - ANALOG */
/* CAPABILITY BUTTONS - UART */
/* CAPABILITY BUTTONS - SPI */
/* CAPABILITY BUTTONS - I2C */
/* CAPABILITY BUTTONS - CAN */
/* SYSTEM FEATURE TOGGLE BUTTONS */
```

**Critical Column Widths** (DO NOT CHANGE without updating all references):
```css
.pin-header { width: 70px; min-width: 70px; max-width: 70px; }
.pin-group { width: 120px; min-width: 120px; max-width: 120px; }
.pin-var-alias { width: 120px; min-width: 120px; max-width: 120px; }
.pin-physical { width: 70px; min-width: 70px; max-width: 70px; }
.pin-label { width: 140px; min-width: 140px; max-width: 140px; }
```

### **JavaScript Module Architecture**

#### **1. platform-editor-core.js** (50 lines)
**Purpose**: Global state and initialization

**Exports**:
- `form` - Reference to main form element
- `pin_capabilities` - Array of pin data
- `ALL_CAPABILITIES` - Available pin functions
- `PIN_GROUPS` - Available functional groups
- `currentSortColumn`, `currentSortDirection` - Sort state

**Event Listeners**:
- `form.addEventListener('input', updatePreview)`
- `form.addEventListener('change', updatePreview)`

#### **2. prompt-generator.js** (100 lines)
**Purpose**: AI-assisted prompt generation

**Functions**:
- `generateResearchPrompt()` - Creates prompt with var_alias field
- Clipboard API integration
- Prompt template with complete JSON structure

**Dependencies**: None (standalone)

#### **3. json-handler.js** (150 lines)
**Purpose**: Import and export JSON data

**Functions**:
- `parseAndFillForm()` - Import JSON, populate form and pin matrix
- `downloadJSON()` - Export with timestamped filename
- `openPinoutLeafGenerator()` - Pass data via sessionStorage

**Dependencies**: 
- `populatePinCapabilities()` from data-collector.js
- `generatePinRows()` from pin-matrix.js

#### **4. pin-matrix.js** (350 lines)
**Purpose**: Pin matrix management

**Functions**:
- `generatePinRows()` - Create pin matrix
- `createPinRow(pinNum)` - Create individual pin row
- `addPinRow()` - Add new pin row
- `sortPins(column)` - Single-column sort
- `multiColumnSort(columns)` - Multi-column sort
- `showSortOptions()` - Sort UI dialog
- Drag-and-drop handlers

**Dependencies**: 
- `updatePreview()` from data-collector.js
- `ALL_CAPABILITIES` from platform-editor-core.js

#### **5. data-collector.js** (250 lines)
**Purpose**: Data collection and preview

**Functions**:
- `toggleSystemFeature(button)` - Toggle system feature buttons
- `getSystemFeatures()` - Collect system features
- `getCommunicationInterfaces()` - Collect communication interfaces
- `getUsbPorts()` - Collect USB port counts
- `populatePinCapabilities()` - Extract pin data from UI
- `updatePreview()` - Update JSON preview
- `updateQuickPinoutPreview(data)` - Update SVG preview
- `generateQuickPinoutSVG(data)` - Generate SVG diagram

**Dependencies**: None (leaf module)

---

## 🔍 Common Tasks for AI Agents

### **Task: Add New Capability Button**

**Steps**:
1. Edit `js/platform-editor-core.js`:
   ```javascript
   const ALL_CAPABILITIES = [..., 'NEW_CAP'];
   ```

2. Edit `css/platform-editor.css`:
   ```css
   .capability-btn.NEW_CAP.active {
       background: #color;
       border-color: #color;
       color: white;
   }
   ```

3. Edit `js/prompt-generator.js` (if needed):
   - Add to capability list in prompt template

4. Test: Generate pin rows, toggle new button, verify color

### **Task: Fix Layout Issue**

**Steps**:
1. Check `css/platform-editor.css` for column widths
2. Verify HTML header row matches CSS widths
3. Test with 20+ pins to ensure alignment
4. Check browser console (F12) for errors
5. Clear browser cache and reload

### **Task: Add New JavaScript Function**

**Decision Tree**:
- **UI State/Global** → `platform-editor-core.js`
- **AI Prompts** → `prompt-generator.js`
- **Import/Export** → `json-handler.js`
- **Pin Matrix** → `pin-matrix.js`
- **Data Collection** → `data-collector.js`

**Steps**:
1. Choose appropriate module
2. Add function with JSDoc comment
3. Update dependencies if needed
4. Test in browser (F12 console)
5. Update MODULAR-STRUCTURE.md if significant

### **Task: Update Styling**

**Steps**:
1. Edit `css/platform-editor.css`
2. Find appropriate section (use comments)
3. Add/modify styles
4. Test in browser with hard refresh (Ctrl+F5)
5. Verify no layout shifts

---

## ✅ Quality Checklist

Before committing changes:

- [ ] **Modular Structure**: No inline styles or scripts in HTML
- [ ] **Script Loading**: Correct order in HTML (core → prompt → json → pin-matrix → data-collector)
- [ ] **CSS Organization**: Changes in appropriate section with comments
- [ ] **Column Widths**: Fixed widths maintained (70, 120, 120, 70, 140)
- [ ] **Browser Console**: No errors (F12)
- [ ] **Functionality**: All features work (prompt, import, export, sort, drag-drop)
- [ ] **Testing**: Tested with 20+ pins
- [ ] **Documentation**: README.md and AI-INSTRUCT.md updated if needed
- [ ] **Backup**: Legacy file (platform-editor-v2-legacy.html) preserved
- [ ] **Version**: Version number updated in AI-INSTRUCT.md

---

## 🚀 Deployment

**Repository**: https://github.com/vctmasters1/PDS-Pinleaf-Forge

**GitHub Pages**: https://vctmasters1.github.io/PDS-Pinleaf-Forge/platform-editor-v2.html

**Deployment Steps**:
1. Test locally in browser
2. Commit changes to Git
3. Push to `main` branch
4. GitHub Pages auto-deploys (1-2 minutes)
5. Test live URL with cache cleared

**File Serving**:
- HTML: `platform-editor-v2.html`
- CSS: `css/platform-editor.css`
- JS: `js/*.js` (all modules)
- All served as static files (no build process)

---

## 📝 Version History

| Version | Date | Key Changes |
|---------|------|-------------|
| **2.2** | Feb 4, 2026 | Modular architecture (CSS/JS separated), var_alias field |
| **2.1** | Feb 4, 2026 | Rebranded to Pinleaf Forge, fixed layouts |
| **2.0** | Feb 4, 2026 | Multi-header support (header_id), removed backend |
| **1.0** | Feb 2, 2026 | Initial release |

---

## 🎓 Learning Resources

### **For New AI Agents**

**Start Here**:
1. Read this file (AI-INSTRUCT.md) - AUTHORITATIVE
2. Read README.md for user perspective
3. Read `.local_mds/MODULAR-STRUCTURE.md` for migration guide
4. Read `.local_mds/VAR-ALIAS-FEATURE.md` for var_alias feature
5. Open `platform-editor-v2.html` and trace workflow
6. Check `js/` modules to understand code organization

**Key Concepts**:
- **Modular Architecture**: HTML/CSS/JS separation
- **Platform ≠ Board**: CPU specs vs physical layout
- **Multi-header Support**: J1, J2, J3... connectors
- **var_alias**: Programming-friendly pin names
- **Color-coded Capabilities**: Visual hierarchy
- **AI-assisted Workflow**: Prompt → JSON → Import

**Common Pitfalls**:
- Loading scripts in wrong order (breaks dependencies)
- Adding inline styles/scripts (breaks modularity)
- Changing column widths without updating all references
- Breaking CSS numeric escapes (`.\35 V`, `.\33 V3`)
- Adding build tools or npm packages

---

## 📞 Support & Contact

**GitHub Issues**: https://github.com/vctmasters1/PDS-Pinleaf-Forge/issues

**License**: MIT (see LICENSE file)

**Contributing**: Pull requests welcome! Follow coding guidelines above.

---

**Last Updated**: February 4, 2026  
**Current Version**: 2.2  
**Status**: Production-ready, modular architecture  
**Authority**: AUTHORITATIVE for Pinleaf Forge project  
**Maintainer**: PDS Development Team