// Pinleaf Forge - AI Prompt Generation
// Generate research prompts for Copilot/ChatGPT

function generateResearchPrompt() {
    const platformName = document.getElementById('platformSearchInput').value.trim();
    if (!platformName) {
        alert('?? Please enter a platform name first');
        return;
    }

    const prompt = `Research the "${platformName}" microcontroller/processor platform and provide COMPLETE specifications in valid JSON format.

RETURN STRUCTURE (replace all values with accurate research data for ${platformName}):
{
  "id": "string - lowercase identifier with dashes (e.g., esp32c3, stm32f103c8)",
  "name": "string - Official product name from manufacturer",
  "website": "string - Manufacturer product page URL (e.g., https://www.espressif.com/en/products/socs/esp32-c3)",
  "sku": "string - SKU or part number (e.g., ESP32-C3-WROOM-02, STM32F103C8T6)",
  "description": "string - Brief description of platform and primary use cases",
  "architecture": "string - CPU architecture (e.g., ARM Cortex-M4, Xtensa, RISC-V, AVR)",
  "cores": "number - Actual number of CPU cores",
  "frequency_mhz": "number - Maximum clock frequency in MHz",
  "ram_kb": "number - Total RAM in kilobytes",
  "flash_kb": "number - Total Flash memory in kilobytes",
  "gpio_total": "number - Total number of GPIO pins on the dev board",
  "adc_channels": "number - Number of ADC channels available",
  "pwm_channels": "number - Number of PWM channels available",
  "wifi": "string - MUST be one of: 'none' | '802.11b/g/n' | '802.11b/g/n/ac' | 'WiFi 6' | 'WiFi 7'",
  "ble": "string - MUST be one of: 'none' | '5.0' | '5.1' | '5.2' | '5.3'",
  "supported_interfaces": "array - Communication protocols from: ['I2C', 'SPI', 'UART', 'CAN', 'I2S']",
  "usb_ports": "object - USB port counts like {'usb2': 2, 'usb3': 1}",
  "system_features": "array - System-level peripherals from: ['ethernet', 'sdcard', 'rtc', 'touchscreen', 'camera', 'display']",
  "toolchain": "string - Primary development toolchain (e.g., ESP-IDF, Arduino IDE, STM32CubeIDE, PlatformIO)",
  "notes": "string - Important specifications, limitations, or special features",
  "pin_capabilities": "array - ALL pins on the development board"
}

PIN CAPABILITIES FORMAT:
Each pin object must have:
- pin: number (0, 1, 2, etc.) - logical GPIO number
- header_id: string - Physical connector/header ID (e.g., "J1", "J2", "Main")
- physical_pin: string - Physical pin number on the board package
- group: string - Functional group from: ['Power', 'GPIO', 'Communication', 'Analog', 'Special']
- var_alias: string - Programming variable name (e.g., "led_status", "btn_start", "sensor_temp", "gPin1", "aPin1")
- name: string - Descriptive name like "GPIO0 / BOOT"
- capabilities: array - PIN-LEVEL electrical functions:
  ["GPIO", "ADC", "PWM", "UART", "RXD", "TXD", "SPI", "MISO", "MOSI", "SCK", "I2C", "SDA", "SCL", "CAN", "VIN", "GND", "3V3", "5V", "RESET", "RMT", "INTERRUPT"]

IMPORTANT - var_alias naming conventions:
- Use descriptive names that will become C/C++ symbols
- Follow existing code conventions if adapting firmware
- Recommended prefixes: g (GPIO), a (ADC), p (PWM), u (UART), i (I2C), s (SPI)
- Examples: "gLedStatus", "aTempSensor", "pMotorPwm", "LED_PIN", "SENSOR_ADC"

EXAMPLE PIN OBJECT:
{
  "pin": 0,
  "header_id": "J1",
  "physical_pin": "1",
  "group": "Special",
  "var_alias": "btn_boot",
  "name": "GPIO0 / BOOT",
  "capabilities": ["GPIO", "ADC", "RESET"]
}

Research "${platformName}" thoroughly and provide the complete, accurate JSON now.`;

    // Copy to clipboard
    navigator.clipboard.writeText(prompt).then(() => {
        document.getElementById('promptPreview').textContent = prompt;
        document.getElementById('generatedPromptArea').style.display = 'block';
        document.getElementById('generatedPromptArea').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }).catch(err => {
        console.error('Clipboard error:', err);
        alert('? Could not copy to clipboard. Please copy the prompt manually from the preview below.');
        document.getElementById('promptPreview').textContent = prompt;
        document.getElementById('generatedPromptArea').style.display = 'block';
    });
}
