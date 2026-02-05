# Platform Editor - Quick Reference Card

## 🚀 Get Started in 30 Seconds

### Step 1: Open Tool
```
Double-click: PDS-HwSpecs/platform-editor.html
```

### Step 2: Add Platform
```
Platform ID:     arduino-nano
Platform Name:   Arduino Nano (ATmega328P)
```

### Step 3: Use AI
```
Click: ✨ Ask AI to Fill Platform Info
→ Wait for spinner to finish
→ Form auto-fills with specs!
```

### Step 4: Save
```
Click: 📥 Save Platform
→ File downloads: platform-arduino-nano.json
```

### Step 5: Use in Project
```
Move file to: PDS-HwSpecs/platforms/arduino-nano.json
Now available in: PDS-HwPlatform/platform-editor-v2.html, build system
```

---

## 📋 Form Fields Explained

| Field | Example | Description |
|-------|---------|-------------|
| **Platform ID** | `arduino-nano` | Unique identifier (lowercase, hyphens only) |
| **Platform Name** | `Arduino Nano (ATmega328P)` | User-friendly name |
| **Description** | `8-bit AVR microcontroller...` | Brief overview |
| **Architecture** | `AVR` | CPU type (AVR, ARM, RISC-V, Xtensa) |
| **Cores** | `1` | Number of CPU cores |
| **Frequency (MHz)** | `16` | Operating frequency |
| **RAM (KB)** | `2` | Volatile memory |
| **Flash (KB)** | `30` | Program storage |
| **Total GPIO Pins** | `30` | Physical pins on chip |
| **Usable Pins** | `22` | Pins available for user |
| **ADC Channels** | `8` | Analog-to-digital converters |
| **PWM Channels** | `6` | Pulse-width modulation outputs |
| **WiFi Support** | `None` | 802.11, Dual-band, WiFi 6, or None |
| **Bluetooth LE** | `None` | 4.2, 5.0, 5.1, or None |
| **Build System** | `Arduino IDE` | Compiler/builder tool |
| **Compiler** | `avr-gcc` | C compiler executable |

---

## 🤖 AI Examples (Built-In)

These platforms auto-fill when clicked:

| Platform | AI Response |
|----------|-----------|
| **Arduino Nano** | ATmega328P, 16MHz, AVR, 2KB RAM, 30KB Flash |
| **Arduino Uno** | ATmega328P, 16MHz, AVR, 2KB RAM, 32KB Flash |
| **ESP32** | Xtensa, 240MHz, dual-core, 520KB RAM, 4MB Flash, WiFi, BLE |
| **EFR32MG24** | ARM Cortex-M4, 38MHz, 256KB RAM, 1MB Flash, BLE 5.1 |
| **STM32F4** | ARM Cortex-M4, 168MHz, 192KB RAM, 512KB Flash |

---

## ✅ Validation Rules

### Platform ID
- ✅ Lowercase only
- ✅ Hyphens allowed
- ✅ No spaces
- ✅ Example: `arduino-nano` ❌ `Arduino Nano`

### Required Fields (marked with *)
- ✅ All required fields must be filled
- ✅ Platform ID required
- ✅ Platform Name required
- ✅ Architecture required
- ✅ Numeric fields required

### Numeric Fields
- ✅ Must be positive integers
- ✅ Cores: 1-4 typical
- ✅ Frequency: 1-500 MHz typical
- ✅ RAM: 2-512 KB typical
- ✅ Flash: 16-8192 KB typical

---

## 🎨 UI Reference

### Colors
| Color | Meaning |
|-------|---------|
| 🟣 Purple | Primary actions (Save, Info) |
| 🔴 Red/Pink | AI button, special features |
| ⚪ Gray | Secondary actions (Reset, Cancel) |
| 🟦 Blue | Helpful hints and info boxes |

### Alerts
| Alert | Meaning |
|-------|---------|
| 🟩 Green box | ✅ Success (file saved) |
| 🟥 Red box | ❌ Error (fix and retry) |
| 🟦 Blue box | ℹ️ Info (AI thinking...) |

### Preview
| Section | Shows |
|---------|-------|
| 📄 JSON Preview | Real-time JSON structure |
| Auto-updates | When you type in fields |
| Copy-paste ready | Valid JSON format |

---

## 💡 Common Tasks

### Add a New Platform
```
1. Open platform-editor.html
2. Fill platform info
3. Click ✨ Ask AI (optional)
4. Save JSON
5. Move to PDS-HwSpecs/platforms/
```

### Edit Existing Platform
```
Option A (Recommended):
  1. Open platform-editor.html
  2. Fill all fields with existing specs
  3. Modify desired fields
  4. Save

Option B (Advanced):
  1. Edit JSON file directly in VS Code
  2. Validate against schema
  3. Save
```

### View Platform Specs
```
1. Open: PDS-HwSpecs/platforms/{id}.json
2. In VS Code: JSON with syntax highlighting
3. In browser: Hard to read (use Python to format)
```

### Share With Team
```
1. Save platforms/*.json files
2. Commit to Git repository
3. Team clones repo
4. Platforms auto-available
5. Everyone sees same specs
```

---

## 🐛 Troubleshooting

### File Won't Download
**Solution**: Check browser downloads settings. Try different browser.

### Form Won't Submit
**Solution**: Check red error alerts. Fill all required fields (*). Platform ID must be lowercase.

### AI Button Not Responding
**Solution**: Current version uses built-in examples. Check browser console for errors. Reload page.

### JSON Invalid
**Solution**: Check platform ID (no spaces). Ensure all required fields filled. Use provided examples as template.

### Can't Find Downloaded File
**Solution**: Check browser Downloads folder. Default: `C:\Users\[username]\Downloads\`

---

## 🔗 Links

| Resource | Location |
|----------|----------|
| **Tool** | `PDS-HwSpecs/platform-editor.html` |
| **Quick Start** | `PDS-HwSpecs/PLATFORM-EDITOR-QUICKSTART.md` |
| **Full Docs** | `PDS-HwSpecs/PLATFORM-EDITOR-README.md` |
| **Technical** | `PDS-HwSpecs/PLATFORM-EDITOR-IMPLEMENTATION.md` |
| **Workflow** | `WORKFLOW-FOR-DUMMIES.md` |
| **Overview** | `PLATFORM-EDITOR-DELIVERY.md` |

---

## 📱 Browser Support

✅ **Works On**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS, Android)

✅ **Responsive**:
- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

---

## 🎯 Workflow Position

```
1. 👉 Define Platform (YOU ARE HERE)
   ↓
2. Design Hardware (PDS-HwRevEditor)
   ↓
3. Write Automation (LadderLogicEditor)
   ↓
4. Compile Firmware (Device/)
   ↓
5. Upload to Device
   ↓
6. Test & Monitor (Android app)
```

---

## ⚡ Pro Tips

### Tip 1: Use AI First
- Always try ✨ Ask AI button first
- Saves typing
- Gets accurate specs

### Tip 2: Copy From Datasheet
- Don't have exact specs?
- Search "[Platform] datasheet"
- Fill numbers from PDF
- Validate against known platforms

### Tip 3: Template Approach
- Use existing platform as template
- Modify fields you need to change
- Keep others from working platform

### Tip 4: Validate Early
- Red error boxes catch problems immediately
- Fix before saving
- Prevents invalid JSON

### Tip 5: Preview Before Save
- JSON preview updates live
- Review structure before download
- Understand output format

---

## 📊 Example Outputs

### Arduino Nano (ATmega328P)
```json
{
  "platform_id": "arduino-nano",
  "platform_name": "Arduino Nano (ATmega328P)",
  "specifications": {
    "cpu": {
      "architecture": "AVR",
      "cores": 1,
      "frequency_mhz": 16
    },
    "memory": {
      "ram_kb": 2,
      "flash_kb": 30
    },
    "gpio": {
      "total_pins": 30,
      "usable_pins": 22
    },
    "adc": {
      "channels": 8,
      "resolution_bits": 10
    },
    "pwm": {
      "channels": 6,
      "resolution_bits": 8
    },
    "connectivity": {
      "wifi": false,
      "ble": false
    },
    "build_system": {
      "system": "Arduino IDE",
      "compiler": "avr-gcc"
    }
  }
}
```

---

## 🎓 Learning Path

**5 Minutes**:
- Read this card
- Open platform-editor.html
- Try "Arduino Nano" + AI button

**15 Minutes**:
- Read PLATFORM-EDITOR-QUICKSTART.md
- Try different platforms
- Save a few JSON files

**30 Minutes**:
- Read PLATFORM-EDITOR-README.md
- Understand form fields
- Learn validation rules

**1 Hour**:
- Read PLATFORM-EDITOR-IMPLEMENTATION.md
- Understand AI architecture
- Explore production options

---

## ✨ That's It!

You now know everything needed to add platforms!

**Next Step**: Open `PDS-HwSpecs/platform-editor.html` and create your first platform 🚀

---

**Quick Links**:
- 📖 Full Docs: [PLATFORM-EDITOR-README.md](PDS-HwSpecs/PLATFORM-EDITOR-README.md)
- ⚡ Quick Start: [PLATFORM-EDITOR-QUICKSTART.md](PDS-HwSpecs/PLATFORM-EDITOR-QUICKSTART.md)
- 🎯 Workflow: [WORKFLOW-FOR-DUMMIES.md](WORKFLOW-FOR-DUMMIES.md)

**Questions?** Check troubleshooting section above or see documentation.
