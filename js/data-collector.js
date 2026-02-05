// Pinleaf Forge - Data Collection and Preview
// Collect form data and update JSON preview

function toggleSystemFeature(button) {
    button.classList.toggle('active');
    updatePreview();
}

function getSystemFeatures() {
    const features = [];
    document.querySelectorAll('.feature-toggle-btn.active').forEach(btn => {
        features.push(btn.dataset.feature);
    });
    return features;
}

function getCommunicationInterfaces() {
    const interfaces = [];
    const commButtons = document.querySelectorAll('.feature-toggle-btn[data-feature="i2c"], .feature-toggle-btn[data-feature="spi"], .feature-toggle-btn[data-feature="uart"], .feature-toggle-btn[data-feature="can"], .feature-toggle-btn[data-feature="i2s"]');
    commButtons.forEach(btn => {
        if (btn.classList.contains('active')) {
            interfaces.push(btn.dataset.feature.toUpperCase());
        }
    });
    return interfaces;
}

function getUsbPorts() {
    const usb = {};
    const usb1 = parseInt(document.getElementById('usb1Count').value) || 0;
    const usb2 = parseInt(document.getElementById('usb2Count').value) || 0;
    const usb3 = parseInt(document.getElementById('usb3Count').value) || 0;
    const usb4 = parseInt(document.getElementById('usb4Count').value) || 0;

    if (usb1 > 0) usb['usb1'] = usb1;
    if (usb2 > 0) usb['usb2'] = usb2;
    if (usb3 > 0) usb['usb3'] = usb3;
    if (usb4 > 0) usb['usb4'] = usb4;

    return Object.keys(usb).length > 0 ? usb : null;
}

function populatePinCapabilities() {
    const capabilities = [];
    const activeButtons = document.querySelectorAll('.capability-btn.active');
    
    // Group by pin
    const pinMap = {};
    activeButtons.forEach(btn => {
        const pin = parseInt(btn.dataset.pin);
        const cap = btn.dataset.capability;
        
        if (!pinMap[pin]) {
            pinMap[pin] = {
                pin: pin,
                header_id: null,
                physical_pin: null,
                group: null,
                var_alias: null,
                name: null,
                capabilities: []
            };
        }
        pinMap[pin].capabilities.push(cap);
    });

    // Get pin names and physical pins from labels
    document.querySelectorAll('.pin-label').forEach(label => {
        const pin = parseInt(label.dataset.pin);
        const name = label.textContent.trim();
        
        // Get corresponding physical pin
        const physicalEl = label.parentElement.querySelector('.pin-physical');
        const physicalPin = physicalEl ? physicalEl.textContent.trim() : null;
        
        // Get corresponding header
        const headerEl = label.parentElement.querySelector('.pin-header');
        const header = headerEl ? headerEl.textContent.trim() : 'J1';
        
        // Get corresponding group
        const groupEl = label.parentElement.querySelector('.pin-group');
        const group = groupEl ? groupEl.textContent.trim() : 'Uncategorized';
        
        // Get corresponding var_alias
        const varAliasEl = label.parentElement.querySelector('.pin-var-alias');
        const varAlias = varAliasEl ? varAliasEl.textContent.trim() : null;
        
        if (!pinMap[pin]) {
            pinMap[pin] = {
                pin: pin,
                header_id: header,
                physical_pin: physicalPin,
                group: group,
                var_alias: varAlias,
                name: name,
                capabilities: []
            };
        } else {
            pinMap[pin].name = name;
            pinMap[pin].header_id = header;
            pinMap[pin].physical_pin = physicalPin;
            pinMap[pin].group = group;
            pinMap[pin].var_alias = varAlias;
        }
    });

    // Convert to array format
    Object.values(pinMap).forEach(pinData => {
        capabilities.push({
            pin: pinData.pin,
            header_id: pinData.header_id,
            physical_pin: pinData.physical_pin,
            group: pinData.group,
            var_alias: pinData.var_alias,
            name: pinData.name,
            capabilities: pinData.capabilities
        });
    });

    // Sort by pin number
    capabilities.sort((a, b) => a.pin - b.pin);

    return capabilities;
}

function updatePreview() {
    const data = {
        id: document.getElementById('platformId').value,
        name: document.getElementById('platformName').value,
        website: document.getElementById('websiteUrl').value,
        sku: document.getElementById('skuNumber').value,
        description: document.getElementById('description').value,
        architecture: document.getElementById('architecture').value,
        cores: parseInt(document.getElementById('cores').value) || null,
        frequency_mhz: parseInt(document.getElementById('frequency').value) || null,
        ram_kb: parseInt(document.getElementById('ramKb').value) || null,
        flash_kb: parseInt(document.getElementById('flashKb').value) || null,
        gpio_total: parseInt(document.getElementById('gpioTotal').value) || null,
        adc_channels: parseInt(document.getElementById('adcChannels').value) || null,
        pwm_channels: parseInt(document.getElementById('pwmChannels').value) || null,
        wifi: document.getElementById('wifi').value,
        ble: document.getElementById('ble').value,
        supported_interfaces: getCommunicationInterfaces(),
        usb_ports: getUsbPorts(),
        system_features: getSystemFeatures(),
        toolchain: document.getElementById('toolchain').value,
        notes: document.getElementById('notes').value,
        pin_capabilities: populatePinCapabilities()
    };

    // Remove null values and empty arrays
    Object.keys(data).forEach(key => {
        if (data[key] === null || (Array.isArray(data[key]) && data[key].length === 0)) {
            delete data[key];
        }
    });

    document.getElementById('preview').textContent = JSON.stringify(data, null, 2);
    
    // Update quick pinout preview
    updateQuickPinoutPreview(data);
}

function updateQuickPinoutPreview(data) {
    const previewEl = document.getElementById('quickPinoutPreview');
    
    if (!data.pin_capabilities || data.pin_capabilities.length === 0) {
        previewEl.innerHTML = '<p style="color: #999;">Generate pin rows to see preview</p>';
        return;
    }
    
    const svg = generateQuickPinoutSVG(data);
    previewEl.innerHTML = svg;
}

function generateQuickPinoutSVG(data) {
    const pins = data.pin_capabilities;
    const boardName = data.name || 'Dev Board';
    
    // Simple dual-row layout
    const pinsPerSide = Math.ceil(pins.length / 2);
    const spacing = 10;
    const pinRadius = 3;
    const labelWidth = 100;
    const margin = 30;
    
    const height = pinsPerSide * spacing + margin * 2;
    const width = labelWidth * 2 + spacing * 3 + margin * 2;
    
    let svgContent = '';
    
    // Left side pins
    for (let i = 0; i < pinsPerSide && i < pins.length; i++) {
        const pin = pins[i];
        const y = margin + i * spacing;
        const x = margin + labelWidth;
        
        svgContent += `<circle cx="${x}" cy="${y}" r="${pinRadius}" fill="white" stroke="#333" stroke-width="0.5"/>`;
        svgContent += `<text x="${x - pinRadius - 3}" y="${y + 2}" text-anchor="end" font-size="6" font-weight="bold" fill="#667eea">${pin.name || 'GPIO' + pin.pin}</text>`;
        
        // Physical pin number
        if (pin.physical_pin) {
            svgContent += `<text x="${x - pinRadius - 3}" y="${y + 8}" text-anchor="end" font-size="4" fill="#999">[${pin.physical_pin}]</text>`;
        }
    }
    
    // Right side pins
    for (let i = 0; i < pinsPerSide && (pinsPerSide + i) < pins.length; i++) {
        const pin = pins[pinsPerSide + i];
        const y = margin + i * spacing;
        const x = margin + labelWidth + spacing * 2;
        
        svgContent += `<circle cx="${x}" cy="${y}" r="${pinRadius}" fill="white" stroke="#333" stroke-width="0.5"/>`;
        svgContent += `<text x="${x + pinRadius + 3}" y="${y + 2}" text-anchor="start" font-size="6" font-weight="bold" fill="#667eea">${pin.name || 'GPIO' + pin.pin}</text>`;
        
        if (pin.physical_pin) {
            svgContent += `<text x="${x + pinRadius + 3}" y="${y + 8}" text-anchor="start" font-size="4" fill="#999">[${pin.physical_pin}]</text>`;
        }
    }
    
    // Board title
    svgContent = `<text x="${width / 2}" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="#667eea">${boardName}</text>` + svgContent;
    
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
        <rect width="100%" height="100%" fill="#f9f9f9"/>
        <rect x="2" y="2" width="${width - 4}" height="${height - 4}" fill="none" stroke="#ccc" stroke-width="0.5" stroke-dasharray="2,2"/>
        ${svgContent}
    </svg>`;
}
