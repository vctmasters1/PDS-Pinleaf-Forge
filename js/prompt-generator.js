// Pinleaf Forge - AI Research Prompt Generator

function generateResearchPrompt() {
    const platformName = document.getElementById('platformSearchInput').value.trim();
    
    if (!platformName) {
        alert('?? Please enter a platform name first');
        return;
    }
    
    // Collect peripheral counts
    const peripherals = {
        hx711: parseInt(document.getElementById('hx711Count').value) || 0,
        phAdc: parseInt(document.getElementById('phAdcCount').value) || 0,
        ecTds: parseInt(document.getElementById('ecTdsCount').value) || 0,
        tmc2209: parseInt(document.getElementById('tmc2209Count').value) || 0,
        tmc2130: parseInt(document.getElementById('tmc2130Count').value) || 0,
        drv8825: parseInt(document.getElementById('drv8825Count').value) || 0,
        sensor5v: parseInt(document.getElementById('sensor5vCount').value) || 0,
        sensor3v3: parseInt(document.getElementById('sensor3v3Count').value) || 0,
        analogSensor: parseInt(document.getElementById('analogSensorCount').value) || 0,
        relay: parseInt(document.getElementById('relayCount').value) || 0,
        mosfet: parseInt(document.getElementById('mosfetCount').value) || 0,
        servo: parseInt(document.getElementById('servoCount').value) || 0
    };
    
    // Build peripheral requirements string
    let peripheralText = '';
    const peripheralList = [];
    
    if (peripherals.hx711 > 0) peripheralList.push(`- ${peripherals.hx711}x HX711 load cell amplifier (requires 2 GPIO each: DOUT, SCK)`);
    if (peripherals.phAdc > 0) peripheralList.push(`- ${peripherals.phAdc}x PH-ADC sensor (requires 1 ADC channel each)`);
    if (peripherals.ecTds > 0) peripheralList.push(`- ${peripherals.ecTds}x EC/TDS sensor (requires 1 ADC channel each)`);
    if (peripherals.tmc2209 > 0) peripheralList.push(`- ${peripherals.tmc2209}x TMC2209 stepper driver (UART mode: 2 GPIO for RX/TX, or SPI mode: 4 GPIO)`);
    if (peripherals.tmc2130 > 0) peripheralList.push(`- ${peripherals.tmc2130}x TMC2130 stepper driver (SPI mode: shared MOSI/MISO/SCK + 1 CS per driver)`);
    if (peripherals.drv8825 > 0) peripheralList.push(`- ${peripherals.drv8825}x DRV8825 stepper driver (requires 2 GPIO each: STEP, DIR)`);
    if (peripherals.sensor5v > 0) peripheralList.push(`- ${peripherals.sensor5v}x 5V digital sensors (requires 5V-tolerant GPIO or level shifter)`);
    if (peripherals.sensor3v3 > 0) peripheralList.push(`- ${peripherals.sensor3v3}x 3.3V digital sensors (requires GPIO)`);
    if (peripherals.analogSensor > 0) peripheralList.push(`- ${peripherals.analogSensor}x analog sensors (requires ADC channels)`);
    if (peripherals.relay > 0) peripheralList.push(`- ${peripherals.relay}x relays (requires 1 GPIO each, active high or low)`);
    if (peripherals.mosfet > 0) peripheralList.push(`- ${peripherals.mosfet}x MOSFET switches (requires 1 GPIO each, PWM capable preferred)`);
    if (peripherals.servo > 0) peripheralList.push(`- ${peripherals.servo}x servo motors (requires PWM-capable GPIO)`);
    
    if (peripheralList.length > 0) {
        peripheralText = `\n\n## Peripheral Requirements\nThe following peripherals/sensors will be connected to this platform:\n${peripheralList.join('\n')}\n\nPlease ensure the platform has sufficient GPIO, ADC, PWM, UART, and SPI pins to support these peripherals.`;
    }
    
    const prompt = `I need complete hardware specifications for the "${platformName}" microcontroller/processor platform in JSON format for my embedded platform specification editor.

Please provide a comprehensive JSON object with the following structure:

\`\`\`json
{
  "id": "lowercase-platform-id",
  "name": "Official Platform Name",
  "website": "manufacturer website URL",
  "sku": "part number or SKU",
  "description": "Brief description of the platform and use cases",
  "architecture": "CPU architecture name",
  "cores": <number>,
  "frequency_mhz": <number>,
  "ram_kb": <number>,
  "flash_kb": <number>,
  "gpio_total": <number>,
  "adc_channels": <number>,
  "pwm_channels": <number>,
  "wifi": "specification or none",
  "ble": "version or none",
  "supported_interfaces": ["array of interfaces"],
  "usb_ports": {
    "usb1": <count>,
    "usb2": <count>,
    "usb3": <count>,
    "usb4": <count>
  },
  "system_features": ["array of features"],
  "toolchain": "Primary development toolchain",
  "notes": "Important details",
  "pin_capabilities": [
    {
      "pin": <gpio_number or -1 for power>,
      "header_id": "header identifier",
      "physical_pin": "physical pin number",
      "group": "functional group name",
      "var_alias": "variable_alias_name",
      "name": "Full pin name",
      "capabilities": ["array of capabilities"]
    }
  ]
}
\`\`\`

## Critical Requirements:

### 1. Pin Capabilities
- **Include ALL pins** on the development board (power, ground, GPIO, communication)
- **header_id**: Use "J1" for main header, "J2", "J3" for additional headers
- **physical_pin**: Physical pin number on board (1, 2, 3... or PA0, PB1, etc.)
- **pin**: GPIO number (use -1 for power/ground pins like VIN, GND, 3V3, 5V)

### 2. group Field (Functional Grouping)
The **group** field should reflect the **actual function/peripheral** the pin serves, NOT generic categories.

**Power Pins:**
- \`Power\` - For VIN, 5V, 3V3, GND pins

**Peripheral/Function-Based Groups (PREFERRED):**
- \`I2C\` - I2C bus pins (SDA, SCL)
- \`SPI\` - SPI bus pins (MOSI, MISO, SCK, CS)
- \`UART\` - UART pins (TX, RX)
- \`CAN\` - CAN bus pins
- \`ADC\` - Analog input pins (sensors, voltage dividers)
- \`PWM\` - PWM output pins (motors, LEDs, servos)
- \`Stepper_1\`, \`Stepper_2\` - Pins for specific stepper motors
- \`HX711_1\`, \`HX711_2\` - Pins for specific load cell amplifiers
- \`PH_Sensor\` - PH sensor ADC pins
- \`EC_Sensor\` - EC/TDS sensor pins
- \`Relay\` - Relay control pins
- \`LED\` - LED indicator pins
- \`Button\` - Button input pins
- \`GPIO\` - General purpose (only if no specific function assigned)
- \`Special\` - Reset, boot, enable pins

**Examples:**
- GPIO2 connected to I2C SDA ? group: \`I2C\`
- GPIO4 reading PH sensor ? group: \`PH_Sensor\`
- GPIO10 controlling stepper 1 step pin ? group: \`Stepper_1\`
- GPIO15 driving relay ? group: \`Relay\`
- Generic unassigned GPIO ? group: \`GPIO\`

### 3. var_alias Naming Convention (CRITICAL)
Use **strict prefix-based naming** with underscores:

**Power Pins:**
- \`pwr_vin\` - Input voltage
- \`pwr_5v\` - 5V output
- \`pwr_3v3\` - 3.3V output
- \`pwr_gnd\` - Ground (can suffix with number: pwr_gnd1, pwr_gnd2)

**ADC/Analog Pins:**
- \`adc_<name>\` - Analog input (e.g., \`adc_temp\`, \`adc_ph\`, \`adc_ch0\`)

**PWM Pins:**
- \`pwm_<name>\` - PWM output (e.g., \`pwm_motor\`, \`pwm_led\`, \`pwm_ch0\`)

**I2C Pins:**
- \`i2c_sda\` or \`i2c_sda0\` - I2C data line
- \`i2c_scl\` or \`i2c_scl0\` - I2C clock line
- \`i2c1_sda\`, \`i2c1_scl\` - Second I2C bus

**SPI Pins:**
- \`spi_mosi\` or \`spi0_mosi\` - Master Out Slave In
- \`spi_miso\` or \`spi0_miso\` - Master In Slave Out
- \`spi_sck\` or \`spi0_sck\` - Clock
- \`spi_cs\` or \`spi_cs0\` - Chip Select (number for multiple)

**UART Pins:**
- \`uart_tx\` or \`uart0_tx\` - Transmit
- \`uart_rx\` or \`uart0_rx\` - Receive
- \`uart1_tx\`, \`uart1_rx\` - Second UART

**GPIO/Digital Pins:**
- \`gpio_<name>\` - General purpose (e.g., \`gpio_led\`, \`gpio_btn\`, \`gpio_relay\`)
- \`dio_<name>\` - Digital I/O (e.g., \`dio_sensor\`, \`dio_switch\`)

**Special Pins:**
- \`rst\` - Reset pin
- \`boot\` - Boot mode select
- \`en\` - Enable pin

**HX711 Specific (if peripherals selected):**
- \`hx_dout0\`, \`hx_sck0\` - First HX711
- \`hx_dout1\`, \`hx_sck1\` - Second HX711

**Stepper Driver Specific:**
- \`step0_step\`, \`step0_dir\` - First stepper
- \`step1_step\`, \`step1_dir\` - Second stepper

**Examples:**
- GPIO2 with I2C: group=\`I2C\`, var_alias=\`i2c_sda\`
- GPIO4 with ADC for PH: group=\`PH_Sensor\`, var_alias=\`adc_ph\`
- GPIO10 for stepper: group=\`Stepper_1\`, var_alias=\`step0_step\`

### 4. Pin Capabilities Array
Available options:
- Power: VIN, 5V, 3V3, GND
- Digital: GPIO, DIO, INTERRUPT
- Analog: ADC, PWM
- Communication: UART, RXD, TXD, SPI, MISO, MOSI, SCK, I2C, SDA, SCL, CAN
- Special: RESET, RMT, BOOT
${peripheralText}

Please research the official datasheet for "${platformName}" and provide accurate specifications. Return ONLY the JSON object with no additional explanation or markdown formatting outside the JSON.`;

    // Copy to clipboard
    navigator.clipboard.writeText(prompt).then(() => {
        // Show the generated prompt area
        document.getElementById('generatedPromptArea').style.display = 'block';
        document.getElementById('promptPreview').textContent = prompt;
        
        // Scroll to the prompt area
        document.getElementById('generatedPromptArea').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }).catch(err => {
        alert('? Failed to copy to clipboard. Please copy manually.');
        console.error('Clipboard error:', err);
    });
}
